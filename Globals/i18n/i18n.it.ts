import { i18n } from "./i18n.general";

export default class i18n_it implements i18n {
    appTitle = 'Elenco dei canti';
    //Homepage - Chant list
    BooksList = {
        at: 'AT',
        nt: 'NT',
        playSelected: 'Riproduci sel.'
    };

    //Filters
    CurrentlyPlaying = {
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