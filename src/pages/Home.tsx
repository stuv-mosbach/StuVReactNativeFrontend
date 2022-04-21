import React, {useEffect, useState, useCallback} from 'react';
import {RefreshControl, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import CalenderEntry from '../components/CalenderEntry';
import {style} from '../util/Style';
import {
    Lecture,
    NetworkService,
} from '../Service/networking-service';

export default function Home({navigation}: any) {
    const filterList = function (toFilterList: Lecture[]) {
        let filterTime = new Date()
        const today = toFilterList.filter((item) => {
            if (item.endTime.getTime()<filterTime.getTime()) {
                return item.endTime.getHours() >= filterTime.getHours();
            }
            return false;
        })
        if (today.length==0) {
            let tomorrow = new Date();
            tomorrow.setHours(0,0,0,0);
            tomorrow.setDate(filterTime.getDate()+2);
            return toFilterList.filter((item)=>{
                return item.date.getTime()>filterTime.getTime()&&item.date.getTime()<=tomorrow.getTime();
            });
        } else {
            return today;
        }

    };
    const [lectures, setLectures] = useState([] as Lecture[]); /// State for lectures
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        NetworkService.getLectures('MOS-TINF21A').then((lecture: Lecture[] | null) => {
            if (lecture) {
                console.log(filterList(lecture));
                console.log(filterList(lecture).length);
                setRefreshing(false);
            }
        })
    }, []);

    useEffect(() => {
    })

    return (
        <ScrollView style={scrollViewStyle.scrollView}
                    refreshControl={
                        <RefreshControl refreshing={refreshing}
                                        onRefresh={onRefresh}
                        />
                    }
        >
            <Text style={style.header}>Heutige Vorlesungen</Text>
            {lectures.map(lecture => {
                return (<CalenderEntry name={lecture.name}
                                       rooms={lecture.rooms}
                                       date={lecture.date}
                                       type={lecture.type}
                                       startTime={lecture.startTime}
                                       endTime={lecture.endTime}
                                       course={lecture.course}
                                       id={lecture.id}/>);
            })}

        </ScrollView>
    );
}
export const scrollViewStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        marginHorizontal: 20,
    },
});
