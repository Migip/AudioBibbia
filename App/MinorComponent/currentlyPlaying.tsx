import React, { createRef, useRef } from 'react';
import myReactComponent from '../../CustomComponent/myReactNativeComponent';
//import { currentPlayingType } from '../../Globals/HomepageTypes';
import { Button, FlatList, GestureResponderEvent, Pressable, StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { HomepageStyle } from '../../Styles/HomepageStyle';
import { GeneralStyles } from '../../Styles/GeneralStyles';
//import { AudioPlayer, AudioSource, AudioStatus, createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import myPlayer, { currentPlayingType, playEventType, playingStatus } from '../../Globals/classes/MyPlayer';
import CurrentTrack from './currentTrack';
import Info from '../Popup/Info';
import { cl_conversion } from '../../Globals/classes/CharUtility';
import CustomTitle from '../../CustomComponent/myTitle';
import { CurrentlyPlayingStyles } from '../../Styles/CurrentlyPlayingStyles';
import CustomText from '../../CustomComponent/myText';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { myIcons } from '../../Globals/constants/Icons';
import myViewComponent from '../../CustomComponent/myViewComponent';


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

// export default class CurrentlyPlaying extends myReactComponent<CurrentlyPlayingProps> {
export default class CurrentlyPlaying extends myViewComponent<CurrentlyPlayingProps> {
    private _oCurrState: stateType;
    public readonly state: stateType;
    _bActiveLog: boolean = false;
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
            // headerStyle: {
            //     height: 120, // aumenta questo valore
            // },
            headerRight: () => (
                <Info />
            )
        });
    };
    // public render() {
    public renderContent() {
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
                        flexDirection: 'column',
                        flex: 1
                    },
                    GeneralStyles.container
                ]}>
                <FlatList
                    data={this.state.aCurrentPlaying}
                    keyExtractor={(item) => item.id}
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
                    ListHeaderComponent={
                        <View
                            style={[
                                GeneralStyles.flexHoriz,
                                CurrentlyPlayingStyles.itemSeparator
                            ]}>
                            <View
                                style={[CurrentlyPlayingStyles.titleColumn]}>
                                <CustomTitle>
                                    {this._oI18n.CurrentlyPlaying.ListTitle}
                                </CustomTitle>
                            </View>
                            {/* <View
                                style={[CurrentlyPlayingStyles.statusColumn]}>
                                <CustomTitle>
                                    {this._oI18n.CurrentlyPlaying.State}
                                </CustomTitle>
                            </View> */}
                            <View
                                style={[CurrentlyPlayingStyles.durationColumn]}>
                                <CustomTitle>
                                    {this._oI18n.CurrentlyPlaying.Duration}
                                </CustomTitle>
                            </View>
                        </View>
                    }
                    renderItem={({ item }) =>
                        <Pressable
                            onPress={() => { this._onPressItem(item) }}>
                            <View
                                style={[
                                    GeneralStyles.flexHoriz,
                                    CurrentlyPlayingStyles.itemSeparator
                                ]}>
                                <View
                                    style={[CurrentlyPlayingStyles.titleColumn]}>
                                    {(item.playing || item.paused) && (
                                        <View style={{ paddingRight: 5 }}>
                                            <FontAwesome6
                                                name={item.playing ? myIcons.play : myIcons.pause}
                                            />
                                        </View>
                                    )}
                                    <CustomText
                                        style={
                                            CurrentlyPlaying.getLineStyle(item)
                                        }>
                                        {item.name}
                                    </CustomText>
                                </View>
                                <View
                                    style={[CurrentlyPlayingStyles.durationColumn]}>
                                    <CustomText
                                        style={
                                            CurrentlyPlaying.getLineStyle(item)
                                        }>
                                        {cl_conversion.timeToString(item.duration)}
                                    </CustomText>
                                </View>
                            </View>
                        </Pressable>
                    }
                    ListEmptyComponent={
                        <View
                            style={[
                                GeneralStyles.flexCenter,
                                CurrentlyPlayingStyles.emptyItem]}>
                            <CustomText>
                                {this._oI18n.CurrentlyPlaying.EmptyList}
                            </CustomText>
                        </View>
                    }
                />
                <CurrentTrack
                    onRefreshList={this._refresh.bind(this)} />
            </View>)
    };

    private _onPressItem(item: currentPlayingType) {
        this._openPopupToConfirm(this._oI18n.CurrentlyPlaying.PopupToConfirmTitle).then((result) => {
            this._log('User selected:', result);
            if (result) {
                myPlayer.playFrom(item.index);
            };
        });
        // myPlayer.playFrom(item.index);
        // throw new Error('Method not implemented.');
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

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error("Error in CurrentlyPlaying component:", error, errorInfo);
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

    static getLineStyle(item: currentPlayingType): StyleProp<TextStyle> {
        try {

            return {
                fontWeight: item.playing || item.paused ? 'bold' : 'normal',
                fontStyle: item.paused ? 'italic' : 'normal'
            };
        } catch (error) {
            console.error("Error in getLineStyle:", error);
            return {
                fontWeight: 'normal',
                fontStyle: 'normal'
            };
        }
    }
}