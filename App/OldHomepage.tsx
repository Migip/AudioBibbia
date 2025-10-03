import React, { createRef, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, GestureResponderEvent, StyleSheet, Text, View } from 'react-native';
//import { Audio } from 'expo-av';
import { useAudioPlayer, AudioPlayer, AudioSource, createAudioPlayer, AudioStatus } from 'expo-audio';
import { type TreeNode, TreeView, type TreeViewRef } from 'react-native-tree-multi-select';
import { currentPlayingType, listType, myTreeNode } from '../Globals/HomepageTypes';
import { cl_id, cl_link, cl_title } from '../Globals/CharUtility';
import { GeneralStyles } from '../Styles/GeneralStyles';
import { HomepageStyle } from '../Styles/HomepageStyle';
//import Sound from 'react-native-sound';

declare type stateType = {
    // oPlaybackObject?: Audio.SoundObject
    oAudio?: AudioPlayer,
    oAudioSource?: AudioSource,
    aCurrentPlaying: currentPlayingType
};
// declare type chapterType = {
//     title: string,
//     path: string
// };
// declare type listType = {
//     // oPlaybackObject?: Audio.SoundObject
//     title: string,
//     path: string,
//     chapters?: chapterType[]
//     // chapters?: [
//     //     title: string,
//     //     path: string
//     // ]
// };

export default class Homepage extends React.Component {
    private _oCurrState: stateType = {
        aCurrentPlaying: []
    };
    public readonly state: stateType;
    //private _aList: listType[];
    private _aTreeList: myTreeNode[];
    //private _oTreeViewRef = React.useRef<TreeViewRef | null>(null);

    private _oRef: React.RefObject<TreeViewRef<string> | null> = createRef();

    private _aCheckedIds: string[] = [];

    private _iPlayingIndex: number = -1;

    private _aAlreadyFinished: number[] = [];

    public constructor(props: any) {
        super(props);
        console.log("|---------------------- INIZIO APP ----------------------|");
        // this._oCurrState.oAudioSource = {
        //      uri: 'https://www.proclamarelaparola.it/gen01.mp3'
        // };
        /*let sString = '../assets/data/3Gv 1.mp3';
        //this._oCurrState.oAudioSource = require('../assets/data/1Giovanni/1Gv 1.mp3');
        this._oCurrState.oAudioSource = require(sString);
        //const player = useAudioPlayer(this._oCurrState.oAudioSource);
        console.log(this._oCurrState.oAudioSource);
        this._oCurrState.oAudio = createAudioPlayer(this._oCurrState.oAudioSource);*/
        /*Sound.setCategory('Playback');
        const sound = new Sound('data/1Giovanni/1Gv 1.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Errore nel caricamento del suono:', error);
                return;
            }

            // File caricato con successo, riproduci
            sound.play((success) => {
                if (success) {
                    console.log('Riproduzione completata');
                } else {
                    console.log('Errore nella riproduzione');
                }

                // Rilascia la risorsa
                sound.release();
            });
        });*/

        this._aTreeList = Homepage._getTreeList();

        this.state = this._oCurrState;
    };

    public render() {
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <Text>Elenco</Text>
                <View
                    style={{ flex: 1, width: 350 }}>
                    <TreeView
                        data={this._aTreeList}
                        ref={this._oRef}
                        onCheck={this.onCheck.bind(this)}
                    /* ref={this._oTreeViewRef} */
                    />
                </View>
                <View>
                    <Button
                        title='Riproduci selezionati'
                        onPress={this.onPlaySelected.bind(this)} />
                </View>
                <FlatList
                    data={this.state.aCurrentPlaying}
                    // style={ChantsListStyles.item}
                    ListHeaderComponent={
                        <View
                            style={[
                                GeneralStyles.flexHoriz
                            ]}>
                            <Text
                                style={
                                    HomepageStyle.itemNumber
                                }>
                                Brano
                            </Text>
                        </View>
                    }
                    renderItem={({ item }) =>
                        <View>
                            <Text style={{
                                display: item.playing ? 'none' : 'flex'
                            }}>
                                {item.name}
                            </Text>
                            <Text style={{
                                display: !item.playing ? 'none' : 'flex',
                                fontWeight: 'bold'
                            }}>
                                {item.name}
                            </Text>
                        </View>
                    }
                    ListEmptyComponent={
                        <View>
                            <Text>
                                Nessun brano in riproduzione
                            </Text>
                        </View>
                    }
                />
                <View
                    style={{ flex: 0.3, flexDirection: 'row' }}>
                    <Button
                        title='Play/Pausa'
                        onPress={this.onPlayPausePress.bind(this)} />
                    <Button
                        title='Stop'
                        onPress={this.onStop.bind(this)} />
                </View>
            </View>
        );
    };

    private onCheck(
        aCheckedIds: string[],
        aIndeterminateIds: string[]
    ): void {
        this._aCheckedIds = aCheckedIds;
    };

    public onPlaySelected(event: GestureResponderEvent): void {

        if (this._oCurrState.oAudio?.currentStatus.playing === true) {
            this._oCurrState.oAudio.pause();
        };
        this.onStop( );

        this._oCurrState.aCurrentPlaying = [];
        this._aCheckedIds.sort((a, b) => {
            if (a > b) {
                return 1
            } else {
                return -1
            }
        });

        this._aCheckedIds.forEach(
            (sId) => {
                let aIdLevel = cl_id.splitIdLevels(sId);
                var sCurrentId: string = '';
                var oCurrentNode: myTreeNode | undefined = undefined;
                var sName: string = '';
                aIdLevel.forEach(sId => {
                    sCurrentId = cl_id.concatId(sCurrentId, sId);
                    if (oCurrentNode === undefined) {
                        oCurrentNode = this._aTreeList.find((oNode) => { return oNode.id === sCurrentId });
                    } else {
                        oCurrentNode = oCurrentNode.children?.find((oNode) => { return oNode.id === sCurrentId });
                    };
                    if (oCurrentNode !== undefined) {
                        if (oCurrentNode.link !== undefined) {
                            this._oCurrState.aCurrentPlaying.push({
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



        if (this._oCurrState.aCurrentPlaying.length > 0) {
            if (this._oCurrState.oAudio?.currentStatus.playing === true) {
                this._oCurrState.oAudio.pause();
            };
            try {
                this.onNext();
                /*let oFirst = this._oCurrState.aCurrentPlaying[0];
                //this._oCurrState.oAudioSource = require(oFirst.path);
                this._oCurrState.oAudioSource = cl_link.getSource(oFirst);
                this._oCurrState.oAudio = createAudioPlayer(this._oCurrState.oAudioSource);
                this._oCurrState.oAudio.addListener(
                    'playbackStatusUpdate',
                    (status: AudioStatus) => { console.log(status) });
                this._oCurrState.oAudio.play();
                oFirst.playing = true;*/
            } catch (error) {
                console.log("ERRORE FINALE:", error);
            }
        };


        this.setState(this._oCurrState);
    };

    public onPlayPausePress(event: GestureResponderEvent): void {
        if (this._oCurrState.oAudio?.currentStatus.playing === true) {
            this._oCurrState.oAudio.pause();
        } else if (this._oCurrState.oAudio?.currentStatus.playing === false) {
            this._oCurrState.oAudio.play();
        };
        this.setState(this._oCurrState);
    }

    public onNext(): void {
        console.log("onNext");
        console.log("this._iPlayingIndex", this._iPlayingIndex);
        console.log("this._oCurrState.aCurrentPlaying[this._iPlayingIndex]", this._oCurrState.aCurrentPlaying[this._iPlayingIndex + 1]);
        try {
            if (this._iPlayingIndex !== -1) {
                let oCurrent = this._oCurrState.aCurrentPlaying[this._iPlayingIndex];
                oCurrent.playing = false;
            }
        } catch (error) {
            console.log("onNext:", error)
        };

        if (this._iPlayingIndex < this._oCurrState.aCurrentPlaying.length - 1) {
            this._iPlayingIndex++;
            let oNext = this._oCurrState.aCurrentPlaying[this._iPlayingIndex];
            //this._oCurrState.oAudioSource = require(oFirst.path);
            this._oCurrState.oAudioSource = cl_link.getSource(oNext);
            this._oCurrState.oAudio = createAudioPlayer(this._oCurrState.oAudioSource);
            this._oCurrState.oAudio.addListener(
                'playbackStatusUpdate',
                this.onAudioStatusUpdate.bind(this));
            this._oCurrState.oAudio.play();
            oNext.playing = true;

            this.setState(this._oCurrState);
        } else {
            this.onStop();
        };
    };

    public onStop(): void {
        this._iPlayingIndex = -1;
        this._oCurrState.aCurrentPlaying.forEach(
            (oLine) => {
                oLine.playing = undefined;
            }
        );
        this.setState(this._oCurrState);
    };

    private static _getTreeList(): myTreeNode[] {

        /*let aList: listType[] = require('../assets/data/list.json');
        var iBookProgr: number = 0;
        var aReturn: myTreeNode[] = [];
        aList.forEach(oList => {
            var aChildren: myTreeNode[] = [];
            let iChapterProg: number = 0;
            iBookProgr++;
            if (oList.chapters) {
                oList.chapters.forEach(oChapter => {
                    iChapterProg++;
                    let oTreeNodeSon: myTreeNode = {
                        'id': cl_id.concatId(iBookProgr, iChapterProg),
                        'name': oChapter.title,
                        'path': oChapter.path
                    };
                    //aReturn.push(oTreeNodeSon);
                    aChildren.push(oTreeNodeSon);
                });
            };
            let oTreeNodeFather: myTreeNode = {
                'id': cl_id.getStringId(iBookProgr),
                'name': oList.title,
                'children': aChildren,
                'path': oList.path
            };
            aReturn.push(oTreeNodeFather);
        });*/
        let aReturn: myTreeNode[] = require('../assets/list.json');
        return aReturn;
    };

    private onAudioStatusUpdate(status: AudioStatus): void {
        //console.log(status);
        if (status.didJustFinish === true && this._aAlreadyFinished.find((id) => { return id === status.id }) === undefined) {
            this._aAlreadyFinished.push(status.id);
            this.onNext();
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20
    },
})