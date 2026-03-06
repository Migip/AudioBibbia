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
        playSelected: 'Riproduci sel.'
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
        ListTitle: 'Brani in riproduzione',
        EmptyList: 'Nessun brano in riproduzione',
        play: 'Play',
        pause: 'Pausa',
        next: 'Avanti',
        stop: 'Stop',
        playing: 'In riproduzione',
        paused: 'Esecuzione in pausa',
        stopped: 'Esecuzione terminata'
    };

    //Notifications
    notif = {
        playing: "In riproduzione",
        paused: "In pausa",
    };

    //Footer
    Footer = {
        testo: "Le registrazioni sono state fornite da ",
    };
}