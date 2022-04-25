import {RefreshControl, ScrollView, Text, View} from "react-native";
import CalenderEntry from "../components/CalenderEntry";
import React, {useCallback, useEffect, useState} from "react";
import {Lecture, NetworkService} from "../Service/networking-service";
import {scrollViewStyle} from "./Home";
import {getData} from "../Service/datastore-service";

export interface LectureGrouped {
    date: Date,
    lectures: Lecture[]
}

export default function Lectures() {
    const groupList = function (lecture: Lecture[]): LectureGrouped[] {
        let groupedLectures: LectureGrouped[] = []
        groupedLectures.push({date: lecture[0].date, lectures: [lecture[0]]} as LectureGrouped)
        lecture.forEach((lect) => {
            if (lect.date.getTime() == groupedLectures[groupedLectures.length - 1].date.getTime()) {
                groupedLectures[groupedLectures.length - 1].lectures.push(lect)
            } else {
                groupedLectures.push({date: lecture[0].date, lectures: [lect]} as LectureGrouped)
            }
        })
        console.log(groupedLectures)
        return groupedLectures
    }
    const [lectures, setLectures] = useState([] as LectureGrouped[]);
    const [refreshing, setRefresh] = useState(false);
    useEffect(() => {
        getData('lectures').then((lectureList) => {
            if (lectureList) {
                const lect: Lecture[] = lectureList.map((lecture: Lecture) => {
                    const lec: Lecture = {
                        id: lecture["id"],
                        date: new Date(lecture["date"]),
                        startTime: new Date(lecture["startTime"]),
                        endTime: new Date(lecture["endTime"]),
                        name: lecture["name"],
                        type: lecture["type"],
                        rooms: lecture["rooms"],
                        course: lecture["course"]
                    }
                    return lec;
                });
                setLectures(groupList(lect));

            }

        })
    }, [])
    const refresh = useCallback(() => {
        setRefresh(true);
        NetworkService.getLectures('MOS-TINF21A').then((lecture: Lecture[] | null) => {
            if (lecture) {
                setLectures(groupList(lecture));
                setRefresh(false);
            }
        })
    }, []);
    return (
        <ScrollView style={scrollViewStyle.scrollView}
                    refreshControl={<RefreshControl refreshing={refreshing}
                                                    onRefresh={refresh}
                    />}
        >
            {lectures.map((lectureGrouped) => {
                return (
                    <View>
                        <Text>{lectureGrouped.date.getDay() + "." + lectureGrouped.date.getMonth() + "." + lectureGrouped.date.getFullYear()}</Text>
                        <View style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                            paddingTop: 5,
                            width: "100%",
                        }}/>
                        {lectureGrouped.lectures.map((lect)=>{
                            return (<CalenderEntry name={lect.name}
                                                   rooms={lect.rooms}
                                                   date={lect.date}
                                                   type={lect.type}
                                                   startTime={lect.startTime}
                                                   endTime={lect.endTime}
                                                   course={lect.course}
                                                   id={lect.id}
                                                   key={lect.id}
                            />);
                        })}
                    </View>)

            })}
        </ScrollView>
    )
}
