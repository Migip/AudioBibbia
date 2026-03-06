import React, { createRef, useRef } from 'react';
import myReactComponent from '../../CustomComponent/myReactNativeComponent';
//import { currentPlayingType } from '../../Globals/HomepageTypes';
import { Button, FlatList, GestureResponderEvent, StyleProp, Text, View, ViewStyle } from 'react-native';
import { HomepageStyle } from '../../Styles/HomepageStyle';
import { GeneralStyles } from '../../Styles/GeneralStyles';
//import { AudioPlayer, AudioSource, AudioStatus, createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import myPlayer, { currentPlayingType, playEventType, playingStatus } from '../../Globals/classes/MyPlayer';
import CurrentTrack from './currentTrack';
import Info from '../Popup/Info';
import { cl_conversion } from '../../Globals/classes/CharUtility';

export declare type CurrentlyPlayingProps = {
    navigation: any
    // oRef?: React.RefObject<CurrentlyPlaying | null>,
    // style?: StyleProp<ViewStyle>
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
    //private _oRef?: React.RefObject<CurrentlyPlaying | null>;

    public constructor(props: CurrentlyPlayingProps) {
        super(props);
        this._oCurrState = {
            aCurrentPlaying: [],//props.aCurrentPlaying
            // oPlayingStatus: playingStatus.none
        };
        // setAudioModeAsync({
        //     shouldPlayInBackground: true
        // });
        // this._oRef = this.props.oRef;
        this.state = this._oCurrState;
        props.navigation.setOptions({
            headerRight: () => (
                <Info />
            )
        });
    };
    public render() {
        // let sPlayingStatusText: string;
        // switch (this._oPlayingStatus) {
        //     case playingStatus.playing:
        //         sPlayingStatusText = this._oI18n.CurrentlyPlaying.playing
        //         break;
        //     case playingStatus.paused:
        //         sPlayingStatusText = this._oI18n.CurrentlyPlaying.paused
        //         break;
        //     case playingStatus.stop:
        //         sPlayingStatusText = this._oI18n.CurrentlyPlaying.stopped
        //         break;
        //     default:
        //         sPlayingStatusText = '';
        //         break;
        // };

        // if (this._oRef) {
        //     this._oRef.current = this;
        // };
        return (
            <View
                style={[
                    // this.props.style,
                    {
                        flexDirection: 'column'
                    },
                    GeneralStyles.container
                ]}>
                <FlatList
                    data={this.state.aCurrentPlaying}
                    style={{
                        flex: 4,
                        rowGap: 10
                    }}
                    // style={ChantsListStyles.item}
                    // ListHeaderComponent={
                    //     <View
                    //         style={[
                    //             GeneralStyles.flexHoriz
                    //         ]}>
                    //         <Text
                    //             style={
                    //                 HomepageStyle.itemNumber
                    //             }>
                    //             {this._oI18n.CurrentlyPlaying.ListTitle}
                    //         </Text>
                    //     </View>
                    // }
                    renderItem={({ item }) =>
                        <View>
                            <Text style={{
                                display: !item.playing && !item.paused ? 'flex' : 'none'
                            }}>
                                {item.name} ({cl_conversion.timeToString(item.duration)})
                            </Text>
                            <Text style={{
                                display: !item.playing && item.paused ? 'flex' : 'none',
                                fontStyle: 'italic'
                            }}>
                                {item.name} - In pausa ({cl_conversion.timeToString(item.duration)})
                            </Text>
                            <Text style={{
                                display: !item.playing ? 'none' : 'flex',
                                fontWeight: 'bold'
                            }}>
                                {item.name} ({cl_conversion.timeToString(item.duration)})
                            </Text>
                        </View>
                    }
                    ListEmptyComponent={
                        <View>
                            <Text>
                                {this._oI18n.CurrentlyPlaying.EmptyList}
                            </Text>
                        </View>
                    }
                />
                <CurrentTrack
                    onRefreshList={this._refresh.bind(this)} />
            </View>)
    };

    componentDidMount(): void {
        this._refresh(myPlayer.getList());
        // gestisci gli eventi di myPlayer
        // myPlayer.addListener('playbackStatusUpdate', (aCurrentPlaying: currentPlayingType[]) => {
        myPlayer.addListener(playEventType.playbackStatusUpdate, (aCurrentPlaying: currentPlayingType[]) => {
            //console.log("CurrentlyPlaying - playbackStatusUpdate", aCurrentPlaying);
            this._refresh(aCurrentPlaying);
        });
    };

    // private _onPlayPress(event: GestureResponderEvent): void {
    //     this._refresh(myPlayer.play());
    // };
    // private _onPausePress(event: GestureResponderEvent): void {
    //     this._refresh(myPlayer.pause());
    // };

    // private _onNext(): void {
    //     this._refresh(myPlayer.next());
    // };

    // private _onStop(): void {
    //     this._refresh(myPlayer.stop());
    // };

    // public onPlayNewList(aCurrentPlaying: currentPlayingType[]) {
    //     this._refresh(aCurrentPlaying);
    // };

    private get _aCurrentPlaying(): currentPlayingType[] {
        return this._oCurrState.aCurrentPlaying;
    };
    private set _aCurrentPlaying(aNew: currentPlayingType[]) {
        this._oCurrState.aCurrentPlaying = aNew;
        //console.log("CurrentlyPlaying - set _aCurrentPlaying", aNew);
        this.setState(this._oCurrState);
    };

    // private get _oPlayingStatus(): playingStatus {
    //     return myPlayer.playingStatus;
    // };

    private _refresh(aNewPlayer: currentPlayingType[]) {
        this._aCurrentPlaying = aNewPlayer;
    };
}