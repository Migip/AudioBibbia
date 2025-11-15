import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import myPlayer from './MyPlayer';

export type scheduleNotificationType = {
    title: string,
    subtitle: string,
    body: string,
    catId: notifCategory
};

enum notifActions {
    PLAY = 'PLAY',
    PAUSE = 'PAUSE'
};

export enum notifCategory {
    PLAY = 'P1',
    PAUSE = 'P2',
    PLAY_PAUSE = 'PP'
}

class myNotificationInstance {
    private _oNotifResponse?: Notifications.EventSubscription;
    private _oNotifId?: string;

    constructor() {
        try {
            this._requestPermissions();
            this._setHandler();
            this._setCategories();
        } catch (error) {
            console.error(error);
        };
    };


    public async _scheduleNotificationsAsync(oOptions: scheduleNotificationType) {

        let oRequest: Notifications.NotificationRequestInput = {
            content: {
                title: oOptions.title,
                subtitle: oOptions.subtitle,
                body: oOptions.body,
                categoryIdentifier: oOptions.catId
            },
            identifier: this._oNotifId,
            trigger: null
        };

        Notifications.scheduleNotificationAsync(oRequest)
            .then((value) => {
                // console.log(this._oNotifId);
                this._oNotifId = value;
            })
            .catch((error) => { console.error(error) });
        if (!this._oNotifId) {
            this._oNotifId = '$';
        };
    };

    public dismissAllNotificationsAsync() {
        Notifications.dismissAllNotificationsAsync()
            .catch((error) => { console.error(error) });
    }

    private _requestPermissions() {
        Notifications.requestPermissionsAsync();
    };

    private _setHandler() {
        let fNotifHandler: Notifications.NotificationHandler = {
            handleNotification: async () => (
                {
                    shouldPlaySound: false,
                    shouldSetBadge: false,
                    shouldShowBanner: true,
                    shouldShowList: true,
                }
            )
        };
        Notifications.setNotificationHandler(fNotifHandler);
        this._registerForPushNotificationsAsync().then(token => token && console.log("token", token));

        this._oNotifResponse = Notifications.addNotificationResponseReceivedListener((event: Notifications.NotificationResponse) => {
            console.log("addNotificationResponseReceivedListener", event);
            switch (event.actionIdentifier) {
                case notifActions.PAUSE:
                    myPlayer.pause();
                    break;
                case notifActions.PLAY:
                    myPlayer.play();
                default:
                    break;
            }
        });
    };

    private _setCategories() {
        let oPlay: Notifications.NotificationAction =
        {
            buttonTitle: 'Play',
            identifier: notifActions.PLAY,
            options: {
                isAuthenticationRequired: false,
                opensAppToForeground: false
            }
        };
        let oPause: Notifications.NotificationAction =
        {
            buttonTitle: 'Pausa',
            identifier: notifActions.PAUSE,
            options: {
                isAuthenticationRequired: false,
                opensAppToForeground: false,
            }
        };

        let oOptions: Notifications.NotificationCategoryOptions = {
            allowInCarPlay: true,
        };
        Notifications.setNotificationCategoryAsync(notifCategory.PLAY, [oPlay], oOptions)
            .then((oCat: Notifications.NotificationCategory) => {
                // console.log("setNotificationCategoryAsync", oCat);
            })
            .catch((error) => { console.log(error) });
        Notifications.setNotificationCategoryAsync(notifCategory.PAUSE, [oPause], oOptions)
            .then((oCat: Notifications.NotificationCategory) => {
                // console.log("setNotificationCategoryAsync", oCat);
            })
            .catch((error) => { console.log(error) });
        Notifications.setNotificationCategoryAsync(notifCategory.PLAY_PAUSE, [oPlay, oPause], oOptions)
            .then((oCat: Notifications.NotificationCategory) => {
                // console.log("setNotificationCategoryAsync", oCat);
            })
            .catch((error) => { console.log(error) });
    };

    private async _registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('myNotificationChannel', {
                name: 'A channel is needed for the permissions prompt to appear',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
                lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC
            });
        }

        try {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            // Learn more about projectId:
            // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
            // EAS projectId is used here.
            try {
                const projectId =
                    Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
                if (!projectId) {
                    throw new Error('Project ID not found');
                }
                token = (
                    await Notifications.getExpoPushTokenAsync({
                        projectId,
                    })
                ).data;
                console.log(token);
            } catch (e) {
                token = `${e}`;
            }

            return token;
        } catch (error) {
            console.error('Must use physical device for Push Notifications', error);
        };
    };
};

export default class myNotification {
    private static _oInstance: myNotificationInstance = new myNotificationInstance();

    // public static init() {
    //     if (!this._oInstance) {
    //         this._oInstance = new myNotificationInstance();
    //     };
    // };

    public static async scheduleNotificationAsync(oOptions: scheduleNotificationType) {
        await this._oInstance._scheduleNotificationsAsync(oOptions);
    };

    public static dismissAllNotificationsAsync() {
        this._oInstance.dismissAllNotificationsAsync();
    };
};