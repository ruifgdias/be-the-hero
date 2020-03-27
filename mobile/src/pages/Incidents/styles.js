import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'


export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 25
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 15,
        color: '#737380',
        marginRight: 30
    },
    headerTextBold: {
        fontWeight: 'bold'
    },
    title: {
        fontSize: 30,
        marginBottom: 16,
        marginTop: 48,
        color: '#13131a',
        fontWeight: 'bold'
    },
    description: {
        fontSize: 17,
        lineHeight: 24,
        color: '#737380'
    },
    incidentList: {
        marginTop: 16
    },
    incident: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16
    },
    incidentProperty : {
        fontSize: 14,
        color: '#41414d',
        fontWeight:'bold' 
    },
    incidentValue : {
        marginTop:0,
        fontSize : 15,
        color: '#737380'
    }, 
    detailsButton : {
        marginTop: 10,
        flexDirection : 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});