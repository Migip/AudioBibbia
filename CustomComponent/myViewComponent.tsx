import React from 'react';
import myReactComponent from './myReactNativeComponent';
import PopupToConfirm from './popupToConfirm';
import { View } from 'react-native';
import { GeneralStyles } from '../Styles/GeneralStyles';

export default class myViewComponent<T = any> extends myReactComponent<T> {
    private _oPopupToConfirmRef?: React.RefObject<PopupToConfirm | null>;
    /**
     * constructor
     */
    public constructor(props: any) {
        super(props);
        this._oPopupToConfirmRef = React.createRef<PopupToConfirm>();
    };

    protected renderContent(): React.ReactNode {
        return null;
    };

    render(): React.ReactNode {
        // console.log('myViewComponent render', this.renderContent());
        return (
            <View
                style={[
                    // this.props.style,
                    {
                        flexDirection: 'column',
                        flex: 1
                    }
                ]}>
                {this.renderContent()}
                <PopupToConfirm ref={this._oPopupToConfirmRef} />
            </View>
        );
    };

    protected async _openPopupToConfirm(sNewText: string): Promise<boolean> {
        this._log('Before opening popup to confirm with text:', sNewText);
        if (this._oPopupToConfirmRef && this._oPopupToConfirmRef.current) {
            this._log('Opening popup to confirm with text:', sNewText);
            const result = await this._oPopupToConfirmRef.current.openPopupToConfirm(
                sNewText
            );
            this._log('Popup to confirm closed with result:', result);
            return result;
        };
        return false;
    };
}