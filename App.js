import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import database from '@react-native-firebase/database';

export default function App() {
  const [myData, setMyData] = useState(null);

  useEffect(() => {
    getDatabase();
  }, []);

  const getDatabase = async () => {
    try {
      const data = await database().ref('users/1').once('value');

      console.log(data);

      setMyData(data.val());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Text>Name:-{myData ? myData.name : 'Loading...'}</Text>
      <Text>Age:-{myData ? myData.age : 'Loading...'}</Text>
    </View>
  );
}
