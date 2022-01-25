import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import database from '@react-native-firebase/database';

export default function App() {
  const [inputTextValue, setInputTextValue] = useState(null);
  const [list, setList] = useState(null);

  // useEffect(() => {
  //   getDatabase();
  // }, []);

  // const getDatabase = async () => {
  //   try {
  //     const data = await database().ref('users/1').once('value');

  //     console.log(data);

  //     setMyData(data.val());
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleAddData = async () => {
    try {
      const response = await database().ref('todo/2').set({
        value: inputTextValue,
      });

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View>
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
          Todo App
        </Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Any Value"
          value={inputTextValue}
          onChangeText={value => setInputTextValue(value)}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddData()}>
          <Text style={{color: '#fff'}}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputBox: {
    width: width - 30,
    borderRadius: 15,
    borderWidth: 2,
    marginVertical: 10,
    padding: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
  },
});
