import {RefreshControl, ScrollView, Text, View} from 'react-native';
import CalenderEntry from '../components/CalenderEntry';
import React, {useCallback, useEffect, useState} from 'react';
import {Lecture, NetworkService} from '../Service/networking-service';
import {getData} from '../Service/datastore-service';
import {useScrollToTop} from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import NetInfo from '@react-native-community/netinfo';
import {style} from '../util/Style';

export interface LectureGrouped {
    date: Date;
    lectures: Lecture[];
}

export default function Lectures() {
    const ref = React.useRef(null); //used to scroll to top on tapping the same icon
    useScrollToTop(ref);
    const groupList = function (lecture: Lecture[]): LectureGrouped[] {
        let groupedLectures: LectureGrouped[] = []; //starts with the grouped list
        lecture.forEach(lect => {
            //for each group adds to lecture grouoped
            if (lect.endTime.getTime() > (new Date()).getTime()) { //filter out every element that is older than the current time --> so no old is shown and only the current date
                if (groupedLectures.length == 0) {
                    //if it is the first the first item is pusehd to avoid undefined errors
                    groupedLectures.push({
                        date: lect.date,
                        lectures: [lect],
                    } as LectureGrouped);
                } else {
                    //every other time it looks whether last one pushed has the same date if yes it addds the current lecture
                    if (
                        lect.date.getTime() ==
                        groupedLectures[groupedLectures.length - 1].date.getTime()
                    ) {
                        groupedLectures[groupedLectures.length - 1].lectures.push(lect);
                    } else {
                        //else it starts a new group
                        groupedLectures.push({
                            date: lect.date,
                            lectures: [lect],
                        } as LectureGrouped);
                    }
                }
            }
        });
        return groupedLectures;
    };
    /**
     * this function formats the date so there gets back a clear date and a clear day so everyone knows which day it is
     * */
    const formatDate = function (date: Date): string {
        let dateString: string = '';
        if (date.getDate() < 10) {
            dateString = '0' + date.getDate() + '. ';
        } else {
            dateString = date.getDate() + '. ';
        }
        const month = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez',];
        const day = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag',];
        dateString += month[date.getMonth()];
        dateString += ' ' + date.getFullYear() + ' - ';
        dateString += day[date.getDay() - 1];
        return dateString;
    };

    //states for refresh button and lectures
    const [lectures, setLectures] = useState([] as LectureGrouped[]);
    const [refreshing, setRefresh] = useState(false);

    useEffect(() => {
        getData('lectures').then(lectureList => {
            if (lectureList) {
                const lect: Lecture[] = lectureList.map((lecture: Lecture) => {
                    const lec: Lecture = {
                        ...lecture,
                        date: new Date(lecture.date),
                        startTime: new Date(lecture.startTime),
                        endTime: new Date(lecture.endTime),
                    };
                    return lec;
                });
                setLectures(groupList(lect));
            }
        });
    }, []);
    //on refresh it gets the course
    // if it is not connected to the internet it gets an update that it is not connected and it returns it to the user
    const refresh = useCallback(() => {
        setRefresh(true);
        NetInfo.fetch().then(netstate => {
            if (netstate.isConnected) {
                NetworkService.getLectures('MOS-TINF20B').then(
                    (lecture: Lecture[] | null) => {
                        if (lecture) {
                            setLectures(groupList(lecture));
                            setRefresh(false);
                        }
                    },
                );
            } else {
                let toast = Toast.show('Sie sind nicht zum Internet verbunden');
                setRefresh(false);
            }
        });
    }, []);

    return (
        <ScrollView
            style={style.scrollViewStyle}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refresh}/>
            }
            ref={ref}>
            {lectures.map((lectureGrouped, indexRough) => {
                return (
                    <View>
                        <Text style={style.lectureGroupedText}>
                            {formatDate(lectureGrouped.date)}
                        </Text>
                        <View style={style.divider}/>
                        {lectureGrouped.lectures.map((lect, index) => {
                            return <CalenderEntry {...lect} key={indexRough.toString() + "|" + index.toString()}/>;
                        })}
                    </View>
                );
            })}
        </ScrollView>
    );
}
