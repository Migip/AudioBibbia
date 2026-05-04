import React from 'react';
import myReactComponent from './myReactNativeComponent';
import { StyleProp, GestureResponderEvent, TextStyle, ViewStyle, TouchableOpacity } from 'react-native';
// import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { iconType } from '../Globals/constants/Icons';
import { Button } from 'react-native-elements';
import { GeneralStyles } from '../Styles/GeneralStyles';
import CustomText from './myText';



declare type CustomButtonProps = {
    title: string,
    onPress: ((event: GestureResponderEvent) => void) | undefined
    //icon?: IconNode
    icon?: iconType,
    header?: true,
    backgroundColor?: string,
    textColor?: string,
    noBorder?: boolean
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
        let sBgColor: string;
        let oStyle: ViewStyle | TextStyle | undefined;
        if (this.props.noBorder) {
            oStyle = undefined;
            sBgColor = 'transparent';
            sBackgroundColor = 'transparent';
        } else {
            oStyle = Styles.button;
            sBgColor = 'transparent';
        };
        if (icon) {
            if (this.props.header) {
                return (
                    <TouchableOpacity
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
                        }}
                        style={{
                            marginRight: 10,
                            flexDirection: 'row',
                            columnGap: 5,
                            alignItems: 'center',
                            alignSelf: 'center'
                        }}>
                        <FontAwesome6
                            name={icon}
                            backgroundColor={sBgColor}
                            size={20}
                            color={sColor} />
                        <CustomText
                            style={{ color: sColor, fontSize: 18, fontWeight: 'bold' }}>
                            {this.props.title}
                        </CustomText>
                    </TouchableOpacity>
                );
                return (
                    <FontAwesome6.Button
                        name={icon}
                        backgroundColor={sBgColor}
                        color={sColor}
                        // style={[Styles.button]}
                        style={[
                            oStyle,
                            {
                                backgroundColor: sBackgroundColor
                            }]}
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
                    <FontAwesome6.Button
                        name={icon}
                        backgroundColor={sBgColor}
                        color={sColor}
                        // style={[Styles.button]}
                        style={[
                            oStyle,
                            {
                                backgroundColor: sBackgroundColor
                            }]}
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
            };
        } else {
            return (
                <Button
                    title={this.props.title}
                    onPress={this.props.onPress}

                    buttonStyle={[
                        Styles.button,
                        {
                            backgroundColor: sBackgroundColor,
                            borderColor: 'black'
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
        // marginHorizontal: 50,
        // marginVertical: 10
    },
    title: {
        marginHorizontal: 20
    }
}