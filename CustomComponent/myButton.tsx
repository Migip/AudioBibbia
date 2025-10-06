import React from 'react';
import myReactComponent from './myReactNativeComponent';
import { StyleProp, GestureResponderEvent, TextStyle, ViewStyle } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { iconType } from '../Globals/constants/Icons';
import { Button } from 'react-native-elements';
import { GeneralStyles } from '../Styles/GeneralStyles';



declare type CustomButtonProps = {
    title: string,
    onPress: ((event: GestureResponderEvent) => void) | undefined
    //icon?: IconNode
    icon?: iconType,
    backgroundColor?: string,
    textColor?: string,
};

export default class CustomButton extends myReactComponent<CustomButtonProps> {
    protected _sCompName: string = 'CustomButton';
    /**
     * render
     */
    public render() {
        let sColor: string = this.props.textColor || GeneralStyles.unselectedButtonText.color;
        let sBackgroundColor = this.props.backgroundColor || GeneralStyles.unselectedButton.backgroundColor;
        let icon: iconType | undefined = this.props.icon;
        if (icon) {
            return (
                <FontAwesome6.Button
                    name={icon}
                    backgroundColor={sBackgroundColor}
                    color={sColor}
                    style={[Styles.button]}
                    onPress={(event: GestureResponderEvent) => {
                        try {
                            this._log("onPress start", this.props.title);
                            if (this.props.onPress) {
                                this.props.onPress(event);
                            };
                            this._log("onPress end", this.props.title);
                        } catch (error) {
                            console.error("onPress", error);
                        }
                    }}>
                    {this.props.title}
                </FontAwesome6.Button>);
        } else {
            return (
                <Button
                    title={this.props.title}
                    onPress={this.props.onPress}

                    buttonStyle={[
                        Styles.button,
                        {
                            backgroundColor: sBackgroundColor
                        }]}
                    containerStyle={[
                        Styles.container
                    ]}
                    titleStyle={[
                        Styles.title,
                        {
                            color: sColor
                        }]} />
            );
        };
    };
}

const Styles = {
    button: {
        borderRadius: 90,
        borderWidth: 1,
        padding: 10,
        elevation: 2
    },
    container: {
        marginHorizontal: 50,
        marginVertical: 10
    },
    title: {
        marginHorizontal: 20
    }
}