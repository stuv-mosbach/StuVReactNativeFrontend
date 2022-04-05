import React from 'react';
import { Text, View } from 'react-native';

interface CalenderEntryProps {
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

export default function CalenderEntry({
  name,
  type,
  room,
  startTime,
  endTime,
  date,
}: CalenderEntryProps) {
  return (
    <View>
      <Text>{name}</Text>
      <Text>{new Date(date).toLocaleDateString()}</Text>
      <Text>{formatStartEndTime(startTime, endTime)}</Text>
      <Text>{type === 'ONLINE' ? 'Online Veranstaltung' : room}</Text>
    </View>
  );
}
