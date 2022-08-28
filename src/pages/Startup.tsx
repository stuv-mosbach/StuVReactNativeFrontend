import React from 'react';
import {Button, ScrollView, Text, View} from 'react-native';
import {style, theme} from "../util/Style";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Paper} from "../components/paper";

const Stack = createNativeStackNavigator()

export default function Startup() {
  return (
      <Stack.Navigator
          initialRouteName="firstScreen"
          screenOptions={{
            presentation: 'card',
          }}
      >
        <Stack.Screen name={"Haftungsausschluss"} component={Paper}/>
      </Stack.Navigator>
   )
}
