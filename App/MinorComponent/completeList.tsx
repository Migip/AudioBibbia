import React, { createRef } from 'react';
import myReactComponent from '../../CustomComponent/myReactNativeComponent';
import { myTreeNode, Testamento } from '../../Globals/HomepageTypes';
import { Button, GestureResponderEvent, StyleProp, Text, View, ViewStyle } from 'react-native';
import { TreeView, TreeViewRef } from 'react-native-tree-multi-select';
import Discriminator from './discriminatorAT_NT';
import ActiveButton from '../../CustomComponent/activeButton';

export declare type BooksListProps = {
    onPlaySelected: (aCheckedIds: string[], aTreeList: myTreeNode[]) => void,
    style?: StyleProp<ViewStyle>
};

declare type stateType = {
    oTestamento: Testamento,
    aTreeList: myTreeNode[]
};

export default class BooksList extends myReactComponent<BooksListProps> {
    // private _aTreeList: myTreeNode[];
    private _aCheckedIds: string[] = [];
    private _oRef?: React.RefObject<TreeViewRef<string> | null>;// = createRef();
    public readonly state: stateType;
    private _oState: stateType;


    public constructor(props: any) {
        super(props);
        this._oState = {
            oTestamento: Testamento.Nuovo,
            aTreeList: BooksList._getTreeListNT()
        };
        this.state = this._oState;
    };
    public render() {
        return (
            <View
                style={[this.props.style,
                {
                    flexDirection: 'column'
                }
                ]}>
                <Discriminator
                    oTestamento={this.oTestamento}
                    onAnticoPress={this._onAnticoPress.bind(this)}
                    onNuovoPress={this._onNuovoPress.bind(this)} />
                <Text
                    style={{ flex: 1 }}>Elenco</Text>
                <View
                    style={{ flex: 3 }}>
                    <TreeView
                        data={this.state.aTreeList}
                        ref={this._oRef}
                        onCheck={this._onCheck.bind(this)}
                    /* ref={this._oTreeViewRef} */
                    />
                </View>
                <View
                    style={{ flex: 1 }}>
                    <ActiveButton
                        title={this._oI18n.BooksList.playSelected}
                        onPress={this._onPlaySelected.bind(this)}
                        active={false} />
                    {/* <Button
                        title='Riproduci selezionati'
                        onPress={this._onPlaySelected.bind(this)} /> */}
                </View>
            </View>)
    };


    private _onCheck(
        aCheckedIds: string[],
        aIndeterminateIds: string[]
    ): void {
        this._aCheckedIds = aCheckedIds;
    };

    private _onPlaySelected(event: GestureResponderEvent): void {
        this.props.onPlaySelected(this._aCheckedIds, this._oState.aTreeList);
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
            this._oState.aTreeList = BooksList._getTreeListAT();
        } else {
            this._oState.aTreeList = BooksList._getTreeListNT();
        };
        this.setState(this._oState);
    };

    private _onAnticoPress() {
        this.oTestamento = Testamento.Antico;
    };
    private _onNuovoPress() {
        this.oTestamento = Testamento.Nuovo;
    };
}