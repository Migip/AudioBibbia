import React, { createRef } from 'react';
import myReactComponent from '../../CustomComponent/myReactNativeComponent';
import { Testamento } from '../../Globals/HomepageTypes';
import { StyleProp, View, ViewStyle, TextStyle } from 'react-native';
import { Button } from 'react-native-elements';
import ActiveButton from '../../CustomComponent/activeButton';
import { Dropdown } from 'react-native-element-dropdown';
import CustomText from '../../CustomComponent/myText';
import CustomTitle from '../../CustomComponent/myTitle';

export declare type DiscriminatorProps = {
    oTestamento: Testamento,
    onAnticoPress: { (): void };
    onNuovoPress: { (): void }
};

declare type stateType = {
    testamento: Testamento,
    // ATbuttonStyle: StyleProp<ViewStyle>,
    // ATtextStyle: StyleProp<TextStyle>,
    // NTbuttonStyle: StyleProp<ViewStyle>,
    // NTtextStyle: StyleProp<TextStyle>,
};

export default class Discriminator extends myReactComponent<DiscriminatorProps> {
    // private _ATbuttonStyle: StyleProp<ViewStyle>;
    // private _ATtextStyle: StyleProp<TextStyle>;
    // private _NTbuttonStyle: StyleProp<ViewStyle>;
    // private _NTtextStyle: StyleProp<TextStyle>;
    // private _oState: stateType;
    // public readonly state: stateType;
    private aData: { id: Testamento, label: string }[];
    public constructor(props: any) {
        super(props);
        // this._oState = {
        //     testamento: this.props.oTestamento,
        // };
        // this.state = this._oState;
        this.aData = [{
            id: Testamento.Antico,
            label: this._oI18n.BooksList.titleAT
        }, {
            id: Testamento.Nuovo,
            label: this._oI18n.BooksList.titleNT
        }]
        console.log(this.aData);
        // if (this.props.oTestamento === Testamento.Antico) {
        //     this._oState = {
        //         ATbuttonStyle: Styles.selectedButton,
        //         ATtextStyle: Styles.selectedText,
        //         NTbuttonStyle: Styles.unselectedButton,
        //         NTtextStyle: Styles.unselectedText,
        //     }
        // } else {
        //     this._oState = {
        //         ATbuttonStyle: Styles.unselectedButton,
        //         ATtextStyle: Styles.unselectedText,
        //         NTbuttonStyle: Styles.selectedButton,
        //         NTtextStyle: Styles.selectedText,
        //     }
        // };
        // this._oState = this.getState(this.props.oTestamento);
        // this.state = this._oState;
    };
    public render() {
        // this.setNewTestamento(this.props.oTestamento);
        // this.oTestamento = this.props.oTestamento;
        // if (this.props.oTestamento === Testamento.Antico) {
        //     this._ATbuttonStyle = Styles.selectedButton;
        //     this._ATtextStyle = Styles.selectedText;
        //     this._NTbuttonStyle = Styles.unselectedButton;
        //     this._NTtextStyle = Styles.unselectedText;
        // } else {
        //     this._ATbuttonStyle = Styles.unselectedButton;
        //     this._ATtextStyle = Styles.unselectedText;
        //     this._NTbuttonStyle = Styles.selectedButton;
        //     this._NTtextStyle = Styles.selectedText;
        // };
        // console.log(
        //     'render: ',
        //     this.props.oTestamento,
        //     this._ATtextStyle.color,
        //     this._NTtextStyle.color,
        //     this._ATbuttonStyle.backgroundColor,
        //     this._NTbuttonStyle.backgroundColor);
        return (
            <View
                style={[{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    flex: 1
                }]}>
                <Dropdown
                    style={[{ flex: 1 },
                    {
                        margin: 16,
                        borderRadius: 12
                    }
                    ]}
                    data={this.aData}
                    labelField='label'
                    valueField='id'
                    selectedTextStyle={{ fontWeight: 'bold', fontSize: 17 }}
                    value={this.props.oTestamento}
                    onChange={(item) => {
                        if (item.id === Testamento.Antico) {
                            this.props.onAnticoPress();
                        } else {
                            this.props.onNuovoPress();
                        }
                    }} />
                {/* <ActiveButton
                    title={this._oI18n.BooksList.at}
                    onPress={this.props.onAnticoPress}
                    active={this.props.oTestamento === Testamento.Antico} />
                <ActiveButton
                    title={this._oI18n.BooksList.nt}
                    onPress={this.props.onNuovoPress}
                    active={this.props.oTestamento === Testamento.Nuovo} /> */}
                {/* <View
                    style={[
                        {
                            flexDirection: 'row',
                            display: this.props.oTestamento === Testamento.Antico ? 'flex' : 'none'
                        }
                    ]}>
                    <Button
                        title='Antico Testamento'
                        onPress={this.props.onAnticoPress}
                        buttonStyle={[
                            Styles.button,
                            Styles.selectedButton
                            // this._ATbuttonStyle
                        ]}
                        titleStyle={[
                            // this._ATtextStyle
                            Styles.selectedText
                        ]} />
                    <Button
                        title='Nuovo Testamento'
                        onPress={this.props.onNuovoPress}
                        buttonStyle={[
                            Styles.button,
                            // this._NTbuttonStyle
                            Styles.unselectedButton
                        ]}
                        titleStyle={[
                            // this._NTtextStyle
                            Styles.unselectedText
                        ]} />
                </View>
                <View
                    style={[
                        {
                            flexDirection: 'row',
                            display: this.props.oTestamento === Testamento.Nuovo ? 'flex' : 'none'
                        }
                    ]}>
                    <Button
                        title='Antico Testamento'
                        onPress={this.props.onAnticoPress}
                        buttonStyle={[
                            Styles.button,
                            Styles.unselectedButton
                            // this._ATbuttonStyle
                        ]}
                        titleStyle={[
                            Styles.unselectedText
                        ]} />
                    <Button
                        title='Nuovo Testamento'
                        onPress={this.props.onNuovoPress}
                        buttonStyle={[
                            Styles.button,
                            Styles.selectedButton
                        ]}
                        titleStyle={[
                            Styles.selectedText
                        ]} />
                </View> */}
            </View>
        )
    };

    // private set oTestamento(oNew: Testamento) {
    //     this._oState = this.getState(oNew);
    //     if (JSON.stringify(this.state) !== JSON.stringify(this._oState)) {
    //         this.setState(this._oState);
    //     };
    // };
    // private get oTestamento(): Testamento {
    //     return this.props.oTestamento;
    // };

    // private async setNewTestamento(oNew: Testamento) {
    //     this._oState = this.getState(oNew);
    //     if (JSON.stringify(this.state) !== JSON.stringify(this._oState)) {
    //         this.setState(this._oState);
    //     };
    // };

    // private getState(oNew: Testamento): stateType {
    //     if (oNew === Testamento.Antico) {
    //         return {
    //             ATbuttonStyle: Styles.selectedButton,
    //             ATtextStyle: Styles.selectedText,
    //             NTbuttonStyle: Styles.unselectedButton,
    //             NTtextStyle: Styles.unselectedText,
    //         }
    //     } else {
    //         return {
    //             ATbuttonStyle: Styles.unselectedButton,
    //             ATtextStyle: Styles.unselectedText,
    //             NTbuttonStyle: Styles.selectedButton,
    //             NTtextStyle: Styles.selectedText,
    //         }
    //     };
    // }
}

// const Styles = {
//     button: {
//         borderRadius: 90,
//         borderWidth: 1,
//         padding: 10,
//         elevation: 2
//     },
//     selectedButton: {
//         backgroundColor: 'blue'
//     },
//     selectedText: {
//         color: 'white'
//     },
//     unselectedButton: {
//         backgroundColor: 'white'
//     },
//     unselectedText: {
//         color: 'blue'
//     }
// }