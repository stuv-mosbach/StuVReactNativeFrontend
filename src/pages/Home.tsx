import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import CalenderEntry from '../components/CalenderEntry';
import {style} from '../util/Style';
import {
    Lecture,
    NetworkService,
} from '../Service/networking-service';
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function Home({navigation}: any) {
    // useEffect(() => {
    //   NetworkService.getLectures('MOS-TINF21A');
    // }, []);
    const [lectures,setLectures] = useState([] as Lecture[]);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        NetworkService.getLectures('MOS-TINF21A').then((lecture:Lecture[]|null)=>{
            if (lecture) {
                setLectures(lecture);
                console.log(lectures)

            }
        })
        setRefreshing(false);
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
            {lectures.map(lecture =><CalenderEntry name={lecture.name}
                                                   rooms={lecture.rooms}
                                                   date={lecture.date}
                                                   type={lecture.type}
                                                   startTime={lecture.startTime}
                                                   endTime={lecture.endTime}
                                                   course={lecture.course}
                                                   id={lecture.id}/>)}

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
