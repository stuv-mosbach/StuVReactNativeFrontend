import { Image, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { style } from '../util/Style';

export default function DevList() {
  return (
    <ScrollView style={style.scrollViewStyle}>
      <View style={style.container}>
        <Text style={style.h1}>Devs</Text>
      </View>
      <View style={style.divider} />
      <View style={style.settingsField}>
        <Image
          style={style.devAvatar}
          source={require('../assets/img/dev-avatars/maxdola.jpg')}
        />
        <View style={style.devDescriptionBox}>
          <Text style={style.devMainText}>Maxdola</Text>
          <Text style={style.devSecondText}>
            Lead Backend / Web Frontend Dev / Team Lead Backend
          </Text>
        </View>
      </View>
      <View style={style.settingsField}>
        <Image
          style={style.devAvatar}
          source={require('../assets/img/dev-avatars/The_Loraxxz.jpg')}
        />
        <View style={style.devDescriptionBox}>
          <Text style={style.devMainText}>The_Loraxz</Text>
          <Text style={style.devSecondText}>
            Lead App Frontend Dev / Team Lead Frontend
          </Text>
        </View>
      </View>
      <View style={style.settingsField}>
        <Image
          style={style.devAvatar}
          source={require('../assets/img/dev-avatars/XNaCly.jpg')}
        />
        <View style={style.devDescriptionBox}>
          <Text style={style.devMainText}>XNaCly</Text>
          <Text style={style.devSecondText}>App Frontend Dev</Text>
        </View>
      </View>
      <View style={style.settingsField}>
        <Image
          style={style.devAvatar}
          source={require('../assets/img/dev-avatars/robinDHBW.png')}
        />
        <View style={style.devDescriptionBox}>
          <Text style={style.devMainText}>robinDHBW</Text>
          <Text style={style.devSecondText}>Backend Dev</Text>
        </View>
      </View>
      <View style={style.settingsField}>
        <Image
          style={style.devAvatar}
          source={require('../assets/img/dev-avatars/nicklaskoopmann.png')}
        />
        <View style={style.devDescriptionBox}>
          <Text style={style.devMainText}>Nicklas Koopmann</Text>
          <Text style={style.devSecondText}>Helper/ Dev of 1.0</Text>
        </View>
      </View>
      <View style={style.settingsField}>
        <Image
          style={style.devAvatar}
          source={require('../assets/img/dev-avatars/maxalterStuv.png')}
        />
        <View style={style.devDescriptionBox}>
          <Text style={style.devMainText}>Max Hausknecht</Text>
          <Text style={style.devSecondText}>former Project Manager</Text>
        </View>
      </View>
    </ScrollView>
  );
}
