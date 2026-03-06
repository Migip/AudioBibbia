import React from 'react';
import myReactComponent from './myReactNativeComponent';
import { Searchbar } from 'react-native-paper';
import clTheme from '../Globals/classes/colorTheme';

export declare type CustomSearchBarProps = {
    placeholder: string,
    value: string,
    onChangeText(s: string): void
};

export default class CustomSearchBar extends myReactComponent<CustomSearchBarProps> {

    public render() {
        return (
            <Searchbar
                placeholder={this.props.placeholder}
                onChangeText={this.props.onChangeText}
                value={this.props.value}
                style={[clTheme.TxtTheme, clTheme.PlaceholderBgTheme]}
                inputStyle={clTheme.TxtTheme}
                placeholderTextColor={clTheme.TextColor}
                iconColor={clTheme.IconColor}
                rippleColor={clTheme.TextColor}
            />
        )
    };
}