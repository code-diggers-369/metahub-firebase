import {View, Text, TextInput, Button} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

export default function MobileVerifyScreen() {
  const [mobileNo, setMobileNo] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [confirmData, setConfirmData] = useState('');

  const sendOtp = async () => {
    try {
      const mobile = '+91' + mobileNo;
      const response = await auth().signInWithPhoneNumber(mobile);
      setConfirmData(response);
      console.log(response);
      alert('Otp Is Sent Please Verify It...');
    } catch (err) {
      console.log(err);
    }
  };

  const submitOtp = async () => {
    try {
      const response = await confirmData.confirm(otpInput);
      console.log(response);

      alert('Your number is verified');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        style={{borderWidth: 1, width: '80%', marginBottom: 5}}
        placeholder="Enter Your Mobile Number"
        onChangeText={value => setMobileNo(value)}
      />
      <Button title="Send Otp" onPress={() => sendOtp()} />
      <TextInput
        style={{borderWidth: 1, width: '80%', marginBottom: 5, marginTop: 30}}
        placeholder="Enter Your OTP"
        onChangeText={value => setOtpInput(value)}
      />
      <Button title="Submit" onPress={() => submitOtp()} />
    </View>
  );
}
