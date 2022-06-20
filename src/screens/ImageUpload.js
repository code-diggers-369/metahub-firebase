import {View, Text, Button, Image} from 'react-native';
import React, {useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';

export default function ImageUpload() {
  const [imageData, setImageData] = useState(null);
  const [fullImgRefPath, setFullImgRefPath] = useState('');
  const [imgDownloadUrl, setImgDownloadUrl] = useState('');

  const pickImage = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
        copyTo: 'cachesDirectory',
      });
      console.log(response);
      setImageData(response);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async () => {
    try {
      const response = storage().ref(`/profile/${imageData.name}`);

      const put = await response.putFile(imageData.fileCopyUri);

      setFullImgRefPath(put.metadata.fullPath);
      const url = await response.getDownloadURL();

      setImgDownloadUrl(url);

      alert('Image Uploaded Successfully');
    } catch (err) {
      console.log(err);
    }
  };

  const deleteImage = async () => {
    try {
      const response = await storage().ref(fullImgRefPath).delete();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {imageData ? (
        <Image
          source={{uri: imageData.uri}}
          style={{height: 200, width: 200, marginBottom: 20}}
        />
      ) : (
        <Text>No Image Found</Text>
      )}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Button title="Select Image" onPress={() => pickImage()} />
        <Button title="Upload Image" onPress={() => uploadImage()} />
        <Button
          title="Delete Image"
          onPress={() => deleteImage()}
          color="red"
        />
      </View>

      <View style={{marginTop: 30}}>
        <Text>
          Url = {imgDownloadUrl.length > 0 ? imgDownloadUrl : 'not found'}
        </Text>
      </View>

      <Image source={{uri: imgDownloadUrl}} style={{height: 300, width: 300}} />
    </View>
  );
}
