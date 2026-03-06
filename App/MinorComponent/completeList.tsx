import React, { createRef } from 'react';
import myReactComponent from '../../CustomComponent/myReactNativeComponent';
import { myTreeNode, Testamento } from '../../Globals/HomepageTypes';
import { Button, GestureResponderEvent, StyleProp, Text, View, ViewStyle } from 'react-native';
import { TreeView, TreeViewRef } from 'react-native-tree-multi-select';
import Discriminator from './discriminatorAT_NT';
import ActiveButton from '../../CustomComponent/activeButton';
import myPlayer from '../../Globals/classes/MyPlayer';
import CurrentTrack from './currentTrack';
import Info from '../Popup/Info';
import SearchOptions from './SearchOptions';
import { GeneralStyles } from '../../Styles/GeneralStyles';
import CustomButton from '../../CustomComponent/myButton';
import CustomTitle from '../../CustomComponent/myTitle';

export declare type BooksListProps = {
    navigation: any
    // onPlaySelected: (aCheckedIds: string[], aTreeList: myTreeNode[]) => void,
    // style?: StyleProp<ViewStyle>
};

declare type stateType = {
    oTestamento: Testamento,
    aTreeList: myTreeNode[]
};

export default class BooksList extends myReactComponent<BooksListProps> {
    // private _aTreeList: myTreeNode[];
    private _aCheckedIds: string[] = [];
    private _oTreeRef?: React.RefObject<TreeViewRef<string> | null>;// = createRef();
    public readonly state: stateType;
    private _oState: stateType;
    private _aCompleteTreeList: myTreeNode[] = [];


    public constructor(props: any) {
        super(props);
        this._aCompleteTreeList = BooksList._getTreeListNT();
        this._oState = {
            oTestamento: Testamento.Nuovo,
            aTreeList: this._aCompleteTreeList
        };
        this.state = this._oState;
        props.navigation.setOptions({
            headerRight: () => (
                <Info />
            )
        });
        this._bActiveLog = true;
        //const treeViewRef = React.useRef<TreeViewRef | null>(null);
        this._oTreeRef = React.createRef<TreeViewRef>()
    };
    public render() {
        //this._oTreeRef = React.useRef<TreeViewRef | null>(null);
        return (
            <View
                style={[
                    // this.props.style,
                    {
                        flexDirection: 'column'
                    },
                    GeneralStyles.container
                ]}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly'
                    }}>
                    <Discriminator
                        oTestamento={this.oTestamento}
                        onAnticoPress={this._onAnticoPress.bind(this)}
                        onNuovoPress={this._onNuovoPress.bind(this)} />
                    <SearchOptions
                        onSearch={this._onSearch.bind(this)}
                        onUnselectPress={this._onUnselect.bind(this)}
                    />
                </View>

                <View
                    style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly'
                        }}>
                        <CustomTitle>
                            {this.oTestamento === Testamento.Antico ? this._oI18n.BooksList.titleAT : this._oI18n.BooksList.titleNT}
                        </CustomTitle>
                        <CustomButton
                            title={this._oI18n.searchOptions.unselect}
                            onPress={this._onUnselect.bind(this)} />
                    </View>
                    <TreeView
                        data={this.state.aTreeList}
                        ref={this._oTreeRef}
                        onCheck={this._onCheck.bind(this)}
                    /* ref={this._oTreeViewRef} */
                    />
                </View>
                <View>
                    <ActiveButton
                        title={this._oI18n.BooksList.playSelected}
                        onPress={this._onPlaySelected.bind(this)}
                        active={false} />
                    {/* <Button
                        title='Riproduci selezionati'
                        onPress={this._onPlaySelected.bind(this)} /> */}
                </View>
                <CurrentTrack />
            </View>)
    };


    private _onCheck(
        aCheckedIds: string[],
        aIndeterminateIds: string[]
    ): void {
        this._aCheckedIds = aCheckedIds;
        console.log("Checked IDs: ", aCheckedIds);
    };

    private _onPlaySelected(event: GestureResponderEvent): void {
        //this.props.onPlaySelected(this._aCheckedIds, this._oState.aTreeList);
        myPlayer.setNewList(this._aCheckedIds, this._oState.aTreeList)
    };

    private static _getTreeListNT(): myTreeNode[] {
        let aReturn: myTreeNode[] = require('../../assets/listNT.json');
        return aReturn;
    };
    private static _getTreeListAT(): myTreeNode[] {
        let aReturn: myTreeNode[] = require('../../assets/listAT.json');
        return aReturn;
    };

    private get oTestamento(): Testamento {
        return this._oState.oTestamento;
    };

    private set oTestamento(oNew: Testamento) {
        this._oState.oTestamento = oNew;
        if (this._oState.oTestamento === Testamento.Antico) {
            this._aCompleteTreeList = BooksList._getTreeListAT();
        } else {
            this._aCompleteTreeList = BooksList._getTreeListNT();
        };
        this._oState.aTreeList = this._aCompleteTreeList;
        this.setState(this._oState);
    };

    private _onAnticoPress() {
        this.oTestamento = Testamento.Antico;
    };
    private _onNuovoPress() {
        this.oTestamento = Testamento.Nuovo;
    };

    private _onUnselect() {
        this._log("Unselecting nodes: " + this._oTreeRef + this._oTreeRef?.current + this._aCheckedIds);
        this._oTreeRef?.current?.unselectNodes(this._aCheckedIds);
        this._aCheckedIds = [];
        this.setState(this._oState);
    };

    private _onSearch(sText: string) {
        this._log("Search for " + sText);
        let aFiltered: myTreeNode[] = [];
        for (let oNode of this._aCompleteTreeList) {
            let oFiltered = BooksList._filterNode(oNode, sText);
            if (oFiltered !== null) {
                aFiltered.push(oFiltered);
            }
        };
        this._oState.aTreeList = aFiltered;
        console.log("Filtered list: ", aFiltered);
        this.setState(this._oState);
    };

    private static _filterNode(oNode: myTreeNode, sText: string): myTreeNode | null {
        let bMatch = oNode.name.toLowerCase().includes(sText.toLowerCase()) || oNode.id.toLowerCase().includes(sText.toLowerCase());;
        let aFilteredChildren: myTreeNode[] = [];
        if (oNode.children !== undefined) {
            for (let oChild of oNode.children) {
                if (bMatch) {
                    aFilteredChildren.push(oChild);
                } else {
                    let oFilteredChild = BooksList._filterNode(oChild, sText);
                    if (oFilteredChild !== null) {
                        aFilteredChildren.push(oFilteredChild);
                    }

                }
            }
        };
        if (bMatch || aFilteredChildren.length > 0) {
            return {
                ...oNode,
                children: aFilteredChildren
            };
        } else {
            return null;
        }
    };
}