import React, { createRef, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import myReactComponent from '../CustomComponent/myReactNativeComponent';
import { StyleSheet, View } from 'react-native';
import BooksList from '../CustomComponent/completeList';
import { currentPlayingType, myTreeNode } from '../Globals/HomepageTypes';
import CurrentlyPlaying from '../CustomComponent/currentlyPlaying';
import { cl_id, cl_title } from '../Globals/CharUtility';
import { activateKeepAwakeAsync } from 'expo-keep-awake';
//import Sound from 'react-native-sound';

declare type stateType = {
};

export default class Homepage extends myReactComponent {
    private _oCurrentPlayingRef?: React.RefObject<CurrentlyPlaying | null> = createRef();

    public constructor(props: any) {
        super(props);
        console.log("|---------------------- INIZIO APP ----------------------|");
        //useKeepAwake();
        activateKeepAwakeAsync();
    };

    public render() {
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <BooksList
                    style={{ flex: 1 }}
                    onPlaySelected={this.onPlaySelected.bind(this)} />
                <CurrentlyPlaying
                    style={{ flex: 1 }}
                    oRef={this._oCurrentPlayingRef} />
            </View>
        );
    };

    public onPlaySelected(aCheckedIds: string[], aTreeList: myTreeNode[]): void {

        let aCurrentPlaying: currentPlayingType = [];
        aCheckedIds.sort(
            cl_id.sort
        );

        aCheckedIds.forEach(
            (sId) => {
                let aIdLevel = cl_id.splitIdLevels(sId);
                var sCurrentId: string = '';
                var oCurrentNode: myTreeNode | undefined = undefined;
                var sName: string = '';
                aIdLevel.forEach(sId => {
                    sCurrentId = cl_id.concatId(sCurrentId, sId);
                    if (oCurrentNode === undefined) {
                        oCurrentNode = aTreeList.find((oNode) => { return oNode.id === sCurrentId });
                    } else {
                        oCurrentNode = oCurrentNode.children?.find((oNode) => { return oNode.id === sCurrentId });
                    };
                    if (oCurrentNode !== undefined) {
                        if (oCurrentNode.link !== undefined) {
                            aCurrentPlaying.push({
                                id: oCurrentNode.id,
                                name: cl_title.concat(sName, oCurrentNode.name),
                                link: oCurrentNode.link
                            });
                        } else {
                            sName = cl_title.concat(sName, oCurrentNode.name);
                        };
                    } else {
                        console.log("Non trovato id ", sCurrentId);
                    };
                });
            }
        );

        this._oCurrentPlayingRef?.current?.onPlayNewList(aCurrentPlaying);
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 20
    },
    /*container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20
    },*/
})