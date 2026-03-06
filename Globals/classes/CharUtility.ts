//import { Asset, useAssets } from "expo-asset";
import { AudioSource } from "expo-audio";
//import fs = require("file-system");
//import * as fs from "file-system";
//import * as FileSystem from 'expo-file-system';
import { myTreeNode } from "../HomepageTypes";
//import * as sounds from '../assets/data/';


declare type sortingOrder = {
    "id": string,
    "progr": number
}

export class cl_id {
    private static idSep: string = ',';
    private static oOnlyNumberRegex = new RegExp("[0-9]+");
    //private static idSep: string = '.';
    // private static _aSortingOrder: sortingOrder[];// = JSON.parse(require('../assets/ordine.json'));
    private static _oSortingOrder: Map<string, sortingOrder>;

    public static pad(iNum: number, iSize: number): string {
        let sReturn = iNum.toString();
        while (sReturn.length < iSize) sReturn = "0" + sReturn;
        return sReturn;
    };

    private static progrToString(iProgr: number): string {
        return this.pad(iProgr, 3);
    };

    public static getStringId(id: any): string {
        if (typeof id === "number") {
            return this.progrToString(id);
        } else {
            return id;
        };
    };

    public static isChild(id: string): boolean {
        if (id.includes(',')) {
            return true;
        } else {
            return false;
        };
    };

    public static splitIdLevels(sId: string): string[] {
        return sId.split(this.idSep);
    };

    public static concatId(id1: any, id2: any): string {
        let sId1: string = this.getStringId(id1);
        let sId2: string = this.getStringId(id2);
        if (sId1 === '') {
            return sId2;
        } else if (sId2 === '') {
            return sId1;
        } else {
            return sId1 + this.idSep + sId2;
        };
    };

    public static sort(sId1: string, sId2: string): number {
        let aSplitA = cl_id.splitIdLevels(sId1);
        let aSplitB = cl_id.splitIdLevels(sId2);

        // let oOrderA = cl_id.aSortingOrder.find((value) => {
        //     let bReturn: boolean = value.id === aSplitA[0];
        //     return bReturn;
        //     // return value.id === aSplitA[0]
        // });
        // let oOrderB = cl_id.aSortingOrder.find((value) => { return value.id === aSplitB[0] });
        let oOrderA = cl_id.oSortingOrder.get(aSplitA[0]);
        let oOrderB = cl_id.oSortingOrder.get(aSplitB[0]);
        if (oOrderA && oOrderB && oOrderA.progr !== oOrderB.progr) {
            // console.log("sort", oOrderA, oOrderB)
            return oOrderA.progr - oOrderB.progr;
        };
        // console.log("sort2", oOrderA, oOrderB, aSplitA[0], aSplitB[0]);

        if (aSplitA.length = aSplitB.length) {
            for (let i = 0; i < aSplitA.length; i++) {
                let sValueA: string = aSplitA[i];
                let sValueB: string = aSplitB[i];
                if (cl_id.oOnlyNumberRegex.test(sValueA) &&
                    cl_id.oOnlyNumberRegex.test(sValueB)) {
                    let iValueA: number = +sValueA;
                    let iValueB: number = +sValueB;
                    if (iValueA > iValueB) {
                        return 1;
                    } else if (iValueA < iValueB) {
                        return -1
                    }
                } else {
                    if (sValueA > sValueB) {
                        return 1;
                    } else if (sValueA < sValueB) {
                        return -1
                    }
                }
            }
            return 0;
        } else {
            if (sId1 > sId2) {
                return 1;
            } else {
                return -1;
            }
        };
    };

    // private static get aSortingOrder(): sortingOrder[] {
    private static get oSortingOrder(): Map<string, sortingOrder> {
        // console.log(this._aSortingOrder);
        if (this._oSortingOrder === undefined) {
            try {
                // console.log(JSON.stringify(require('../assets/ordine.json')));
                // this._aSortingOrder = require('../assets/ordine.json');
                let aSortingOrder: sortingOrder[] = require('../../assets/ordine.json');
                this._oSortingOrder = new Map(aSortingOrder.map(item => [item.id, item]));
                // console.log("aSortingOrder", this._aSortingOrder);
            } catch (error) {
                console.error(error)
            };
        };
        return this._oSortingOrder;
    };
    // private static set aSortingOrder(aNew: Map<string, sortingOrder>) {
    private static set oSortingOrder(aNew: Map<string, sortingOrder>) {

    };
}

/*export class cl_path{
    //public static readonly sDefault: string = `file:///${ fs.knownFolders.currentApp().path }/assets/data`;
    //public static readonly sDefault: string = `file:///${ FileSystem. .knownFolders.currentApp().path }/assets/data`;
    //public static readonly RNFS = require('react-native-fs');
    //public static readonly sDefault: string = `file://${RNFS.MainBundlePath}/assets/data`;
    public static readonly sDefault: string = `file://${FileSystem.bundleDirectory}data`;
    public static concat(sPath1:string,sPath2:string):string{
        if (sPath1 === '') {
            return sPath2;
        } else if (sPath2 === '') {
            return sPath1;
        } else {
            return sPath1 + '/' + sPath2
        };
    };
    public static getSource(sPath:string): AudioSource{
        //let oAudioSource1: AudioSource = require(spath1);
        let oAudioSource: AudioSource = { uri: sPath};
        return oAudioSource;
        //return require(sString);
    };
}*/

export class cl_link {
    //public static readonly sDefault: string = `file:///${ fs.knownFolders.currentApp().path }/assets/data`;
    //public static readonly sDefault: string = `file:///${ FileSystem. .knownFolders.currentApp().path }/assets/data`;
    //public static readonly RNFS = require('react-native-fs');
    //public static readonly sDefault: string = `file://${RNFS.MainBundlePath}/assets/data`;
    public static readonly sDefault: string = `https://www.proclamarelaparola.it/`;
    public static concat(sPath1: string, sPath2: string): string {
        if (sPath1 === '') {
            return sPath2;
        } else if (sPath2 === '') {
            return sPath1;
        } else {
            return sPath1 + '/' + sPath2
        };
    };
    public static getSource(oTree: myTreeNode): AudioSource {
        //let oAudioSource1: AudioSource = require(spath1);
        var oAudioSource: AudioSource;
        try {
            oAudioSource = { uri: this.sDefault + oTree.link };
        } catch (error) {
            oAudioSource = {};
            console.log("getSource", oTree);
        }
        return oAudioSource;
        //return require(sString);
    };
}

export class cl_title {
    public static concat(sTitle1: string, sTitle2: string): string {
        if (sTitle1 === '') {
            return sTitle2;
        } else if (sTitle2 === '') {
            return sTitle1;
        } else {
            if (sTitle1 === 'Salmi') {
                return sTitle2;
            } else if (sTitle2.includes('Capitolo ')) {
                return sTitle1 + ' - ' + sTitle2.substring(9);
            } else {
                return sTitle1 + ' - ' + sTitle2;
                ;
            }
        };
    };
}

export class cl_conversion {
    public static timeToString(nTime: number | undefined): string {
        if (nTime === undefined || nTime === 0) {
            return "--.--";
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
    };
}