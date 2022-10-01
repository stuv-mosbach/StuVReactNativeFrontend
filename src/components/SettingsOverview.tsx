import { style } from '../util/Style';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
// @ts-ignore
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';

export default function SettingsOverview({ navigation }: any) {
  return (
    <View style={style.settingsView}>
      <TouchableOpacity
        style={style.settingsField}
        onPress={() => {
          navigation.navigate('Select')
        }}
      >
        <Text style={style.settingsFieldEntryLeft}>Kurs auswählen</Text>
        <FontAwesome name={'arrow-right'} style={style.settingsIcon} />
      </TouchableOpacity>
      <View style={style.divider} />
      <Text style={style.h3}>Version</Text>
      <Text style={{ marginLeft: 10 }}>- 2.0</Text>
      <TouchableOpacity
        style={style.settingsField}
        onPress={() => {
          navigation.navigate('Devs');
        }}>
        <Text style={style.settingsFieldEntryLeft}>Devs</Text>
        <FontAwesome name={'arrow-right'} style={style.settingsIcon} />
      </TouchableOpacity>
      <View style={style.divider} />
      <Text style={style.h3}>Du willst mit bei der StuV mitmischen?</Text>
      <TouchableOpacity
        style={style.settingsField}
        onPress={() => {
          Linking.openURL('mailto:kontakt@stuv-mosbach.de');
        }}>
        <Text style={style.settingsFieldEntryLeft}>StuV anmelden</Text>
        <FontAwesome name={'arrow-right'} style={style.settingsIcon} />
      </TouchableOpacity>

      <View style={style.divider} />
      <TouchableOpacity
        style={style.settingsField}
        onPress={() => {
          Linking.openURL('mailto:it@stuv-mosbach.de');
        }}>
        <Text style={style.settingsFieldEntryLeft}>Bugs melden</Text>
        <FontAwesome name={'arrow-right'} style={style.settingsIcon} />
      </TouchableOpacity>
    </View>
  );
}
