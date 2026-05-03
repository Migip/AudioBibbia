import { i18n } from "./i18n.general";

export default class i18n_it implements i18n {
    appTitle = 'Elenco dei canti';

    Tabs= {
        scelta: 'Scegli brano',
        playing: 'In riproduzione',
        info_button: 'Info'
    };

    //Homepage - Chant list
    BooksList = {
        at: 'AT',
        nt: 'NT',
        titleNT: 'Nuovo Testamento',
        titleAT: 'Antico Testamento',
        playSelected: 'Riproduci sel.',
        popupToConfirmSelection: 'Vuoi interrompere la riproduzione corrente e avviare questa?'
    };

    searchOptions = {
        searchButton: 'Cerca',
        searchClose: 'Chiudi',
        searchCancel: 'Rimuovi filtri',
        searchTitle: 'Ricerca libro desiderato',
        // searchPlaceholder: 'Cerca capitolo...',
        searchPlaceholder: 'Scrivi libro qui',
        unselect: 'Desel. tutto'
    };

    //Filters
    CurrentlyPlaying = {
        ListTitle: 'Brani in lista',
        State: 'Attivo',
        Duration: 'Durata',
        EmptyList: 'Nessun brano in riproduzione',
        PopupToConfirmTitle: 'Vuoi davvero avviare questo brano?',
        play: 'Play',
        pause: 'Pausa',
        next: 'Avanti',
        stop: 'Stop',
        playing: 'In riproduzione',
        paused: 'In pausa',
        stopped: 'Esecuzione terminata'
    };

    //Notifications
    notif = {
        playing: "In riproduzione",
        paused: "In pausa",
    };

    //Footer
    Footer = {
        testo1: "Le registrazioni sono state fornite da ",
        testo2: "Se si vogliono ascoltare offline, è possibile selezionare i brani desiderati, premere su 'Riproduci sel.', lasciarli caricare e, successivamente, staccare la connessione Internet.",
    };

    //Popup
    Popup = {
        yes: 'Sì',
        no: 'No',
        ok: 'OK'
    };
}