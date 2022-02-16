import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Home from './src/pages/Home';
import Startup from './src/pages/Startup';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"> sdds
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Startup" component={Startup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
