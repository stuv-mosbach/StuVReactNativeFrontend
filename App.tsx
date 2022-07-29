import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Home from './src/pages/Home';
import Setting from './src/pages/Settings';
import { TouchableOpacity, View } from 'react-native';
// @ts-ignore
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { style, theme } from './src/util/Style';
import Lectures from "./src/pages/Lectures";
import { RootSiblingParent } from 'react-native-root-siblings';
const Tab = createBottomTabNavigator();


function TabBarCustomized({ state, descriptors, navigation }:any) {
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
  const exportToCalender = function () {
    //use linking and download the shit from max siehe Whatsapp -> danach fehlt nur noch erste seite und komponente zur Kurs auswahl und fertig
  }


  return (
      <RootSiblingParent>
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={props => <TabBarCustomized {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Lectures"
        component={Lectures}
        options = {{
          headerRight: ()=>(<TouchableOpacity
          onPress={()=>exportToCalender()}
          style={{marginRight:20}}>
            <FontAwesome name={"calendar"}
            size={24}
            color={"black"} />
          </TouchableOpacity>)
        }}
          />
        <Tab.Screen name="Settings" component={Setting} />
      </Tab.Navigator>
    </NavigationContainer>
      </RootSiblingParent>
  );
}
