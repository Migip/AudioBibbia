import React from 'react';
import { Text, TextProps } from 'react-native';
import clTheme from '../Globals/classes/colorTheme';
import myReactComponent from './myReactNativeComponent';


export default class CustomText extends myReactComponent<TextProps> {
    public render() {

        const { children, style, ...rest } = this.props;
        const styles = [style, clTheme.TxtTheme].filter(Boolean);
        return (
            <Text style={styles as any} {...rest}>
                {children}
            </Text>)
    }
}