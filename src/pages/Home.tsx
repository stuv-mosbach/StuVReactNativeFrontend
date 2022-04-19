import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import CalenderEntry from '../components/CalenderEntry';
import {style} from '../util/Style';
import {
    NetworkService,
} from '../Service/networking-service';
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function Home({navigation}: any) {
    // useEffect(() => {
    //   NetworkService.getLectures('MOS-TINF21A');
    // }, []);
    const [lectures,setLectures] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    },[]);
    NetworkService.getLectures('MOS-TINF21A');
    return (
        <ScrollView style={scrollViewStyle.scrollView}
                    refreshControl={
                        <RefreshControl refreshing={refreshing}
                                        onRefresh={onRefresh}
                        />
                    }
        >
            <Text style={style.header}>Heutige Vorlesungen</Text>
            <CalenderEntry
                name="Elektrotechnik"
                date="2022-04-04T22:00:00.000Z"
                type="PRESENCE"
                room="B 0.320 Vorlesungsraum"
                startTime="2022-04-05T07:00:00.000Z"
                endTime="2022-04-05T10:15:00.000Z"
            />
            <CalenderEntry
                name="Elektrotechnik"
                date="2022-04-04T22:00:00.000Z"
                type="PRESENCE"
                room="B 0.320 Vorlesungsraum"
                startTime="2022-04-05T07:00:00.000Z"
                endTime="2022-04-05T10:15:00.000Z"
            />
            <CalenderEntry
                name="Elektrotechnik"
                date="2022-04-04T22:00:00.000Z"
                type="PRESENCE"
                room="B 0.320 Vorlesungsraum"
                startTime="2022-04-05T07:00:00.000Z"
                endTime="2022-04-05T10:15:00.000Z"
            />
        </ScrollView>
    );
}
const scrollViewStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        marginHorizontal: 20,
    },
});
