import React from 'react';
import {Button, ScrollView, Text, View} from 'react-native';
import {style, theme} from "../util/Style";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Paper} from "../components/paper";
import {CourseSelecter} from "../components/selectCourse";

const Stack = createNativeStackNavigator()

export default function Startup() {
  return (
      <Stack.Navigator
          initialRouteName="firstScreen"
          screenOptions={{
            presentation: 'card',
            headerShown:false
          }}
      >
        <Stack.Screen name={"firstScreen"} component={Paper}/>
        <Stack.Screen name={"courseSelect"} component={CourseSelecter}/>
      </Stack.Navigator>
   )
}
