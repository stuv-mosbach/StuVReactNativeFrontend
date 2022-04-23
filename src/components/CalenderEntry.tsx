import React from 'react';
import {Text, View} from 'react-native';
import {style} from '../util/Style';
import {Lecture} from "../Service/networking-service";

interface CalendarEntryProps {
    name: string;
    room: string;
    date: string;
    type: 'PRESENCE' | 'ONLINE';
    startTime: string;
    endTime: string;
}

function formatStartEndTime(startTime: Date, endTime: Date): string {
    let start: string = startTime.getHours() < 10 ? "0" + startTime.getHours().toString() : startTime.getHours().toString();
    start = start + ":" + (startTime.getMinutes() < 10 ? "0" + startTime.getMinutes().toString() : startTime.getMinutes().toString());
    let ende: string = endTime.getHours() < 10 ? "0" + endTime.getHours().toString() : endTime.getHours().toString();
    ende = ende + ":" + (endTime.getMinutes() < 10 ? "0" + endTime.getMinutes().toString() : endTime.getMinutes().toString());
    return start + " - " + ende;
}

const styleColour = function (typeLecture: string, name: string): object {
    let background, color: string;
    color = "";
    switch (typeLecture) {
        case "ONLINE":
            background = "#00e2ad";
            break;
        case "PRESENCE":
            background = "white";
            break;
        default:
            background = "white";
            break;
    }
    if (name.toLowerCase().indexOf("klausur") > -1) {
        background = "#e2001a";
        color = "#fff"
    }
    return {
        backgroundColor: background,
        color: "white"
    }
}
const roomText = function (rooms: string[]): string {
    if (rooms.length == 1) {
        return rooms[0]
    } else {
        let text: string = "";
        rooms.forEach((room) => {
            text = text+ room + "/ "
        })
        return text.substring(0,text.length-2);
    }

}
export default function CalendarEntry({
                                          name,
                                          type,
                                          rooms,
                                          startTime,
                                          endTime,
                                          date,
                                      }: Lecture) {


    return (
        <View style={[style.calendarEntry,
            styleColour(type, name)]}>
            <Text>{name}</Text>
            <View
                style={{

                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                    paddingTop: 5,
                    width: "95%",

                }}
            />
            <Text>{formatStartEndTime(startTime, endTime)}</Text>
            <Text>{roomText(rooms)}</Text>
        </View>
    );
}
