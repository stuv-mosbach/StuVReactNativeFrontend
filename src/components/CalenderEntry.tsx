import React from 'react';
import { Text, View } from 'react-native';
import { style } from '../util/Style';

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
  room,
  startTime,
  endTime,
  date,
}: CalendarEntryProps) {
  return (
    <View style={style.calendarEntry}>
      <Text>{name}</Text>
      <Text>{new Date(date).toLocaleDateString()}</Text>
      <Text>{formatStartEndTime(startTime, endTime)}</Text>
      <Text>{type === 'ONLINE' ? 'Online Veranstaltung' : room}</Text>
    </View>
  );
}
