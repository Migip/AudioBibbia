import { StyleSheet } from 'react-native';

export const GeneralStyles = StyleSheet.create({
    flexVert:{
        flexDirection: 'column'
    },
    flexHoriz:{
        flexDirection: 'row'
    },
    spaceBetween:{
        justifyContent: 'space-between'
    },
    aBitSpace:{
        justifyContent: 'space-around'
    },
    pageContainer: {
        flex: 1,
        paddingTop: 25
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    buttonBar:{
        justifyContent: 'space-between'
    }
});