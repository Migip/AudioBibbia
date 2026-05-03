import { StyleSheet } from 'react-native';
import { GeneralStyles } from './GeneralStyles';

export const CurrentlyPlayingStyles = StyleSheet.create({
    itemSeparator: {
        borderBottomWidth: 1,
        borderBottomColor: '#b4afaf',
        paddingVertical: 10,
    },
    emptyItem: {
        paddingVertical: 10,
    },
    titleColumn: {
        ...{
            width: '75%'
        }, ...GeneralStyles.flexLeft
    },
    statusColumn: {
        ...{
            width: '20%'
        }, ...GeneralStyles.flexCenter
    },
    durationColumn: {
        ...{
            width: '25%'
        }, ...GeneralStyles.flexCenter
    },
});