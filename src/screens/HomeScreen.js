import React from 'react';
import {View, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';

export default function HomeScreen() {
  //
  const route = useRoute();
  const {email, uid} = route.params;

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Eamil: {email}</Text>
      <Text>UID: {uid} </Text>
    </View>
  );
}
