import { StyleSheet, useColorScheme, StyleProp, ColorSchemeName, ColorValue, ViewStyle, TextStyle } from 'react-native';
// import { TextStyle } from '@expo/html-elements/build/primitives/Text';
// import { ViewStyle } from '@expo/html-elements/build/primitives/View';
import { Theme } from '@react-navigation/native';

export default class clTheme {
    private static _oInstance: clTheme;
    public static configInstance(sColorScheme: ColorSchemeName) {
        this._oInstance = new clTheme(sColorScheme);
    };

    // public static get TxtTheme(): StyleProp<TextStyle> {
    public static get TxtTheme(): any {
        return this._oInstance._TxtTheme;
    };

    // public static get BgTheme(): StyleProp<ViewStyle> {
    public static get BgTheme(): any {
        return this._oInstance._BgTheme;
    };

    public static get TextColor(): ColorValue {
        return this._oInstance._TextColor;
    };
    public static get BorderColor(): ColorValue {
        return this._oInstance._TextColor;
    };
    public static get BGColor(): string {
        return this._oInstance._BGColor;
    };
    public static get IconColor(): string {
        return this._oInstance._IconColor;
    };
    public static get PlaceholderBgTheme(): any {
        return this._oInstance._PlaceholderBgTheme;
    };
    public static get NavTheme(): Theme {
        return this._oInstance._NavTheme;
    };
    public static get minimumTrackTintColor(): string {
        return this._oInstance._minimumTrackTintColor;
    };
    public static get maximumTrackTintColor(): string {
        return this._oInstance._maximumTrackTintColor;
    };
    public static get flashMsg(): ColorValue {
        return this._oInstance._flashMsg;
    };
    public static get buttonBg(): ColorValue {
        return this._oInstance._buttonBg;
    };


    private _sColorScheme: ColorSchemeName;
    constructor(sColorScheme: ColorSchemeName) {
        this._sColorScheme = sColorScheme;
    };
    private get _TxtTheme(): StyleProp<TextStyle> {
        if (this._sColorScheme === 'light') {
            return styles.lightThemeText;
        } else {
            return styles.darkThemeText;
        }
    };

    private get _BgTheme(): StyleProp<ViewStyle> {
        if (this._sColorScheme === 'light') {
            return styles.lightContainer;
        } else {
            return styles.darkContainer;
        }
    };

    private get _TextColor(): ColorValue {
        if (this._sColorScheme === 'light') {
            return styles.lightThemeText.color;
        } else {
            return styles.darkThemeText.color;
        }
    };
    private get _BGColor(): string {
        if (this._sColorScheme === 'light') {
            return styles.lightContainer.backgroundColor;
        } else {
            return styles.darkContainer.backgroundColor;
        }
    };
    private get _IconColor(): string {
        if (this._sColorScheme === 'light') {
            return styles.lightThemeText.color;
        } else {
            return styles.darkThemeText.color;
        }
    };
    private get _PlaceholderBgTheme(): StyleProp<ViewStyle> {
        if (this._sColorScheme === 'light') {
            return styles.lightPlaceholderContainer;
        } else {
            return styles.darkPlaceholderContainer;
        }
    };
    private get _NavTheme(): Theme {
        let oTheme: Theme;
        // if (this._sColorScheme === 'light') {
        //     oTheme = {
        //         dark: false,
        //         colors: {
        //             primary: 'white',
        //             background: 'white',
        //             card: 'white',
        //             text: 'white',
        //             border: 'white',
        //             notification: 'white',
        //         }
        //     };
        // } else {
        oTheme = {
            dark: true,
            fonts: {
                regular: {
                    fontFamily: 'Roboto-Regular',
                    fontWeight: 'normal',
                },
                medium: {
                    fontFamily: 'Roboto-Medium',
                    fontWeight: 'normal',
                },
                bold: {
                    fontFamily: 'Roboto-Bold',
                    fontWeight: 'normal',
                },
                heavy: {
                    fontFamily: 'Roboto-Heavy',
                    fontWeight: 'normal',
                },
            },
            colors: {
                primary: 'white',
                background: this._BGColor,
                card: this._NavCard,
                text: this._TextColor.toString(),
                border: this._TextColor.toString(),
                notification: 'white',
            }
        };
        // };
        return oTheme;
    };
    private get _NavCard(): string {
        if (this._sColorScheme === 'light') {
            return styles.lightNavTheme.backgroundColor;
        } else {
            return styles.darkNavTheme.backgroundColor;
        };
    };
    private get _minimumTrackTintColor(): string {
        if (this._sColorScheme === 'light') {
            return "#6d6bfbff";
        } else {
            return "#67ffdfff";
        };
    };
    private get _maximumTrackTintColor(): string {
        if (this._sColorScheme === 'light') {
            return "#f41c1cff";
        } else {
            return "#e86c6cff";
        };
    };
    private get _flashMsg(): ColorValue {
        if (this._sColorScheme === 'light') {
            return "#3ebfcbff";
        } else {
            return "#218089ff";
        };
    };
    private get _buttonBg(): ColorValue {
        if (this._sColorScheme === 'light') {
            return "transparent";
        } else {
            return "#b3b0b016";
        };
    }
}

const styles = StyleSheet.create({
    lightContainer: {
        backgroundColor: '#fbfbf9',
    },
    darkContainer: {
        backgroundColor: '#242c40',
    },
    lightThemeText: {
        color: '#242c40',
    },
    darkThemeText: {
        color: '#d0d0c0',
    },
    lightPlaceholderContainer: {
        backgroundColor: '#d3d3d3',
    },
    darkPlaceholderContainer: {
        backgroundColor: '#31384d',
    },
    lightNavTheme: {
        backgroundColor: '#ffffff',
    },
    darkNavTheme: {
        backgroundColor: '#1f2431',
    },
});
