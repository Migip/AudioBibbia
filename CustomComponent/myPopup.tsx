//import { NavigationContainer } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { Alert, Modal, View } from 'react-native';
import CustomButton from './myButton';
import myReactComponent from './myReactNativeComponent';
import { iconType, myIcons } from '../Globals/constants/Icons';
import { PopupStyles } from '../Styles/PopupStyles';


declare type CustomPopupProps = {
    buttonTitle: string,
    icon: iconType
    popupContent: ReactNode,
    onOpenModal?: { (): void },
    onCloseModal?: { (): void },
    noBorder?: boolean,
    noOkButton?: true,
    ref?: React.RefObject<CustomPopup | null>
};

declare type stateType = {
    bInfoVisible: boolean
};

export default class CustomPopup extends myReactComponent<CustomPopupProps> {
    private _oCurrState: stateType = {
        bInfoVisible: false
    };
    public readonly state: stateType = this._oCurrState;

    public constructor(props: any) {
        super(props);
    };

    public render() {
        return (
            <View
                style={[
                    PopupStyles.PopupView
                ]}>
                <CustomButton
                    title={this.props.buttonTitle}
                    onPress={this._onOpenModal.bind(this)}
                    icon={this.props.icon} />
                <Modal
                    animationType="fade"
                    presentationStyle='fullScreen'
                    backdropColor={'#6e6d6d83'}
                    visible={this.bInfoVisible}>
                    <View
                        style={[
                            PopupStyles.PopupModal
                        ]}>
                        <View
                            style={{
                                alignSelf: 'flex-end'
                            }}>
                            <CustomButton
                                title=''
                                onPress={this._onCloseModal.bind(this)}
                                icon={myIcons.closePopup}
                                noBorder />
                        </View>
                        {this.props.popupContent}
                        {/* <CustomButton
                            title='OK'
                            onPress={this._onCloseModal.bind(this)}
                        /> */}
                        {!this.props.noOkButton &&
                            <CustomButton
                                title='OK'
                                onPress={this._onCloseModal.bind(this)}
                            />
                        }
                        {/*<CustomButton
                            title={this._oI18n.menu.PopupClose}
                            onPress={this._onCloseModal.bind(this)} />*/}
                    </View>
                </Modal>
            </View>
        );
    };

    private _onOpenModal() {
        this.bInfoVisible = true;
        if (this.props.onOpenModal) {
            this.props.onOpenModal();
        }
    };

    private _onCloseModal() {
        this.bInfoVisible = false;
        if (this.props.onCloseModal) {
            this.props.onCloseModal();
        };
    };

    public Open() {
        this._onOpenModal();
    };

    public Close() {
        this._onCloseModal();
    };

    private get bInfoVisible(): boolean {
        return this._oCurrState.bInfoVisible;
    };

    private set bInfoVisible(bNewValue: boolean) {
        this._oCurrState.bInfoVisible = bNewValue;
        this.setState(this._oCurrState);
    };
}
