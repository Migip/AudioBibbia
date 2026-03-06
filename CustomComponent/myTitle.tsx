import React from 'react';
import { Text, TextProps, View } from 'react-native';
import clTheme from '../Globals/classes/colorTheme';
import myReactComponent from './myReactNativeComponent';
import CustomText from './myText';


export default class CustomTitle extends CustomText {
    public render() {

        const { children, style, ...rest } = this.props;
        const styles = [style, { fontWeight: 'bold', fontSize: 17 }].filter(Boolean);
        return (
            <View
                style={[{ margin: 10 }]}>
                <CustomText style={styles as any} {...rest}>
                    {children}
                </CustomText>
            </View>)
    }
}