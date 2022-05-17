import {
  Image,
  ScrollView,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { style } from '../util/Style';

export default function DevList({navigation}:any) {
  const openAvatar = function (url: string) {
    Linking.openURL(url);
  };
  React.useEffect(()=>{
    const unsubscribe = navigation.getParent().addListener('tabPress',(e)=>{
        navigation.navigate('Overview');
    });
  },[navigation])
  return (
    <ScrollView style={style.scrollViewStyle}>
      <View style={style.container}>
        <Text style={style.h1}>Devs</Text>
      </View>
      <View style={style.divider} />
      <TouchableOpacity
        style={style.settingsField}
        onLongPress={() => {
          openAvatar('https://github.com/Maxdola');
        }}>
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
      </TouchableOpacity>
      <TouchableOpacity
        style={style.settingsField}
        onLongPress={() => {
          openAvatar('https://github.com/TheLoraxxz');
        }}>
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
      </TouchableOpacity>
      <TouchableOpacity
        style={style.settingsField}
        onLongPress={() => {
          openAvatar('https://github.com/xNaCly');
        }}>
        <Image
          style={style.devAvatar}
          source={require('../assets/img/dev-avatars/XNaCly.jpg')}
        />
        <View style={style.devDescriptionBox}>
          <Text style={style.devMainText}>XNaCly</Text>
          <Text style={style.devSecondText}>App Frontend Dev</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={style.settingsField}
        onLongPress={() => {
          openAvatar('https://github.com/RobinDHBW');
        }}>
        <Image
          style={style.devAvatar}
          source={require('../assets/img/dev-avatars/robinDHBW.png')}
        />
        <View style={style.devDescriptionBox}>
          <Text style={style.devMainText}>robinDHBW</Text>
          <Text style={style.devSecondText}>Backend Dev</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={style.settingsField}
        onLongPress={() => {
          openAvatar('https://github.com/niklaskoopmann');
        }}>
        <Image
          style={style.devAvatar}
          source={require('../assets/img/dev-avatars/nicklaskoopmann.png')}
        />
        <View style={style.devDescriptionBox}>
          <Text style={style.devMainText}>Nicklas Koopmann</Text>
          <Text style={style.devSecondText}>Helper/ Dev of 1.0</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.settingsField}
        onLongPress={() => {
          openAvatar('https://github.com/maxi75');
        }}>
        <Image
          style={style.devAvatar}
          source={require('../assets/img/dev-avatars/maxalterStuv.png')}
        />
        <View style={style.devDescriptionBox}>
          <Text style={style.devMainText}>Max Hausknecht</Text>
          <Text style={style.devSecondText}>former Project Manager</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
