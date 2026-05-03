//import { NavigationContainer } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { Alert, Modal, View } from 'react-native';
import CustomButton from './myButton';
import myReactComponent from './myReactNativeComponent';
import { iconType, myIcons } from '../Globals/constants/Icons';
import { PopupStyles } from '../Styles/PopupStyles';
import CustomPopup from './myPopup';
import CustomText from './myText';


declare type PopupToConfirmProps = {
    ref?: React.RefObject<PopupToConfirm | null>
};

declare type stateType = {
    sText: string;
};

export default class PopupToConfirm extends myReactComponent<PopupToConfirmProps> {
    private _oCurrState: stateType = {
        sText: ''
    };
    public readonly state: stateType = this._oCurrState;
    private _oPopupRef?: React.RefObject<CustomPopup | null>;
    // private _bConfirmed?: boolean = undefined;
    // Sostituisce _bConfirmed con il resolver diretto
    private _resolve: ((value: boolean) => void) | null = null;
    protected _bActiveLog: boolean = false;

    public constructor(props: any) {
        super(props);
        this._oPopupRef = React.createRef<CustomPopup>()
    };

    public render() {
        return (
            <View>
                <CustomPopup
                    ref={this._oPopupRef}
                    toConfirm={true}
                    popupContent={
                        <View>
                            <CustomText>
                                {this.state.sText}
                            </CustomText>
                        </View>}
                    onConfirm={this._onConfirm.bind(this)}
                    onCloseModal={this._onClose.bind(this)}
                    noOkButton
                />
            </View>
        );
    };

    private _onConfirm() {
        // this._bConfirmed = true;
        // this._log('User confirmed action', this._bConfirmed);
        this._log('User confirmed action', true);
        this._resolve?.(true);   // ← risolve la Promise direttamente
        this._resolve = null;
    };

    private _onClose() {
        // this._bConfirmed = false;
        this._resolve?.(false);  // ← risolve la Promise direttamente
        this._resolve = null;
    };

    public openPopupToConfirm(sNewText: string): Promise<boolean> {
        this._oCurrState.sText = sNewText;
        this.setState(this._oCurrState);

        if (this._oPopupRef?.current) {
            this._oPopupRef.current.Open();
        }

        // Nessun polling — la Promise aspetta che _onConfirm o _onClose chiamino resolve
        return new Promise<boolean>((resolve) => {
            this._resolve = resolve;
        });
    };
}
