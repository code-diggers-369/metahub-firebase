import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function App() {
  const [inputTextValue, setInputTextValue] = useState(null);
  const [list, setList] = useState([]);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [cardId, setCardid] = useState(null);

  useEffect(() => {
    getDatabase();
  }, []);

  const getDatabase = async () => {
    try {

      firestore().collection('todo').onSnapshot((snap) => {
        const tempArray = []
        snap.forEach((item) => {
          tempArray.push({
            ...item.data(),
            id: item.id
          });
        })

        setList(tempArray)
      })

      // // const data = await database().ref('todo').once('value');
      // const data = await database()
      //   .ref('todo')
      //   .on('value', tempData => {
      //     console.log(data);
      //     setList(tempData.val());
      //   });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddData = async () => {
    try {
      if (inputTextValue.length > 0) {

        await firestore().collection('todo').add({
          text: inputTextValue
        })

        setInputTextValue('')

        // const index = list.length;
        // const response = await database().ref(`todo/${index}`).set({
        //   value: inputTextValue,
        // });

        // console.log(response);

        // setInputTextValue('');
      } else {
        alert('Please Enter Value & Then Try Again');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateData = async () => {
    try {
      if (inputTextValue.length > 0) {

        await firestore().collection('todo').doc(cardId).update({
          text: inputTextValue
        })

        setInputTextValue('');
        setIsUpdateData(false)

        // const response = await database()
        //   .ref(`todo/${selectedCardIndex}`)
        //   .update({
        //     value: inputTextValue,
        //   });

        // console.log(response);
        // setInputTextValue('');
        // setIsUpdateData(false);
      } else {
        alert('Please Enter Value & Then Try Again');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCardPress = (cardId, cardValue) => {
    try {
      setIsUpdateData(true);
      setCardid(cardId);
      setInputTextValue(cardValue);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCardLongPress = (cardId, cardValue) => {
    try {
      Alert.alert('Alert', `Are You Sure To Delete ${cardValue} ?`, [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel Is Press');
          },
        },
        {
          text: 'Ok',
          onPress: async () => {
            try {

              await firestore().collection('todo').doc(cardId).delete();
              setInputTextValue('');
              setIsUpdateData(false);

              // const response = await database()
              //   .ref(`todo/${cardIndex}`)
              //   .remove();


            } catch (err) {
              console.log(err);
            }
          },
        },
      ]);

      // setIsUpdateData(true);
      // setCardid(cardIndex);
      // setInputTextValue(cardValue);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View>
        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
          Todo App
        </Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Any Value"
          value={inputTextValue}
          onChangeText={value => setInputTextValue(value)}
        />
        {!isUpdateData ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddData()}>
            <Text style={{ color: '#fff' }}>Add</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleUpdateData()}>
            <Text style={{ color: '#fff' }}>Update</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.cardContainer}>
        <Text style={{ marginVertical: 20, fontSize: 20, fontWeight: 'bold' }}>
          Todo List
        </Text>

        <FlatList
          data={list}
          renderItem={item => {
            const cardIndex = item.index;
            if (item.item !== null) {
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => handleCardPress(item.item.id, item.item.text)}
                  onLongPress={() =>
                    handleCardLongPress(item.item.id, item.item.text)
                  }>
                  <Text>{item.item.text}</Text>
                </TouchableOpacity>
              );
            }
          }}
        />
      </View>
    </View>
  );
}

const { height, width } = Dimensions.get('screen');

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
  cardContainer: {
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: width - 40,
    padding: 20,
    borderRadius: 30,
    marginVertical: 10,
  },
});