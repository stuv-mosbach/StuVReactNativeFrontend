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
        justifyContent: 'center',
        alignItems: 'center',
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
        paddingBottom: 0
    },
    divider: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        paddingTop: 5,
        width: "100%",
    },
    settingsView: {
        padding: 10
    },
    settingsHeader: {
        color: theme.text,
        marginLeft: 10,
        fontWeight: "bold"
    },
    settingsField: {
        height: 40,
        backgroundColor: theme.background,
        borderRadius: theme.borderRadius,
        borderColor: theme.borderColor,
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    settingsFieldEntryLeft: {
        margin: 10,
        display: "flex",
        color: theme.text,
        fontWeight: "bold"
    },
    settingsIcon: {
        fontSize: 20,
        color: "black",
        margin:7,
        marginRight:15,
    }
});
