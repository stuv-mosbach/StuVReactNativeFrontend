import React from 'react';
import { Text, View } from 'react-native';
import {
  fetchLecturesTest,
  NetworkService,
} from '../Service/networking-service';
export default function Home({ navigation }: any) {
  NetworkService.getLectures("MOS-TINF21A");
  return (
    <View style={{ display: 'flex', justifyContent: 'center' }}>
      <Text>Heutige Vorlesung</Text>
    </View>
  );
}
