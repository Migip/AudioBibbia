import myReactComponent from './myReactNativeComponent';
import { GestureResponderEvent, View } from 'react-native';
import { iconType } from '../Globals/constants/Icons';
import CustomButton from './myButton';
import { GeneralStyles } from '../Styles/GeneralStyles';



declare type ActiveButtonProps = {
    title: string,
    onPress: ((event: GestureResponderEvent) => void) | undefined
    icon?: iconType,
    active: boolean
};

export default class ActiveButton extends myReactComponent<ActiveButtonProps> {
    protected _sCompName: string = 'CustomButton';
    /**
     * render
     */
    public render() {
        // let sColor: string;
        // let sBackgroundColor: string;
        // if (this.props.active) {
        //     sColor = GeneralStyles.selectedButtonText.color;
        //     sBackgroundColor = GeneralStyles.selectedButton.backgroundColor;
        //     return (
        //         <CustomButton
        //             title={this.props.title}
        //             onPress={this.props.onPress}
        //             icon={this.props.icon}
        //             backgroundColor={sBackgroundColor}
        //             textColor={sColor} />
        //     );
        // } else {
        //     sColor = GeneralStyles.unselectedButtonText.color;
        //     sBackgroundColor = GeneralStyles.unselectedButton.backgroundColor;
        //     return (
        //         <CustomButton
        //             title={this.props.title}
        //             onPress={this.props.onPress}
        //             icon={this.props.icon}
        //             backgroundColor={sBackgroundColor}
        //             textColor={sColor} />
        //     );
        // };
        return (
            <View>
                <View
                    style={[
                        {
                            display: this.props.active ? 'none' : 'flex'
                        }
                    ]}>
                    <CustomButton
                        title={this.props.title}
                        onPress={this.props.onPress}
                        icon={this.props.icon}
                        backgroundColor={GeneralStyles.unselectedButton.backgroundColor}
                        textColor={GeneralStyles.unselectedButtonText.color} />
                </View>
                <View
                    style={[
                        {
                            display: this.props.active ? 'flex' : 'none'
                        }
                    ]}>
                    <CustomButton
                        title={this.props.title}
                        onPress={this.props.onPress}
                        icon={this.props.icon}
                        backgroundColor={GeneralStyles.selectedButton.backgroundColor}
                        textColor={GeneralStyles.selectedButtonText.color} />
                </View>
            </View>
        );
    }
};