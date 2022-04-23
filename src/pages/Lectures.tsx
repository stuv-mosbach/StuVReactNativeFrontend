import {RefreshControl, ScrollView} from "react-native";
import CalenderEntry from "../components/CalenderEntry";
import React, {useCallback, useEffect, useState} from "react";
import {Lecture, NetworkService} from "../Service/networking-service";
import {scrollViewStyle} from "./Home";
import {getData} from "../Service/datastore-service";


export default function Lectures() {
    const [lectures, setLectures] = useState([] as Lecture[]);
    const [refreshing, setRefresh] = useState(false);
    useEffect(() =>{
        getData('lectures').then((lectureList) =>{
            if (lectureList) {
                const lect:Lecture[] = lectureList.map((lecture:Lecture)=>{
                    const lec:Lecture = {
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
                setLectures(lect);
            }

        })
    },[])
    const refresh = useCallback(() => {
        setRefresh(true);
        NetworkService.getLectures('MOS-TINF21A').then((lecture: Lecture[] | null) => {
            if (lecture) {
                setLectures(lecture);
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
            {lectures.map(lecture => {
                return (<CalenderEntry name={lecture.name}
                                       rooms={lecture.rooms}
                                       date={lecture.date}
                                       type={lecture.type}
                                       startTime={lecture.startTime}
                                       endTime={lecture.endTime}
                                       course={lecture.course}
                                       id={lecture.id}
                                       key={lecture.id}
                />);
            })}
        </ScrollView>
    )
}
