import React from 'react';
import myReactComponent from '../../CustomComponent/myReactNativeComponent';
import { Testamento } from '../../Globals/HomepageTypes';
import { StyleProp, View, ViewStyle, TextStyle } from 'react-native';
import { Button } from 'react-native-elements';
import ActiveButton from '../../CustomComponent/activeButton';
import CustomButton from '../../CustomComponent/myButton';
import CustomSearchBar from '../../CustomComponent/mySearchBar';
import Search from '../Popup/Search';

export declare type DiscriminatorProps = {
    onUnselectPress: () => void;
    onSearch: (text: string) => void;
    sSearchText: string;
};

declare type stateType = {
    sSearchText: string;
    // bSearching: boolean;
};

export default class SearchOptions extends myReactComponent<DiscriminatorProps> {
    // private _bSearching: boolean; // moved into state
    public readonly state: stateType;
    public constructor(props: any) {
        super(props);
        // initialize both searchText and bSearching in state
        // this.state = { searchText: this.props.sSearchText, bSearching: false };
        this.state = { sSearchText: this.props.sSearchText };
        this._bActiveLog = true;
        this._log("SearchOptions constructor", this.state.sSearchText);
    };

    componentDidUpdate(prevProps: Readonly<DiscriminatorProps>, prevState: Readonly<{}>, snapshot?: any): void {

        this._log("SearchOptions mount", this.state.sSearchText, this.props.sSearchText, prevProps.sSearchText);
        // if (this.state.sSearchText !== this.props.sSearchText) {
        if (prevProps.sSearchText !== this.props.sSearchText) {
            this._onSearchChange(this.props.sSearchText);
        }
    };

    public render() {
        this._log("SearchOptions render", this.state.sSearchText, this.props.sSearchText);
        // this._log("SearchOptions render", this.state.bSearching);
        // if (this.state.bSearching === false) {
        return (
            <View
                style={[{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'
                }]}>
                <View
                    style={[]}>
                    {/* <CustomButton
                            title={this._oI18n.searchOptions.searchButton}
                            onPress={this._onSearchPress.bind(this)} /> */}
                    <Search
                        onTextChange={this._onSearchChange.bind(this)}
                        sSearchText={this.state.sSearchText}
                        onSearch={this._onSearchText.bind(this)}
                    />
                </View>
                {/* <View
                        style={[{
                        }]}>
                        <CustomButton
                            title={this._oI18n.searchOptions.unselect}
                            onPress={this.props.onUnselectPress.bind(this)} />
                    </View> */}
            </View>
        )
        // }
        // else {
        //     return (
        //         <View
        //             style={[{
        //                 flexDirection: 'column'
        //             }]}>
        //             <View
        //                 style={[
        //                     // {
        //                     //     flex: 2
        //                     // }
        //                 ]}>
        //                 <CustomSearchBar
        //                     placeholder={this._oI18n.searchOptions.searchPlaceholder}
        //                     onChangeText={this._onSearchChange.bind(this)}
        //                     value={this.state.searchText} />
        //             </View>
        //             <View
        //                 style={[{
        //                     flexDirection: 'row',
        //                     justifyContent: 'space-evenly'
        //                     // {
        //                     //     flex: 1
        //                     // }
        //                 }]}>
        //                 <CustomButton
        //                     title={this._oI18n.searchOptions.searchButton}
        //                     onPress={this._onSearchText.bind(this)} />
        //                 <CustomButton
        //                     title={this._oI18n.searchOptions.searchClose}
        //                     onPress={this._onSearchClose.bind(this)} />
        //             </View>
        //         </View>
        //     )
        // };
    };
    // private _onSearchPress() {
    //     // toggle searching flag in state
    //     this.setState({ ...this.state, bSearching: true });
    //     this._log("Search Pressed");
    // };
    // private _onSearchChange(sNewText: string) {
    //     console.log("Search text changed: ", sNewText);
    //     this.setState({ ...this.state, searchText: sNewText });
    //     //this.props.onSearch(sNewText);
    // };
    // private _onSearchTextOld() {
    // this.props.onSearch(this.state.searchText);
    // this.setState({ ...this.state, bSearching: false });
    // };
    private _onSearchText(sNewText: string) {
        this.props.onSearch(sNewText);
    };
    private _onSearchChange(sNewText: string) {
        this.setState({ ...this.state, sSearchText: sNewText });
    };
    // private _onSearchClose() {
    //     this.setState({ ...this.state, bSearching: false });
    // }
}