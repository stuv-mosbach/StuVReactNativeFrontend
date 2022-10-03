import {StatusBar, StyleSheet} from 'react-native';

export const theme = {
    text: '#000',
    textSecondary: '#5e6b73',
    background: '#fff',
    backgroundSecondary: '#fcfcfc',
    backgroundTertiary: '#2b2b2b',
    primary: '#e2001a',
    borderColor: '#e5e5e5',
    borderRadius: 7,
    padding: 8.5,
    margin: 15,
};

export const style = StyleSheet.create({
    header: {
        fontSize: 18,
        marginTop: theme.margin / 3,
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginLeft: theme.margin,
        marginRight: theme.margin,
    },
    navigationbar: {
        paddingBottom: theme.padding,
        paddingTop: theme.padding,
        justifyContent: 'space-around',
        flexDirection: "row",
    },
    calendarEntry: {
        backgroundColor: theme.backgroundSecondary,
        color: theme.text,
        borderRadius: theme.borderRadius,
        borderColor: theme.borderColor,
        borderWidth: 1,
        marginTop: theme.margin / 2,
        marginBottom: theme.margin / 2,
        padding: theme.padding,
    },
    scrollViewStyle: {
        flex: 1,
        marginLeft: 10,
        paddingRight: 10,
    },
    lectureGroupedText: {
        paddingTop: 7,
        paddingBottom: 0,
    },
    divider: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        paddingTop: 5,
        width: '100%',
    },
    settingsView: {
        padding: 10,
    },
    settingsHeader: {
        color: theme.text,
        marginLeft: 10,
        fontWeight: 'bold',
    },
    settingsField: {
        minheight: 40,
        backgroundColor: theme.background,
        borderRadius: theme.borderRadius,
        borderColor: theme.borderColor,
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    settingsFieldEntryLeft: {
        margin: 10,
        display: 'flex',
        color: theme.text,
        fontWeight: 'bold',
    },
    settingsIcon: {
        fontSize: 20,
        color: theme.text,
        margin: 7,
        marginRight: 15,
    },
    h1: {
        fontSize: 30,
        color: theme.text,
        marginTop: 10,
    },
    h2: {
        fontSize: 25,
        color: theme.textSecondary,
    },
    h3: {
        fontSize: 20,
        color: theme.text,
        marginTop: 10,
    },
    devAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 10,
    },
    devDescriptionBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 15,
        marginRight: 40,
        width: "50%",
    },
    devMainText: {
        color: theme.text,
        fontSize: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    devSecondText: {
        color: theme.textSecondary,
        fontSize: 14,
    },
    text: {
        color: theme.text,
        fontSize:12,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    textSecondary: {
        color: theme.textSecondary,
        fontSize:12,
    },
    button: {
        marginTop:20,
        display: 'flex',
        justifyContent: 'center',
        marginLeft: theme.margin,
        marginRight: theme.margin,
    },
    innerScrollView: {
        height: "50%",
        backgroundColor:theme.background,
        borderRadius:theme.borderRadius,
        marginTop: 20,
    },
    innerContentContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding:10
    },
    courseSelectCheckboxContainer : {
        height:40
    },
    courseSelectText:{
        marginTop:7
    },
    courseSelectContent: {
        justifyContent:"space-between",
        flexDirection:"row"

    },
    boldText:{
        fontWeight: "bold",
        color:theme.text
    },
    inputSelectCourse: {
        backgroundColor:theme.background,
        width: "100%",
        borderRadius:theme.borderRadius,
        zIndex:0,
        paddingLeft: "7%",
        paddingRight:"13%",
        color:theme.text
    },
    searchButton: {
        zIndex:1,
        marginTop:15,
        left: "-70%",
    },
    spaceRow: {
        justifyContent:"space-between",
        flexDirection:"row"
    },
    checkbox: {
        color:theme.text
    }



});
