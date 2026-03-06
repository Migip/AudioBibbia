//import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import myReactComponent from '../../CustomComponent/myReactNativeComponent';
import CustomPopup from '../../CustomComponent/myPopup';
import { myIcons } from '../../Globals/constants/Icons';
import { Text } from 'react-native-elements';


declare type InfoProps = {
};

declare type stateType = {
    sAppVersion: string,
    sChantVersion: string
};


export default class Info extends myReactComponent<InfoProps> {
    private _oCurrState: stateType;
    public readonly state: stateType;

    public constructor(props: any) {
        super(props);
        let oApp = require('../../app.json');
        this._oCurrState = {
            sAppVersion: oApp.expo.version,
            sChantVersion: ''
        };
        this.state = this._oCurrState;
    };

    public render() {
        return (
            <CustomPopup
                buttonTitle={this._oI18n.Tabs.info_button}
                icon={myIcons.info}
                noBorder={true}
                popupContent={
                    <View>
                        <Text>{this._oI18n.Footer.testo}
                        </Text>
                            <Text
                                style={{ fontWeight: 'bold' }}>
                                https://www.proclamarelaparola.it/
                            </Text>
                    </View>} />
        );
    };
}