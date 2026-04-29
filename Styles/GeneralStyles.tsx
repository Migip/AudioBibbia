import { StyleSheet } from 'react-native';

export const GeneralStyles = StyleSheet.create({
    flexHoriz: {
        flexDirection: 'row'
    },
    flexCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    flexLeft: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 10
    },
    selectedButton: {
        backgroundColor: 'blue'
    },
    selectedButtonText: {
        color: 'white'
    },
    unselectedButton: {
        backgroundColor: 'white'
    },
    unselectedButtonText: {
        color: 'blue'
    },
    container: {
        flex: 1,
        margin: 10,
        rowGap: 10
    }
});