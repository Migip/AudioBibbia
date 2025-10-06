import React from 'react';
import i18n_class, { i18n } from '../Globals/i18n/i18n.general';

export default class myReactComponent<T = any> extends React.Component<T> {
    protected _oI18n: i18n;
    protected _sCompName: string = '';
    protected _bActiveLog: boolean = false;
    /**
     * constructor
     */
    public constructor(props: any) {
        super(props);
        this._oI18n = i18n_class.getI18n();
    };
    
    protected _log(message?: any, ...optionalParams: any[]) {
        if (this._bActiveLog) {
            console.log(this._sCompName, message, optionalParams);
        };
    };
}