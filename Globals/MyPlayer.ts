import * as Audio from "expo-audio";
import { myTreeNode } from "./HomepageTypes";
import { cl_id, cl_link, cl_title } from "./CharUtility";
import { NativeEventEmitter } from "react-native";
import myNotification, { notifCategory, scheduleNotificationType } from "./MyNotifications";
import i18n_class from "./i18n/i18n.general";

export enum playingStatus {
    none,
    playing,
    paused,
    stop
};

export declare type currentPlayingType = {
    name: string,
    playing: boolean
};

declare type currentPlayingTypeIntern = {
    id: string,
    name: string
    oAudio: Audio.AudioPlayer
};

class myPlayerInstance {
    private _iPlayingIndex: number = -1;
    private _aCurrentPlaying: currentPlayingTypeIntern[] = [];
    private _aAlreadyFinished: number[] = [];
    private _oEvent: NativeEventEmitter = new NativeEventEmitter();

    constructor() {
        Audio.setAudioModeAsync({
            shouldPlayInBackground: true
        });

    };

    public setNewList(aNew: currentPlayingTypeIntern[]): currentPlayingType[] {
        this.onStop();
        this._aAlreadyFinished = [];
        this._iPlayingIndex = -1;

        this._aCurrentPlaying = aNew;
        return this.onNext();
    };


    public getList(): currentPlayingType[] {
        return this._aCurrentPlayingOut;
    };

    private get _oCurrentPlaying(): currentPlayingTypeIntern | undefined {
        return this._aCurrentPlaying[this._iPlayingIndex];
    };

    public onPlay(): currentPlayingType[] {
        if (this._oCurrentPlaying?.oAudio.currentStatus.playing === false) {
            this._oCurrentPlaying?.oAudio.play();
        } else if (this._oCurrentPlaying?.oAudio.currentStatus.playbackState === 'ended' && this._aCurrentPlaying.length > 0) {
            return this.onNext();
        };
        return this._aCurrentPlayingOut;
    };

    public onPause(): currentPlayingType[] {
        if (this._oCurrentPlaying?.oAudio.currentStatus.playing === true) {
            this._oCurrentPlaying?.oAudio.pause();
        };
        return this._aCurrentPlayingOut;
    };

    public onNext(): currentPlayingType[] {
        try {
            if (this._iPlayingIndex !== -1) {
                //let oCurrent = this._oCurrentPlaying;
                //if (this._oCurrentPlaying?.oAudio?.playing === true) {
                if (this.bPlaying === true) {
                    this._oCurrentPlaying?.oAudio.pause();
                };
            }
        } catch (error) {
            console.log("onNext:", error)
        };

        if (this._iPlayingIndex < this._aCurrentPlaying.length - 1) {
            this._iPlayingIndex++;
            this._oCurrentPlaying?.oAudio.addListener(
                'playbackStatusUpdate',
                this._onAudioStatusUpdate.bind(this));
            this._oCurrentPlaying?.oAudio.play();

            return this._aCurrentPlayingOut;
        } else {
            return this.onStop();
        };
    };

    public onStop(): currentPlayingType[] {
        this._oCurrentPlaying?.oAudio.pause();
        this._iPlayingIndex = -1;
        this._aAlreadyFinished = [];
        myNotification.dismissAllNotificationsAsync();
        return this._aCurrentPlayingOut;
    };

    public get playingStatus(): playingStatus {
        if (this._aCurrentPlaying.length === 0) {
            return playingStatus.none;
        } else if (this._iPlayingIndex === -1) {
            return playingStatus.stop;
        } else if (this._oCurrentPlaying?.oAudio.currentStatus.playing === true) {
            return playingStatus.playing;
        } else {
            return playingStatus.paused;
        };
    };

    private _onAudioStatusUpdate(status: Audio.AudioStatus): void {
        //console.log(status);
        this._newNotification();
        if (status.didJustFinish === true && this._aAlreadyFinished.find((id) => { return id === status.id }) === undefined) {
            this._aAlreadyFinished.push(status.id);
            this.onNext();
        };
        this._oEvent.emit('playbackStatusUpdate', this._aCurrentPlayingOut);
    };

    private get _aCurrentPlayingOut(): currentPlayingType[] {
        let aReturn: currentPlayingType[] = [];
        this._aCurrentPlaying.forEach((oValue) => {
            let oReturn: currentPlayingType = {
                name: oValue.name,
                playing: oValue.oAudio.playing
            };
            aReturn.push(oReturn);
        });
        return aReturn;
    };

    private _newNotification() {
        let oOptions: scheduleNotificationType = {
            title: this._oCurrentPlaying ? this._oCurrentPlaying.name : "",
            subtitle: `${this.nCurrentTime}/${this.nDuration}`,
            body: this.bPlaying ? i18n_class.getI18n().notif.playing : i18n_class.getI18n().notif.paused,
            catId: this.bPlaying ? notifCategory.PAUSE : notifCategory.PLAY
        }
        //console.log(oOptions);
        myNotification.scheduleNotificationAsync(oOptions);
    };

    public get nCurrentTime(): string {
        // let nReturn: number = this._oCurrentPlaying?.oAudio.currentStatus.currentTime || 0;
        // return nReturn.toFixed(2);;
        return myPlayerInstance._timeToString(this._oCurrentPlaying?.oAudio.currentStatus.currentTime);
    };

    public get nDuration(): string {
        // let nReturn: number = this._oCurrentPlaying?.oAudio.currentStatus.duration || 0;
        // return nReturn.toFixed(2);
        return myPlayerInstance._timeToString(this._oCurrentPlaying?.oAudio.currentStatus.duration);
    };

    public get bPlaying(): boolean {
        return this._oCurrentPlaying?.oAudio.currentStatus.playing || false;
    };

    public addListener(eventType: string, listener: (event: any) => void) {
        return this._oEvent.addListener(eventType, listener);
    };

    private static _timeToString(nTime: number | undefined): string {
        if (nTime === undefined) {
            return "";
        };
        let nHours: number = Math.floor(nTime / 3600);
        let nMinutes: number = Math.floor((nTime % 3600) / 60);
        let nSeconds: number = Math.floor(nTime % 60);
        let sReturn: string = "";
        if (nHours > 0) {
            sReturn += nHours.toString().padStart(2, '0') + ":";
        };
        sReturn += nMinutes.toString().padStart(2, '0') + ":";
        sReturn += nSeconds.toString().padStart(2, '0');
        return sReturn;
    }
};


export default class myPlayer {
    private static _oInstance: myPlayerInstance = new myPlayerInstance();
    //private static _oEvent: NativeEventEmitter = new NativeEventEmitter();

    // public static init() {
    //     this._oInstance = new myPlayerInstance();
    //     this._oEvent = new NativeEventEmitter();
    // };

    public static addListener(eventType: string, listener: (event: any) => void) {
        return this._oInstance.addListener(eventType, listener);
    }

    public static setNewList(aCheckedIds: string[], aTreeList: myTreeNode[]): currentPlayingType[] {
        let aCurrentPlaying: currentPlayingTypeIntern[] = [];
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
                                oAudio: Audio.createAudioPlayer(cl_link.getSource(oCurrentNode))
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
        return this._oInstance.setNewList(aCurrentPlaying);
    };


    public static getList(): currentPlayingType[] {
        return this._oInstance.getList();
    }

    public static play(): currentPlayingType[] {
        return this._oInstance.onPlay();
    };

    public static pause(): currentPlayingType[] {
        return this._oInstance.onPause();
    };

    public static stop(): currentPlayingType[] {
        return this._oInstance.onStop();
    };

    public static next(): currentPlayingType[] {
        return this._oInstance.onNext();
    };

    public static get playingStatus(): playingStatus {
        return this._oInstance.playingStatus;
    };
};