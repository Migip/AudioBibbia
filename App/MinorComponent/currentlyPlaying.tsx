import React, { createRef, useRef } from 'react';
import myReactComponent from '../../CustomComponent/myReactNativeComponent';
//import { currentPlayingType } from '../../Globals/HomepageTypes';
import { Button, FlatList, GestureResponderEvent, StyleProp, Text, View, ViewStyle } from 'react-native';
import { HomepageStyle } from '../../Styles/HomepageStyle';
import { GeneralStyles } from '../../Styles/GeneralStyles';
import { AudioPlayer, AudioSource, AudioStatus, createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import { cl_link } from '../../Globals/CharUtility';
import ActiveButton from '../../CustomComponent/activeButton';
import { myIcons } from '../../Globals/constants/Icons';
import myPlayer, { currentPlayingType, playingStatus } from '../../Globals/MyPlayer';

export declare type CurrentlyPlayingProps = {
    oRef?: React.RefObject<CurrentlyPlaying | null>,
    style?: StyleProp<ViewStyle>
};


declare type stateType = {
    //aCurrentPlaying: currentPlayingTypeIntern[],
    aCurrentPlaying: currentPlayingType[],
    // oPlayingStatus: playingStatus
};

export default class CurrentlyPlaying extends myReactComponent<CurrentlyPlayingProps> {
    private _oCurrState: stateType;
    public readonly state: stateType;
    // private _oAudio?: AudioPlayer;
    // private _oAudioSource?: AudioSource;
    private _oRef?: React.RefObject<CurrentlyPlaying | null>;

    public constructor(props: CurrentlyPlayingProps) {
        super(props);
        this._oCurrState = {
            aCurrentPlaying: [],//props.aCurrentPlaying
            // oPlayingStatus: playingStatus.none
        };
        setAudioModeAsync({
            shouldPlayInBackground: true
        });
        this._oRef = this.props.oRef;
        this.state = this._oCurrState;
    };
    public render() {
        let sPlayingStatusText: string;
        switch (this._oPlayingStatus) {
            case playingStatus.playing:
                sPlayingStatusText = this._oI18n.CurrentlyPlaying.playing
                break;
            case playingStatus.paused:
                sPlayingStatusText = this._oI18n.CurrentlyPlaying.paused
                break;
            case playingStatus.stop:
                sPlayingStatusText = this._oI18n.CurrentlyPlaying.stopped
                break;
            default:
                sPlayingStatusText = '';
                break;
        };

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
                    style={
                        { flexDirection: 'column' }
                    }>
                    <Text>
                        {sPlayingStatusText}
                    </Text>
                    <View
                        style={[
                            {
                                flexDirection: 'row'
                            }
                        ]}>
                        <View>
                            <ActiveButton
                                title={this._oI18n.CurrentlyPlaying.play}
                                onPress={this._onPlayPress.bind(this)}
                                icon={myIcons.play}
                                active={this._oPlayingStatus === playingStatus.playing} />
                            {/* <Button
                            title='Play/Pausa'
                            onPress={this._onPlayPausePress.bind(this)} /> */}
                        </View>
                        <View>
                            <ActiveButton
                                title={this._oI18n.CurrentlyPlaying.pause}
                                onPress={this._onPausePress.bind(this)}
                                icon={myIcons.pause}
                                active={this._oPlayingStatus === playingStatus.paused} />
                        </View>
                        <View>
                            <ActiveButton
                                title={this._oI18n.CurrentlyPlaying.next}
                                onPress={this._onNext.bind(this)}
                                icon={myIcons.next}
                                active={false} />
                            {/* <Button
                            title={this._oI18n.CurrentlyPlaying.next}
                            onPress={this._onNext.bind(this)} /> */}
                        </View>
                        <View>
                            <ActiveButton
                                title={this._oI18n.CurrentlyPlaying.stop}
                                onPress={this._onStop.bind(this)}
                                icon={myIcons.stop}
                                active={this._oPlayingStatus === playingStatus.stop} />
                            {/* <Button
                            title={this._oI18n.CurrentlyPlaying.stop}
                            onPress={this._onStop.bind(this)} /> */}
                        </View>
                    </View>
                    <Text>{this._oI18n.Footer.testo}
                        {/* <Text>https://www.proclamarelaparola.it/bibbia-in-mp3/</Text> */}
                        <Text
                            style={{ fontWeight: 'bold' }}>
                            https://www.proclamarelaparola.it/
                        </Text>
                    </Text>
                </View>
            </View>)
    };

    componentDidMount(): void {
        // gestisci gli eventi di myPlayer
        myPlayer.addListener('playbackStatusUpdate', (aCurrentPlaying: currentPlayingType[]) => {
            //console.log("CurrentlyPlaying - playbackStatusUpdate", aCurrentPlaying);
            this._refresh(aCurrentPlaying);
        });
    }


    private _onPlayPress(event: GestureResponderEvent): void {
        this._refresh(myPlayer.play());
    };
    private _onPausePress(event: GestureResponderEvent): void {
        this._refresh(myPlayer.pause());
    };

    private _onNext(): void {
        this._refresh(myPlayer.next());
    };

    private _onStop(): void {
        this._refresh(myPlayer.stop());
    };

    public onPlayNewList(aCurrentPlaying: currentPlayingType[]) {
        this._refresh(aCurrentPlaying);
    };

    private get _aCurrentPlaying(): currentPlayingType[] {
        return this._oCurrState.aCurrentPlaying;
    };
    private set _aCurrentPlaying(aNew: currentPlayingType[]) {
        this._oCurrState.aCurrentPlaying = aNew;
        //console.log("CurrentlyPlaying - set _aCurrentPlaying", aNew);
        this.setState(this._oCurrState);
    };

    private get _oPlayingStatus(): playingStatus {
        return myPlayer.playingStatus;
    };

    private _refresh(aNewPlayer: currentPlayingType[]) {
        this._aCurrentPlaying = aNewPlayer;
    };
}