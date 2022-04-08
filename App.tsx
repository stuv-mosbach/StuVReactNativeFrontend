import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Home from './src/pages/Home';
import Setting from './src/pages/Settings';
import {Text, TouchableOpacity, View} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();




function TabBarCustomized({state,descriptors,navigation}) {
    return (
        <View style={{ flexDirection: 'row',justifyContent:"space-around"}}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = route.name
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        style={{ justifyContent:"center"}}
                    >
                        <FontAwesome name={"rocket"}/>
                        <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" tabBar={(props)=><TabBarCustomized {...props}/>}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={Setting} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

