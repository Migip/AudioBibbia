import * as Audio from "expo-audio";
import { myTreeNode } from "../HomepageTypes";
import { cl_conversion, cl_id, cl_link, cl_title } from "./CharUtility";
//import { NativeEventEmitter } from "react-native";
import { EventEmitter } from 'eventemitter3';
import myNotification, { notifCategory, scheduleNotificationType } from "./MyNotifications";
import i18n_class from "../i18n/i18n.general";

export enum playingStatus {
    none,
    playing,
    paused,
    stop
};

export declare type currentPlayingType = {
    id: string,
    name: string,
    playing: boolean,
    paused: boolean,
    index: number,
    duration?: Audio.AudioStatus['duration']
};

export enum playEventType {
    playbackStatusUpdate = 'playbackStatusUpdate',
    trackStatusUpdate = 'trackStatusUpdate'
};

// La lista interna contiene solo i dati della traccia: il player nativo e' UNO solo
// e viene riusato (replace) per ogni traccia.
declare type currentPlayingTypeIntern = {
    id: string,
    name: string,
    index: number,
    source: Audio.AudioSource,
    duration?: number
};

class myPlayerInstance {
    private _iPlayingIndex: number = -1;
    private _aCurrentPlaying: currentPlayingTypeIntern[] = [];
    private _oEvent: EventEmitter = new EventEmitter();

    // UN solo player nativo per tutta la vita dell'app. Cambiare traccia = replace().
    // Cosi' la sessione audio / il foreground service Android / il Now Playing iOS
    // restano sempre agganciati allo stesso oggetto e non vengono mai smontati
    // e rimontati tra una traccia e l'altra.
    private _oPlayer: Audio.AudioPlayer;
    private _bLockScreenActive: boolean = false;
    private _bPaused: boolean = false;          // pausa richiesta dall'utente
    private _bAwaitingLoad: boolean = false;    // true dopo replace(), finche' la nuova traccia non e' caricata
    private _bFinishHandled: boolean = false;   // evita doppio onNext() per la stessa traccia

    constructor() {
        Audio.setAudioModeAsync({
            playsInSilentMode: true,
            shouldPlayInBackground: true,
            interruptionMode: 'doNotMix'
        }).catch((error) => console.error("setAudioModeAsync:", error));

        this._oPlayer = Audio.createAudioPlayer(null, {
            updateInterval: 500,
            // iOS: senza questo la sessione audio viene disattivata a fine traccia e
            // l'app viene sospesa PRIMA che il JS faccia partire la traccia successiva.
            keepAudioSessionActive: true
        });
        // Il listener viene registrato UNA volta sola
        this._oPlayer.addListener('playbackStatusUpdate', this._onAudioStatusUpdate.bind(this));
    };

    public setNewList(aNew: currentPlayingTypeIntern[]): currentPlayingType[] {
        this.onStop();
        this._aCurrentPlaying = aNew;
        return this.onNext(0);
    };

    public getList(): currentPlayingType[] {
        return this._aCurrentPlayingOut;
    };

    public getTrackInfo(): currentPlayingType | undefined {
        return this._oCurrentPlayingOut;
    };

    private get _oCurrentPlaying(): currentPlayingTypeIntern | undefined {
        return this._aCurrentPlaying[this._iPlayingIndex];
    };

    public onPlay(): currentPlayingType[] {
        if (this._iPlayingIndex === -1) {
            if (this._aCurrentPlaying.length > 0) {
                return this.onNext(0);
            };
        } else if (this._oPlayer.currentStatus.playbackState === 'ended') {
            return this.onNext(this._iPlayingIndex + 1);
        } else if (this._oPlayer.currentStatus.playing === false) {
            this._bPaused = false;
            this._oPlayer.play();
        };
        return this._aCurrentPlayingOut;
    };

    public onPause(): currentPlayingType[] {
        if (this._iPlayingIndex !== -1 && this._oPlayer.currentStatus.playing === true) {
            this._oPlayer.pause();
            this._bPaused = true;
        };
        return this._aCurrentPlayingOut;
    };

    /**
     * Senza parametro: passa alla traccia successiva.
     * Con nIndex: salta a quella traccia.
     */
    public onNext(nIndex?: number): currentPlayingType[] {
        if (nIndex !== undefined && nIndex === this._iPlayingIndex) {
            return this._aCurrentPlayingOut;
        };
        const iTarget: number = nIndex !== undefined ? nIndex : this._iPlayingIndex + 1;
        if (iTarget < 0 || iTarget >= this._aCurrentPlaying.length) {
            return this.onStop();
        };
        this._loadAndPlay(iTarget);
        return this._aCurrentPlayingOut;
    };

    public onStop(): currentPlayingType[] {
        try {
            this._oPlayer.pause();
            if (this._bLockScreenActive) {
                this._oPlayer.setActiveForLockScreen(false);
                this._bLockScreenActive = false;
            };
        } catch (error) {
            console.error("onStop:", error);
        };
        this._iPlayingIndex = -1;
        this._bPaused = false;
        this._bAwaitingLoad = false;
        this._bFinishHandled = false;
        myNotification.dismissAllNotificationsAsync();
        return this._aCurrentPlayingOut;
    };

    public get playingStatus(): playingStatus {
        if (this._aCurrentPlaying.length === 0) {
            return playingStatus.none;
        } else if (this._iPlayingIndex === -1) {
            return playingStatus.stop;
        } else if (this.bPlaying) {
            return playingStatus.playing;
        } else {
            return playingStatus.paused;
        };
    };

    private _loadAndPlay(iIndex: number): void {
        const oTrack = this._aCurrentPlaying[iIndex];
        if (oTrack === undefined) {
            return;
        };
        this._iPlayingIndex = iIndex;
        this._bPaused = false;
        this._bFinishHandled = false;
        this._bAwaitingLoad = true; // ignora eventuali "didJustFinish" residui della traccia precedente

        try {
            this._oPlayer.replace(oTrack.source);

            const oMetadata = {
                title: oTrack.name,
                artworkUrl: 'https://raw.githubusercontent.com/Migip/AudioBibbia/refs/heads/main/assets/adaptive-icon.png',
                artist: 'AudioBibbia'
            };
            if (this._bLockScreenActive) {
                // Stesso player, stessa sessione: aggiorno solo i metadati
                this._oPlayer.updateLockScreenMetadata(oMetadata);
            } else {
                this._oPlayer.setActiveForLockScreen(true, oMetadata);
                this._bLockScreenActive = true;
            };
            this._oPlayer.play();
        } catch (error) {
            console.error("_loadAndPlay:", error);
        };
        this._preloadNext(iIndex + 1);
    };

    // Scalda la traccia successiva mentre quella corrente suona, cosi' al cambio
    // non si aspetta la rete (specie con schermo bloccato).
    private _preloadNext(iIndex: number): void {
        const oNext = this._aCurrentPlaying[iIndex];
        if (oNext !== undefined) {
            Audio.preload(oNext.source).catch((error) => console.warn("preload:", error));
        };
    };

    private _onAudioStatusUpdate(status: Audio.AudioStatus): void {
        this._newNotification();
        if (this._bAwaitingLoad) {
            // la nuova sorgente e' pronta: da qui in poi un "finish" e' davvero suo
            if (status.isLoaded === true && status.playbackState !== 'ended' && status.didJustFinish === false) {
                this._bAwaitingLoad = false;
            };
        } else if (status.didJustFinish === true && this._bFinishHandled === false) {
            this._bFinishHandled = true;
            this.onNext();
        };
        this._oEvent.emit(playEventType.playbackStatusUpdate, this._aCurrentPlayingOut);
        this._oEvent.emit(playEventType.trackStatusUpdate, this._oCurrentPlayingOut);
    };

    private get _aCurrentPlayingOut(): currentPlayingType[] {
        // Nessuna chiamata nativa per ogni elemento: la durata e' nota solo per la traccia in corso
        return this._aCurrentPlaying.map((oValue: currentPlayingTypeIntern) => {
            return this._toOut(oValue);
        });
    };

    private get _oCurrentPlayingOut(): currentPlayingType | undefined {
        const oCurrent = this._oCurrentPlaying;
        return oCurrent ? this._toOut(oCurrent) : undefined;
    };

    private _toOut(oValue: currentPlayingTypeIntern): currentPlayingType {
        const bIsCurrent: boolean = oValue.index === this._iPlayingIndex;
        return {
            id: oValue.id,
            name: oValue.name,
            index: oValue.index,
            playing: bIsCurrent && this.bPlaying,
            paused: bIsCurrent && !this.bPlaying,
            duration: (bIsCurrent && this._oPlayer.currentStatus.duration > 0)
                ? this._oPlayer.currentStatus.duration
                : oValue.duration
        };
    };

    private _newNotification() {
        let oOptions: scheduleNotificationType = {
            title: this._oCurrentPlaying ? this._oCurrentPlaying.name : "",
            subtitle: `${this.nCurrentTime}/${this.nDuration}`,
            body: this.bPlaying ? i18n_class.getI18n().notif.playing : i18n_class.getI18n().notif.paused,
            catId: this.bPlaying ? notifCategory.PAUSE : notifCategory.PLAY
        }
        myNotification.scheduleNotificationAsync(oOptions);
    };

    public get nCurrentTime(): string {
        return cl_conversion.timeToString(this._iPlayingIndex === -1 ? undefined : this._oPlayer.currentStatus.currentTime);
    };

    public get nDuration(): string {
        return cl_conversion.timeToString(this._iPlayingIndex === -1 ? undefined : this._oPlayer.currentStatus.duration);
    };

    public get bPlaying(): boolean {
        if (this._iPlayingIndex === -1) {
            return false;
        };
        const oStatus = this._oPlayer.currentStatus;
        // Durante caricamento/buffering (non in pausa utente) la traccia e' "in riproduzione"
        return oStatus.playing === true
            || (this._bPaused === false && (this._bAwaitingLoad || oStatus.isBuffering === true));
    };

    public addListener(eventType: string, listener: (event: any) => void) {
        return this._oEvent.addListener(eventType, listener);
    };
};


export default class myPlayer {
    private static _oInstance: myPlayerInstance = new myPlayerInstance();
    //private static _oEvent: NativeEventEmitter = new NativeEventEmitter();

    // public static init() {
    //     this._oInstance = new myPlayerInstance();
    //     this._oEvent = new NativeEventEmitter();
    // };

    public static addListener(eventType: string, listener: (event: any) => void) {
        return this._oInstance.addListener(eventType, listener);
    }

    public static setNewList(aCheckedIds: string[], aTreeList: myTreeNode[]): currentPlayingType[] {
        let aCurrentPlaying: currentPlayingTypeIntern[] = [];
        aCheckedIds = [...aCheckedIds].sort(cl_id.sort); // copia: non modificare l'array dello stato React

        try {

            var nIndex: number = -1;
            aCheckedIds.forEach(
                (sId) => {
                    try {
                        let aIdLevel = cl_id.splitIdLevels(sId);
                        var sCurrentId: string = '';
                        var oCurrentNode: myTreeNode | undefined = undefined;
                        var sName: string = '';
                        aIdLevel.forEach((sId: string) => {
                            try {
                                sCurrentId = cl_id.concatId(sCurrentId, sId);
                                if (oCurrentNode === undefined) {
                                    oCurrentNode = aTreeList.find((oNode) => { return oNode.id === sCurrentId });
                                } else {
                                    oCurrentNode = oCurrentNode.children?.find((oNode) => { return oNode.id === sCurrentId });
                                };
                                if (oCurrentNode !== undefined) {
                                    if (oCurrentNode.link !== undefined) {
                                        nIndex++;
                                        aCurrentPlaying.push({
                                            id: oCurrentNode.id,
                                            name: cl_title.concat(sName, oCurrentNode.name),
                                            source: cl_link.getSource(oCurrentNode),
                                            index: nIndex,
                                            duration: oCurrentNode.duration
                                        });
                                        //console.log("aCurrentPlaying:", aCurrentPlaying[aCurrentPlaying.length - 1]);
                                    } else {
                                        sName = cl_title.concat(sName, oCurrentNode.name);
                                    };
                                } else {
                                    console.error("Non trovato id ", sCurrentId);
                                };
                            } catch (error) {
                                console.error("Errore in aIdLevel.forEach", error);
                            };
                        });
                    } catch (error) {
                        console.error("Errore in aCheckedIds.forEach", error);
                    };
                }
            );
        } catch (error) {
            console.error("Errore in setNewList", error);
        }
        return this._oInstance.setNewList(aCurrentPlaying);
    };


    public static getList(): currentPlayingType[] {
        return this._oInstance.getList();
    };

    public static getTrackInfo(): currentPlayingType | undefined {
        return this._oInstance.getTrackInfo();
    };

    public static play(): currentPlayingType[] {
        return this._oInstance.onPlay();
    };

    public static pause(): currentPlayingType[] {
        return this._oInstance.onPause();
    };

    public static stop(): currentPlayingType[] {
        return this._oInstance.onStop();
    };

    public static playFrom(nIndex: number): currentPlayingType[] {
        return this._oInstance.onNext(nIndex);
    };

    public static next(): currentPlayingType[] {
        return this._oInstance.onNext();
    };

    public static get playingStatus(): playingStatus {
        return this._oInstance.playingStatus;
    };

    public static get nCurrentTime(): string {
        return this._oInstance.nCurrentTime;
    };

    public static get nDuration(): string {
        return this._oInstance.nDuration;
    };
};