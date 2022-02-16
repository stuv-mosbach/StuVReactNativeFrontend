import React from 'react';
import { Button, Text, View } from 'react-native';
import Example from '../components/Example';

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
    </View>
  );
}
