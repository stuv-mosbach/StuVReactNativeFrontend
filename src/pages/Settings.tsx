import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingsOverview from '../components/SettingsOverview';
import DevList from '../components/DevList';

const Stack = createNativeStackNavigator();

export default function Settings({navigation}: any) {
    return (
        <Stack.Navigator
            initialRouteName="Overview"
            screenOptions={{
                presentation: 'card',
            }}>
            <Stack.Screen
                component={SettingsOverview}
                name={'Overview'}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={'Devs'}
                component={DevList}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}
