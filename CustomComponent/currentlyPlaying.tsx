import React, { createRef, useRef } from 'react';
import myReactComponent from './myReactNativeComponent';
import { currentPlayingType } from '../Globals/HomepageTypes';
import { Button, FlatList, GestureResponderEvent, StyleProp, Text, View, ViewStyle } from 'react-native';
import { HomepageStyle } from '../Styles/HomepageStyle';
import { GeneralStyles } from '../Styles/GeneralStyles';
import { AudioPlayer, AudioSource, AudioStatus, createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import { cl_link } from '../Globals/CharUtility';

export declare type CurrentlyPlayingProps = {
    oRef?: React.RefObject<CurrentlyPlaying | null>,
    style?: StyleProp<ViewStyle>
};

declare type stateType = {
    aCurrentPlaying: currentPlayingType,
};

export default class CurrentlyPlaying extends myReactComponent<CurrentlyPlayingProps> {
    private _oCurrState: stateType;
    public readonly state: stateType;
    private _iPlayingIndex: number = -1;
    private _oAudio?: AudioPlayer;
    private _oAudioSource?: AudioSource;
    private _aAlreadyFinished: number[] = [];
    private _oRef?: React.RefObject<CurrentlyPlaying | null>;

    public constructor(props: CurrentlyPlayingProps) {
        super(props);
        this._oCurrState = {
            aCurrentPlaying: []//props.aCurrentPlaying
        };
        setAudioModeAsync({
            shouldPlayInBackground: true
        });
        this._oRef = this.props.oRef;
        this.state = this._oCurrState;
    };
    public render() {
        if (this._oRef) {
            this._oRef.current = this;
        };
        return (
            <View
                style={[this.props.style,
                {
                    flexDirection: 'column'
                }
                ]}>
                <FlatList
                    data={this.state.aCurrentPlaying}
                    style={{
                        flex: 4
                    }}
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
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                    <View>
                        <Button
                            title='Play/Pausa'
                            onPress={this._onPlayPausePress.bind(this)} />
                    </View>
                    <View>
                        <Button
                            title='Avanti'
                            onPress={this._onNext.bind(this)} />
                    </View>
                    <View>
                        <Button
                            title='Stop'
                            onPress={this._onStop.bind(this)} />
                    </View>
                </View>
            </View>)
    };



    private _onPlayPausePress(event: GestureResponderEvent): void {
        if (this._oAudio?.currentStatus.playing === true) {
            this._oAudio.pause();
        } else if (this._oAudio?.currentStatus.playing === false) {
            this._oAudio.play();
        } else if (!this._oAudio && this._oCurrState.aCurrentPlaying.length > 0) {
            this._onNext();
        };
        this.setState(this._oCurrState);
    }

    private _onNext(): void {
        try {
            if (this._iPlayingIndex !== -1) {
                let oCurrent = this._oCurrState.aCurrentPlaying[this._iPlayingIndex];
                if (this._oAudio?.playing === true ) {
                    this._oAudio.pause();
                }
                oCurrent.playing = false;
            }
        } catch (error) {
            console.log("onNext:", error)
        };

        if (this._iPlayingIndex < this._oCurrState.aCurrentPlaying.length - 1) {
            this._iPlayingIndex++;
            let oNext = this._oCurrState.aCurrentPlaying[this._iPlayingIndex];
            //this._oCurrState.oAudioSource = require(oFirst.path);
            this._oAudioSource = cl_link.getSource(oNext);
            this._oAudio = createAudioPlayer(this._oAudioSource);
            this._oAudio.addListener(
                'playbackStatusUpdate',
                this._onAudioStatusUpdate.bind(this));
            this._oAudio.play();
            oNext.playing = true;

            this.setState(this._oCurrState);
        } else {
            this._onStop();
        };
    };

    private _onStop(): void {
        this._iPlayingIndex = -1;
        this._oCurrState.aCurrentPlaying.forEach(
            (oLine) => {
                oLine.playing = undefined;
            }
        );
        if (this._oAudio?.currentStatus.playing === true) {
            this._oAudio.pause();
            this._oAudio = undefined;
        };
        this.setState(this._oCurrState);
    };

    private _onAudioStatusUpdate(status: AudioStatus): void {
        //console.log(status);
        if (status.didJustFinish === true && this._aAlreadyFinished.find((id) => { return id === status.id }) === undefined) {
            this._aAlreadyFinished.push(status.id);
            this._onNext();
        }
    };

    public onPlayNewList(aCurrentPlaying: currentPlayingType) {
        this._onStop();

        this._oCurrState.aCurrentPlaying = aCurrentPlaying;

        if (this._oCurrState.aCurrentPlaying.length > 0) {
            try {
                this._onNext();
            } catch (error) {
                console.log("ERRORE FINALE:", error);
            }
        };

        this.setState(this._oCurrState);
    };
}