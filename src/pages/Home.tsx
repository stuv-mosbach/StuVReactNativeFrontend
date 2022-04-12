import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import CalenderEntry from '../components/CalenderEntry';
import { style } from '../util/Style';

// import {
//   fetchLecturesTest,
//   NetworkService,
// } from '../Service/networking-service';
export default function Home({ navigation }: any) {
  // useEffect(() => {
  //   NetworkService.getLectures('MOS-TINF21A');
  // }, []);

  return (
    <View style={style.container}>
      <Text style={style.header}>Heutige Vorlesungen</Text>
      <CalenderEntry
        name="Elektrotechnik"
        date="2022-04-04T22:00:00.000Z"
        type="PRESENCE"
        room="B 0.320 Vorlesungsraum"
        startTime="2022-04-05T07:00:00.000Z"
        endTime="2022-04-05T10:15:00.000Z"
      />
      <CalenderEntry
        name="Elektrotechnik"
        date="2022-04-04T22:00:00.000Z"
        type="PRESENCE"
        room="B 0.320 Vorlesungsraum"
        startTime="2022-04-05T07:00:00.000Z"
        endTime="2022-04-05T10:15:00.000Z"
      />
      <CalenderEntry
        name="Elektrotechnik"
        date="2022-04-04T22:00:00.000Z"
        type="PRESENCE"
        room="B 0.320 Vorlesungsraum"
        startTime="2022-04-05T07:00:00.000Z"
        endTime="2022-04-05T10:15:00.000Z"
      />
    </View>
  );
}
