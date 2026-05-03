//import { NavigationContainer } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { Alert, Modal, View } from 'react-native';
import CustomButton from './myButton';
import myReactComponent from './myReactNativeComponent';
import { iconType, myIcons } from '../Globals/constants/Icons';
import { PopupStyles } from '../Styles/PopupStyles';
import ActiveButton from './activeButton';


declare type CustomPopupProps = {
    buttonTitle?: string,
    icon?: iconType
    popupContent: ReactNode,
    onOpenModal?: { (): void },
    onCloseModal?: { (): void },
    onConfirm?: { (): void },
    noBorder?: boolean,
    noOkButton?: true,
    ref?: React.RefObject<CustomPopup | null>,
    toConfirm?: true
};

declare type stateType = {
    bInfoVisible: boolean
};

export default class CustomPopup extends myReactComponent<CustomPopupProps> {
    private _oCurrState: stateType = {
        bInfoVisible: false
    };
    public readonly state: stateType = this._oCurrState;
    private _sButtonTitle: string;

    public constructor(props: any) {
        super(props);
        if (!this.props.toConfirm &&
            !this.props.buttonTitle) {
            console.error('buttonTitle and icon props are required when toConfirm is not set to true',
                this.props.toConfirm,
                this.props.buttonTitle,
                this.props.icon
            );
            //throw new Error("buttonTitle prop is required when toConfirm is not set to true");
        };
        this._sButtonTitle = this.props.buttonTitle || '';
    };

    public render() {
        return (
            <View
                style={[
                    PopupStyles.PopupView
                ]}>
                {!this.props.toConfirm && (
                    <CustomButton
                        title={this._sButtonTitle}
                        onPress={this._onOpenModal.bind(this)}
                        icon={this.props.icon} />
                )}
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
                                title={this._oI18n.Popup.ok}
                                onPress={this._onCloseModal.bind(this)}
                            />
                        }
                        {this.props.toConfirm &&
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    margin: 20
                                }}>
                                <ActiveButton
                                    title={this._oI18n.Popup.yes}
                                    onPress={this._onConfirm.bind(this)}
                                    active={true}
                                />
                                <ActiveButton
                                    title={this._oI18n.Popup.no}
                                    onPress={this._onCloseModal.bind(this)}
                                    active={false}
                                />
                            </View>
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

    private _onConfirm() {
        if (this.props.onConfirm) {
            this.props.onConfirm();
        };
        this._onCloseModal();
    };

    public Open() {
        this._log('CustomPopup Open method called');
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
