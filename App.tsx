import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Home from './src/pages/Home';
import Setting from './src/pages/Settings';
import { TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { style, theme } from './src/util/Style';
import Lectures from "./src/pages/Lectures";

const Tab = createBottomTabNavigator();

//@ts-ignore
//this function customizes the icons for the tab navigation
function TabBarCustomized({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      {
        //@ts-ignore
        state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = route.name;
          const isFocused = state.index === index;
          let iconName = label.toLowerCase();
          if (iconName === 'settings') {
            iconName = 'cog';
          }
          if (iconName ==='lectures') {
              iconName = 'list';
          }
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
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              key={index}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={style.navigationbar}>
              <FontAwesome
                name={iconName}
                size={32}
                color={isFocused ? theme.primary : theme.textSecondary}
              />
            </TouchableOpacity>
          );
        })
      }
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={props => <TabBarCustomized {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Lectures" component={Lectures} />
        <Tab.Screen name="Settings" component={Setting} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
