import { style } from '../util/Style';
import { Linking, Text, Touchable, TouchableOpacity, View } from 'react-native';
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
      <Text style={style.h3}>Version</Text>
      <Text style={{ marginLeft: 20 }}>2.0</Text>
      <TouchableOpacity
        style={style.settingsField}
        onPress={() => {
          navigation.navigate('Devs');
        }}>
        <Text style={style.settingsFieldEntryLeft}>Devs</Text>
        <FontAwesome name={'arrow-right'} style={style.settingsIcon} />
      </TouchableOpacity>
      <View style={style.divider} />
      <Text style={style.h3}>Interesse an der StuV?</Text>
      <TouchableOpacity style={style.settingsField}>
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
