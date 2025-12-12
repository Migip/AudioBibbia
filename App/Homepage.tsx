import React, { createRef, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import myReactComponent from '../CustomComponent/myReactNativeComponent';
import { StyleSheet, View } from 'react-native';
import BooksList from './MinorComponent/completeList';
import { currentPlayingType, myTreeNode } from '../Globals/HomepageTypes';
import CurrentlyPlaying from './MinorComponent/currentlyPlaying';
import { cl_id, cl_title } from '../Globals/CharUtility';
import { activateKeepAwakeAsync } from 'expo-keep-awake';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import myPlayer from '../Globals/MyPlayer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
//import Sound from 'react-native-sound';

declare type stateType = {
};

export default class Homepage extends myReactComponent {
    // private _oCurrentPlayingRef?: React.RefObject<CurrentlyPlaying | null> = createRef();
    private _oTab = createBottomTabNavigator();
    public constructor(props: any) {
        super(props);
        console.log("|---------------------- INIZIO APP ----------------------|");
        //useKeepAwake();
        //activateKeepAwakeAsync();
    };

    public render() {
        // const Tab = createBottomTabNavigator();

        return (
            //     // <SafeAreaView style={styles.container}>
            //     //     <StatusBar style="auto" />
            <NavigationContainer>
                <this._oTab.Navigator>
                    <this._oTab.Screen
                        name={this._oI18n.Tabs.scelta}
                        component={BooksList}
                        options={Homepage.tabOptions('list', 'list-outline')} />
                    <this._oTab.Screen
                        name={this._oI18n.Tabs.playing}
                        component={CurrentlyPlaying}
                        options={Homepage.tabOptions('musical-notes', 'musical-notes-outline')} />
                </this._oTab.Navigator>
            </NavigationContainer>
            //</NavigationContainer></SafeAreaView>
        );
        /*return (
            <SafeAreaView style={styles.container}>
                <StatusBar style="auto" />
                <BooksList
                    style={{ flex: 1 }}
                    onPlaySelected={this.onPlaySelected.bind(this)} />
                <CurrentlyPlaying
                    style={{ flex: 1 }}
                    oRef={this._oCurrentPlayingRef} />
            </SafeAreaView>
        );*/
    };

    static tabOptions(sInputIcon: string, sInputIconHighlights: string): () => BottomTabNavigationOptions {
        return () => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName = focused ? sInputIcon : sInputIconHighlights;
                return <Ionicons name={iconName as any} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#2f95dc',
            tabBarInactiveTintColor: 'gray',
        });
    };
    // public onPlaySelected(aCheckedIds: string[], aTreeList: myTreeNode[]): void {
    //     this._oCurrentPlayingRef?.current?.onPlayNewList(myPlayer.setNewList(aCheckedIds, aTreeList));
    // };
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