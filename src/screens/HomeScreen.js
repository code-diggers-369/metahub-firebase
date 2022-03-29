import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Auth from '@react-native-firebase/auth';
import {useNavigation, StackActions} from '@react-navigation/native';

export default function HomeScreen() {
  //
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Eamil: {Auth().currentUser.email}</Text>
      <Text>UID: {Auth().currentUser.uid} </Text>

      {/*  */}
      <TouchableOpacity
        style={{
          marginVertical: 20,
          width: '80%',
          backgroundColor: 'red',
          alignItems: 'center',
          padding: 10,
          borderRadius: 20,
        }}
        onPress={async () => {
          await Auth().signOut();
          navigation.dispatch(StackActions.popToTop());
          // navigation.navigate('Login');
        }}>
        <Text style={{color: '#fff'}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
