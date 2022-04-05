import React from 'react';
import { Button, Text, View } from 'react-native';
import Example from '../components/Example';
import CalenderEntry from '../components/CalenderEntry';

export default function Home({ navigation }: any) {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Goto Startup"
        onPress={() => {
          navigation.navigate('Startup');
        }}
      />
      <Example />
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
