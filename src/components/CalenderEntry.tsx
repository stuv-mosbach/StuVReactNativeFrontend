import React from 'react';
import { Text, View } from 'react-native';
import { style } from '../util/Style';
import {Lecture} from "../Service/networking-service";

interface CalendarEntryProps {
  name: string;
  room: string;
  date: string;
  type: 'PRESENCE' | 'ONLINE';
  startTime: string;
  endTime: string;
}

function formatStartEndTime(startTime: string, endTime: string): string {
  let newStartTime = new Date(startTime)
    .toTimeString()
    .split(' ')[0]
    .slice(0, 5);
  let newEndTime = new Date(endTime).toTimeString().split(' ')[0].slice(0, 5);

  return `${newStartTime}-${newEndTime}`;
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
    <View style={style.calendarEntry}>
      <Text>{name}</Text>
      <Text>{new Date(date).toLocaleDateString()}</Text>
      <Text>{startTime.getDate()}</Text>
    </View>
  );
}
