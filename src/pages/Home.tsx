import React, {useEffect, useState, useCallback} from 'react';
import {RefreshControl, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import CalenderEntry from '../components/CalenderEntry';
import {style} from '../util/Style';
import {
    Lecture,
    NetworkService,
} from '../Service/networking-service';
import {filter} from "rxjs";

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
            let tomorrowDate = new Date();
            tomorrowDate.setHours(0,0,0,0);
            tomorrowDate.setDate(filterTime.getDate()+2);
            let tomorrow:Lecture[] = toFilterList.filter((item)=>{
                return item.startTime.getTime()>filterTime.getTime()&&item.endTime.getTime()<tomorrowDate.getTime();
            });
            if (tomorrow.length==0 &&filterTime.getDay()==5) {
                tomorrowDate.setDate(tomorrowDate.getDate()+2);
                tomorrow= toFilterList.filter((item)=> {
                    return item.startTime.getTime()>filterTime.getTime()&&item.endTime.getTime()<tomorrowDate.getTime();
                })
                console.log(tomorrow);
                return tomorrow;
            } else {
                return tomorrow;
            }
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
                setLectures(filterList(lecture))
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
            {
                lectures.length==0?<Text>Keine Vorlesungen in nächster Zeit</Text>:<></>
            }
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
