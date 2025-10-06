import i18n_it from "./i18n.it"



declare type i18n_BooksList = {
    at: string,
    nt: string,
    playSelected: string
};

declare type i18n_CurrentlyPlaying = {
    play: string,
    pause: string,
    next: string,
    stop: string,
    playing: string,
    paused: string,
    stopped: string
};

declare type i18n_footer = {
    testo: string,
};

export interface i18n {
    appTitle: string,
    //Homepage - Booklist
    BooksList: i18n_BooksList,

    //Homepage - Currently Playing
    CurrentlyPlaying: i18n_CurrentlyPlaying,

    //Footer
    Footer: i18n_footer
}

export default class i18n_class {
    private static _i18n: i18n;
    static getI18n(): i18n {
        if (this._i18n) {
            return this._i18n;
        } else {
            return new i18n_it();
        }
    }
}