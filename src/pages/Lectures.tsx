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
        lecture.forEach((lect) => {
            if (groupedLectures.length == 0) {
                groupedLectures.push({
                    date: lect.date,
                    lectures: [lect]
                } as LectureGrouped)
            } else {
                if (lect.date.getTime() == groupedLectures[groupedLectures.length - 1].date.getTime()) {
                    groupedLectures[groupedLectures.length - 1].lectures.push(lect)
                } else {
                    groupedLectures.push({date: lect.date, lectures: [lect]} as LectureGrouped)
                }
            }

        })
        console.log(groupedLectures)
        return groupedLectures
    }
    const formatDate = function (date: Date): string {
        let dateString: string = "";
        if (date.getDate() < 10) {
            dateString = "0" + date.getDate() + ". "
        } else {
            dateString = date.getDate() + ". "
        }
        switch (date.getMonth()) {
            case 0:
                dateString += "Jan";
                break;
            case 1:
                dateString += "Feb";
                break;
            case 2:
                dateString += "Mär";
                break;
            case 3:
                dateString += "Apr";
                break;
            case 4:
                dateString += "Mai";
                break;
            case 5:
                dateString += "Jun";
                break;
            case 6:
                dateString += "Jul";
                break;
            case 7:
                dateString += "Aug";
                break;
            case 8:
                dateString += "Sep";
                break;
            case 9:
                dateString += "Okt";
                break;
            case 10:
                dateString += "Nov";
                break;
            case 11:
                dateString += "Dez";
                break;
        }
        dateString += " " + date.getFullYear() + " - ";
        switch (date.getDay()) {
            case 1:
                dateString += "Montag";
                break;
            case 2:
                dateString += "Dienstag";
                break;
            case 3:
                dateString += "Mittwoch";
                break;
            case 4:
                dateString += "Donnerstag";
                break;
            case 5:
                dateString += "Freitag";
                break;
            case 6:
                dateString += "Samstag";
                break;
            case 7:
                dateString += "Sonntag";
                break;
        }
        return dateString
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
                    refreshControl={
                        <RefreshControl refreshing={refreshing}
                                        onRefresh={refresh}
                        />}
        >
            {lectures.map((lectureGrouped) => {
                return (
                    <View>
                        <Text style={{
                            paddingTop: 7,
                            paddingBottom: 0
                        }}>{formatDate(lectureGrouped.date)}</Text>
                        <View style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                            paddingTop: 5,
                            width: "100%",
                        }}/>
                        {lectureGrouped.lectures.map((lect) => {
                            return (<CalenderEntry name={lect.name}
                                                   rooms={lect.rooms}
                                                   date={lect.date}
                                                   type={lect.type}
                                                   startTime={lect.startTime}
                                                   endTime={lect.endTime}
                                                   course={lect.course}
                                                   id={lect.id}
                            />);
                        })}
                    </View>)

            })}
        </ScrollView>
    )
}
