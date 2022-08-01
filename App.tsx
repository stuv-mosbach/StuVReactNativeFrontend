import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Home from './src/pages/Home';
import Setting from './src/pages/Settings';
import {Button, TouchableOpacity, View} from 'react-native';
// @ts-ignore
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {style, theme} from './src/util/Style';
import Lectures from "./src/pages/Lectures";
import {RootSiblingParent} from 'react-native-root-siblings';
import RNCalendarEvents from 'react-native-calendar-events';
import Toast from 'react-native-root-toast';
import {endWith} from 'rxjs';
import {getData} from "./src/Service/datastore-service";

const Tab = createBottomTabNavigator();


function TabBarCustomized({state, descriptors, navigation}: any) {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            {
                //@ts-ignore
                state.routes.map((route, index) => {
                    const {options} = descriptors[route.key];
                    const label = route.name;
                    const isFocused = state.index === index;
                    let iconName = label.toLowerCase();
                    if (iconName === 'settings') {
                        iconName = 'cog';
                    }
                    if (iconName === 'lectures') {
                        iconName = 'list';
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

export default function App() {
    const exportToCalender = function () {
        RNCalendarEvents.checkPermissions().then(async (permission) => {
            if (permission != "authorized") {
                await RNCalendarEvents.requestPermissions();
                permission = await RNCalendarEvents.checkPermissions();
                if (permission != "authorized") {
                    Toast.show('Keine Berechtigung um in den Kalender zu Exportieren!');
                }
            }
            if (permission == 'authorized') {
                let endDate = new Date();
                endDate.setHours(23);
                getData('lectures').then(listOfEvents => {
                    for (var i =0;i<listOfEvents.length;++i) {

                        console.log(listOfEvents[i])
                    }
                });
                RNCalendarEvents.saveEvent('Test', {
                    startDate: (new Date()).toISOString(),
                    endDate: endDate.toISOString(),
                    calendarId: "123"

                }, {}).then(cald => {
                    console.log(cald)
                    Toast.show("Kalender wurde hinzugefügt")
                }).catch((err) => {
                    console.log(err)
                });
            }
        });
    }


    return (
        <RootSiblingParent>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName="Home"
                    tabBar={props => <TabBarCustomized {...props} />}>
                    <Tab.Screen name="Home" component={Home}/>
                    <Tab.Screen name="Lectures"
                                component={Lectures}
                                options={{
                                    headerRight: () => (<TouchableOpacity
                                        onPress={() => exportToCalender()}
                                        style={{marginRight: 20}}>
                                        <FontAwesome name={"calendar"}
                                                     size={24}
                                                     color={"black"}/>
                                    </TouchableOpacity>)
                                }}
                    />
                    <Tab.Screen name="Settings" component={Setting}/>
                </Tab.Navigator>
            </NavigationContainer>
        </RootSiblingParent>
    );
}
