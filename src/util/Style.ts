import { StyleSheet } from 'react-native';

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
});
