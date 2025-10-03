import { StyleSheet } from 'react-native';

export const HomepageStyle = StyleSheet.create({
    lineContainer: {
        flex: 1,
        paddingTop: 22,
        verticalAlign: 'middle',
        alignItems: 'center'
    },
    item: {
        padding: 10,
        height: 50,
    },
    itemNumber:{
        flex: 3
    },
    itemNumberF:{
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'right',
        paddingRight: 20
    },
    itemNotNumber:{
        flex: 20
    },
    itemTitleF:{
        flexWrap: 'nowrap',
    },
    itemAuthorF:{
        fontStyle: 'italic'
    }
});