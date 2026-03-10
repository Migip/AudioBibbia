//import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import myReactComponent from '../../CustomComponent/myReactNativeComponent';
import CustomPopup from '../../CustomComponent/myPopup';
import { myIcons } from '../../Globals/constants/Icons';
import { Text } from 'react-native-elements';
import CustomButton from '../../CustomComponent/myButton';
import CustomSearchBar from '../../CustomComponent/mySearchBar';
import CustomText from '../../CustomComponent/myText';
import CustomTitle from '../../CustomComponent/myTitle';


declare type SearchProps = {
    sSearchText: string;
    onTextChange: (text: string) => void;
    onSearch: (text: string) => void;
};

declare type stateType = {
    // searchText: string;
};


export default class Search extends myReactComponent<SearchProps> {
    // private _oCurrState: stateType;
    // public readonly state: stateType;
    private _oSearchRef?: React.RefObject<CustomPopup | null>;

    public constructor(props: any) {
        super(props);
        let oApp = require('../../app.json');
        this._oSearchRef = React.createRef<CustomPopup>()
        // this._oCurrState = {
        //     searchText: ''
        // };
        // this.state = this._oCurrState;
    };

    public render() {
        console.log("Rendering Search component with searchText: ", this.props.sSearchText);
        return (
            <CustomPopup
                buttonTitle={this._oI18n.searchOptions.searchButton}
                icon={myIcons.Search}
                noBorder={true}
                ref={this._oSearchRef}
                noOkButton
                popupContent={
                    <View
                        style={[{
                            flexDirection: 'column',
                            alignSelf: 'auto' 
                        }]}>
                        <CustomTitle>
                            {this._oI18n.searchOptions.searchTitle}
                        </CustomTitle>
                        <CustomSearchBar
                            placeholder={this._oI18n.searchOptions.searchPlaceholder}
                            onChangeText={this._onSearchChange.bind(this)}
                            value={this.props.sSearchText} />
                            {/* value={this.state.searchText} /> */}
                        <View
                            style={[{
                                flexDirection: 'column',
                                justifyContent: 'space-evenly'
                                // {
                                //     flex: 1
                                // }
                            }]}>
                            <CustomButton
                                title={this._oI18n.searchOptions.searchButton}
                                onPress={this._onSearchText.bind(this)} />
                            <CustomButton
                                title={this._oI18n.searchOptions.searchClose}
                                onPress={this._onSearchClose.bind(this)} />
                            <CustomButton
                                title={this._oI18n.searchOptions.searchCancel}
                                onPress={this._onSearchCancel.bind(this)} />
                        </View>
                    </View>} />
        );
    };

    private _onSearchChange(sNewText: string) {
        console.log("Search text changed: ", sNewText);
        this.props.onTextChange(sNewText);
        this.setState({ ...this.state, searchText: sNewText });
        //this.props.onSearch(sNewText);
    };
    private _onSearchText() {
        // console.log("Search text submitted: ", this.state.searchText);
        // this.props.onSearch(this.state.searchText);
        this.props.onSearch(this.props.sSearchText);
        this.setState({ ...this.state, bSearching: false });
        this._oSearchRef?.current?.Close();
    };
    private _onSearchClose() {
        this.setState({ ...this.state, bSearching: false });
        this._oSearchRef?.current?.Close();
    }
    private _onSearchCancel() {
        //this._onSearchChange('');
        this.setState({ ...this.state, searchText: '' }, this._onSearchText.bind(this));
        this.props.onTextChange('');

    }
}