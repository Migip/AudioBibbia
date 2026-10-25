#!/usr/bin/env node
/**
 * Aggiunge il campo "duration" (secondi, intero) ai nodi con "link" di assets/listAT.json e listNT.json.
 *
 * Uso (dalla radice del progetto):
 *   npm i --no-save music-metadata
 *   node scripts/addDurations.mjs
 *
 * Opzioni:
 *   --files a.json,b.json   file da aggiornare   (default: assets/listAT.json,assets/listNT.json)
 *   --base  URL             prefisso dei link    (default: https://www.proclamarelaparola.it/)
 *   --concurrency N         download paralleli   (default: 4)
 *   --accurate              scarica TUTTO il file e conta i frame MP3 (lento, esatto anche per VBR senza header)
 *   --force                 ricalcola anche i nodi che hanno gia' "duration"
 *
 * Senza --accurate vengono scaricati solo i primi KB di ogni file: la durata e' letta dall'header Xing/Info
 * se presente, altrimenti stimata da bitrate e dimensione (esatta per i file CBR).
 * Lo script e' ripetibile: salta i nodi gia' valorizzati e salva periodicamente, quindi si puo' interrompere e riprendere.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { parseWebStream } from 'music-metadata';

// ---- argomenti ---------------------------------------------------------------------------------
const args = process.argv.slice(2);
const opt = (name, def) => {
    const i = args.indexOf(`--${name}`);
    return i === -1 ? def : args[i + 1];
};
const flag = (name) => args.includes(`--${name}`);

const FILES = opt('files', 'assets/listAT.json,assets/listNT.json').split(',');
const BASE = opt('base', 'https://www.proclamarelaparola.it/');
const CONCURRENCY = Math.max(1, parseInt(opt('concurrency', '4'), 10));
const ACCURATE = flag('accurate');
const FORCE = flag('force');
const RETRIES = 3;
const SAVE_EVERY = 25;

// ---- utilita' ----------------------------------------------------------------------------------
function collect(nodes, out = []) {
    for (const n of nodes) {
        if (n.link !== undefined && (FORCE || n.duration === undefined)) out.push(n);
        if (Array.isArray(n.children)) collect(n.children, out);
    }
    return out;
}

async function getDuration(link) {
    const url = BASE + link;
    const res = await fetch(url);
    if (!res.ok || !res.body) throw new Error(`HTTP ${res.status} per ${url}`);
    const size = parseInt(res.headers.get('content-length') ?? '', 10);
    const mimeType = res.headers.get('content-type') || 'audio/mpeg';
    try {
        const meta = await parseWebStream(
            res.body,
            { mimeType, size: Number.isFinite(size) ? size : undefined },
            { duration: ACCURATE }
        );
        const d = meta.format.duration;
        if (!d || !Number.isFinite(d)) throw new Error(`durata non rilevata per ${url}`);
        return d;
    } finally {
        // se il parser si e' fermato prima della fine, non scaricare il resto
        res.body.cancel().catch(() => { });
    }
}

async function withRetry(fn, label) {
    let lastErr;
    for (let i = 1; i <= RETRIES; i++) {
        try {
            return await fn();
        } catch (e) {
            lastErr = e;
            await new Promise((r) => setTimeout(r, 500 * i));
        }
    }
    throw new Error(`${label}: ${lastErr?.message ?? lastErr}`);
}

// ---- main --------------------------------------------------------------------------------------
const failures = [];

for (const file of FILES) {
    const raw = await readFile(file, 'utf8');
    const data = JSON.parse(raw);
    // mantiene indentazione e newline finale del file originale (il diff mostra solo i "duration")
    const indent = raw.match(/\n([ \t]+)\S/)?.[1] ?? 2;
    const eol = raw.endsWith('\n') ? '\n' : '';
    const todo = collect(data);
    console.log(`\n${file}: ${todo.length} file da elaborare`);

    let done = 0;
    let sinceSave = 0;
    const save = () => writeFile(file, JSON.stringify(data, null, indent) + eol, 'utf8');

    let next = 0;
    const worker = async () => {
        while (next < todo.length) {
            const node = todo[next++];
            try {
                const seconds = await withRetry(() => getDuration(node.link), node.link);
                node.duration = Math.round(seconds);
            } catch (e) {
                failures.push(e.message);
                console.error('  ERRORE', e.message);
            }
            done++;
            if (++sinceSave >= SAVE_EVERY) {
                sinceSave = 0;
                await save();
            }
            if (done % 10 === 0 || done === todo.length) console.log(`  ${done}/${todo.length}`);
        }
    };
    await Promise.all(Array.from({ length: CONCURRENCY }, worker));
    await save();
}

if (failures.length) {
    console.error(`\n${failures.length} file non elaborati (rilancia lo script per riprovare solo quelli):`);
    failures.forEach((f) => console.error(' -', f));
    process.exitCode = 1;
} else {
    console.log('\nFatto.');
}