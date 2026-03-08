import React from 'react';
import myReactComponent from '../../CustomComponent/myReactNativeComponent';
//import { currentPlayingType } from '../../Globals/HomepageTypes';
import { GestureResponderEvent, Text, View } from 'react-native';
import { setAudioModeAsync } from 'expo-audio';
import ActiveButton from '../../CustomComponent/activeButton';
import { myIcons } from '../../Globals/constants/Icons';
import myPlayer, { currentPlayingType, playEventType, playingStatus } from '../../Globals/classes/MyPlayer';

export declare type CurrentTrackProps = {
    onRefreshList?: (aCurrentPlaying: currentPlayingType[]) => void,
};


declare type stateType = {
    //aCurrentPlaying: currentPlayingTypeIntern[],
    oCurrentPlaying: currentPlayingType | undefined,
    // oPlayingStatus: playingStatus
};

export default class CurrentTrack extends myReactComponent<CurrentTrackProps> {
    private _oCurrState: stateType;
    public readonly state: stateType;

    public constructor(props: CurrentTrackProps) {
        super(props);
        this._oCurrState = {
            oCurrentPlaying: undefined,
        };
        setAudioModeAsync({
            playsInSilentMode: true,
            shouldPlayInBackground: true,
            interruptionMode: 'doNotMix'
        });
        // this._oRef = this.props.oRef;
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

        if (this._oCurrentPlaying) {
            sPlayingStatusText += ' ' + myPlayer.nCurrentTime + ' / ' + myPlayer.nDuration;
        }

        return (
            <View
                style={
                    {
                        flexDirection: 'column',
                        display: sPlayingStatusText !== '' ? 'flex' : 'none',
                    }
                }>
                <View>
                    <Text
                        style={{
                            display: sPlayingStatusText !== '' ? 'flex' : 'none',
                        }}>
                        {sPlayingStatusText}
                    </Text>
                    <Text
                        style={{
                            display: this._oCurrentPlaying ? 'flex' : 'none',
                        }}>
                        {this._oCurrentPlaying?.name}
                    </Text>
                </View>
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
                {/* <Text>{this._oI18n.Footer.testo}
                    <Text
                        style={{ fontWeight: 'bold' }}>
                        https://www.proclamarelaparola.it/
                    </Text>
                </Text> */}
            </View>)
    };

    componentDidMount(): void {
        this._refresh(myPlayer.getTrackInfo());
        // gestisci gli eventi di myPlayer
        myPlayer.addListener(playEventType.trackStatusUpdate, (oCurrentPlaying: currentPlayingType) => {
            //console.log("CurrentlyPlaying - playbackStatusUpdate", aCurrentPlaying);
            this._refresh(oCurrentPlaying);
        });
    };

    private _onPlayPress(event: GestureResponderEvent): void {
        let aResult = myPlayer.play();
        if (this.props.onRefreshList) {
            this.props.onRefreshList(aResult);
        }
    };
    private _onPausePress(event: GestureResponderEvent): void {
        let aResult = myPlayer.pause();
        if (this.props.onRefreshList) {
            this.props.onRefreshList(aResult);
        }
    };

    private _onNext(): void {
        let aResult = myPlayer.next();
        if (this.props.onRefreshList) {
            this.props.onRefreshList(aResult);
        }
    };

    private _onStop(): void {
        let aResult = myPlayer.stop();
        if (this.props.onRefreshList) {
            this.props.onRefreshList(aResult);
        }
    };

    // public onPlayNewList(aCurrentPlaying: currentPlayingType[]) {
    //     if (this.props.onRefreshList) {
    //         this.props.onRefreshList(aCurrentPlaying);
    //     }
    // };


    private _refresh(oNewTrack: currentPlayingType | undefined): void {
        this._oCurrentPlaying = oNewTrack;
    };

    private get _oCurrentPlaying(): currentPlayingType | undefined {
        return this._oCurrState.oCurrentPlaying;
    };
    private set _oCurrentPlaying(oNew: currentPlayingType | undefined) {
        this._oCurrState.oCurrentPlaying = oNew;
        //console.log("CurrentlyPlaying - set _aCurrentPlaying", aNew);
        this.setState(this._oCurrState);
    };

    private get _oPlayingStatus(): playingStatus {
        return myPlayer.playingStatus;
    };
}