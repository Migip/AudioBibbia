import React from 'react';
//import i18n_class, { i18n } from '../globals/i18n/i18n.general';

export default class myReactComponent<T = any> extends React.Component<T> {
    //protected _oI18n: i18n;
    /**
     * constructor
     */
    public constructor(props: any) {
        super(props);
    //    this._oI18n = i18n_class.getI18n();
    }
}