import { StyleSheet } from 'react-native';

export const GeneralStyles = StyleSheet.create({
    flexHoriz: {
        flexDirection: 'row'
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