import { style } from '../util/Style';
import { Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';

/**
 * TODO:
 * - add all DEvs to the Dev list
 * - make devlist look pretty
 * - include component from Mattheo
 * - create under bugs melden a automation link to writing an email to it@stuv
 * - add log automation
 * - add automation to StuV to write to marketing or stuv Studiensprecher
 * -
 * */

export default function SettingsOverview({ navigation }: any) {
  return (
    <View style={style.settingsView}>
      <Text>Kurs auswählen</Text>
      <View style={style.divider} />
      <Text style={style.settingsHeader}>Version</Text>
      <Text>2.0</Text>
      <View
        style={style.settingsField}
        onTouchStart={() => {
          navigation.navigate('Devs');
        }}>
        <Text style={style.settingsFieldEntryLeft}>Devs</Text>
        <FontAwesome name={'arrow-right'} style={style.settingsIcon} />
      </View>

      <View style={style.divider} />
      <Text>Bugs melden</Text>
      <View style={style.divider} />
      <Text>Stuv Teilnehmenö</Text>
    </View>
  );
}
