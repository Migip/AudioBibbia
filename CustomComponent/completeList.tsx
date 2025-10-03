import React, { createRef } from 'react';
import myReactComponent from './myReactNativeComponent';
import { myTreeNode } from '../Globals/HomepageTypes';
import { Button, GestureResponderEvent, StyleProp, Text, View, ViewStyle } from 'react-native';
import { TreeView, TreeViewRef } from 'react-native-tree-multi-select';

export declare type BooksListProps = {
    onPlaySelected: (aCheckedIds: string[], aTreeList: myTreeNode[]) => void,
    style?: StyleProp<ViewStyle>
};

export default class BooksList extends myReactComponent<BooksListProps> {
    private _aTreeList: myTreeNode[];
    private _aCheckedIds: string[] = [];
    private _oRef?: React.RefObject<TreeViewRef<string> | null>;// = createRef();

    public constructor(props: any) {
        super(props);
        this._aTreeList = BooksList._getTreeList();
    };
    public render() {
        return (
            <View
                style={[this.props.style,
                    {
                        flexDirection: 'column'
                    }
                ]}>
                <Text
                    style={{flex: 1}}>Elenco</Text>
                <View
                    style={{flex: 3}}>
                    <TreeView
                        data={this._aTreeList}
                        ref={this._oRef}
                        onCheck={this._onCheck.bind(this)}
                    /* ref={this._oTreeViewRef} */
                    />
                </View>
                <View
                    style={{flex: 1}}>
                    <Button
                        title='Riproduci selezionati'
                        onPress={this._onPlaySelected.bind(this)} />
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
        this.props.onPlaySelected(this._aCheckedIds, this._aTreeList);
    };

    private static _getTreeList(): myTreeNode[] {
        let aReturn: myTreeNode[] = require('../assets/list.json');
        return aReturn;
    };
}