import i18n_it from "./i18n.it"



declare type i18n_BooksList = {
    at: string,
    nt: string,
    titleNT: string,
    titleAT: string,
    playSelected: string
};

declare type i18n_searchOptions = {
    searchButton: string,
    searchClose: string,
    searchCancel: string,
    searchTitle: string,
    searchPlaceholder: string,
    unselect: string
};

declare type i18n_Tabs = {
    scelta: string,
    playing: string,
    info_button: string
};

declare type i18n_CurrentlyPlaying = {
    ListTitle: string,
    EmptyList: string,
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

declare type i18n_notif = {
    playing: string,
    paused: string,
};

export interface i18n {
    appTitle: string,

    //Tabs
    Tabs: i18n_Tabs,

    //Homepage - Booklist
    BooksList: i18n_BooksList,

    //Barra di ricerca
    searchOptions: i18n_searchOptions,

    //Homepage - Currently Playing
    CurrentlyPlaying: i18n_CurrentlyPlaying,

    //Notifications
    notif: i18n_notif,

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