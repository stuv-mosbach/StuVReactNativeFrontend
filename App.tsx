import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Home from './src/pages/Home';
import Setting from './src/pages/Settings';
import {TouchableOpacity, View} from 'react-native';
// @ts-ignore
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {style, theme} from './src/util/Style';
import Lectures from "./src/pages/Lectures";
import {RootSiblingParent} from 'react-native-root-siblings';

import {getData} from "./src/Service/datastore-service";
import Startup from "./src/pages/Startup";
import SplashScreen from "react-native-splash-screen";

const Tab = createBottomTabNavigator();


function TabBarCustomized({state, descriptors, navigation}: any) {

    return (
        <View style={style.navigationbar}>
            {
                //@ts-ignore
                state.routes.map((route, index) => {
                    const {options} = descriptors[route.key];
                    const label = route.name;
                    const isFocused = state.index === index;
                    let iconName = label.toLowerCase();
                    switch (iconName) {
                        case 'einstellungen':
                            iconName = 'cog';
                            break;
                        case 'vorlesungen':
                            iconName = 'list';
                            break;
                        case 'startseite':
                            iconName = 'home';
                            break;
                    }

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate({name: route.name, merge: true});
                        }
                    };

                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? {selected: true} : {}}
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

export const StartupContext = React.createContext({startup:true,setStartup: ()=>{},})

export default function App() {
    const [startup,setStartup] = React.useState(true)
    React.useEffect(() => {
        getData("coursesSelected").then((selCourses) => {
            if (selCourses && selCourses.length > 0) {
                setStartup(false)
            }
            SplashScreen.hide()
        });
    },[]);

    return (
        <RootSiblingParent>
            <StartupContext.Provider value={{startup,setStartup}}>
                <NavigationContainer>
                    {startup ? <Startup/> :
                        <Tab.Navigator
                            initialRouteName="Home"
                            tabBar={props => <TabBarCustomized {...props} />}>
                            <Tab.Screen name="Startseite" component={Home}/>
                            <Tab.Screen name="Vorlesungen" component={Lectures}/>
                            <Tab.Screen name="Einstellungen" component={Setting}/>
                        </Tab.Navigator>}
                </NavigationContainer>
            </StartupContext.Provider>
        </RootSiblingParent>
    );
}
