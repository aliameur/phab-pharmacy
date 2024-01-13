import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import colours from '../colours';
import { createUser, login } from '../scripts/AuthScript';

export default function SignUpScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUpUser = async () => {
    try {
      const signUpResult = await createUser(
        firstName,
        lastName,
        email,
        password,
      );
      console.log('Finished');
      if (signUpResult[0] === 'good') {
        const loginResult = await login(email, password);
        if (loginResult[0] === 'good') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Chat' }],
          });
        } else {
          console.log('Login failed:', loginResult[1]);
        }
      } else {
        console.log('Signup failed:', signUpResult);
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <KeyboardAwareScrollView extraHeight={1000}>
      <View style={{ alignItems: 'center' }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ alignItems: 'center', marginBottom: -10 }}>
            <Image
              source={require('../assets/PhabPharmaLogo.png')}
              style={styles.imageStyle}
              resizeMode="contain"
            ></Image>
            <Text style={styles.signUpText}>
              Hey it would be great to have you!
            </Text>
            <Text style={styles.signUpMessageText}>Please sign up below</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.TextInputStyleView}>
          <FontAwesome
            name="user"
            size={25}
            color={colours.LogoColours.cream}
            style={styles.TextInputIcon}
          />
          <TextInput
            value={firstName}
            style={styles.TextInputStyle}
            placeholder="First Name"
            placeholderTextColor={colours.LogoColours.cream}
            onChangeText={setFirstName}
          ></TextInput>
        </View>
        <View style={styles.TextInputStyleView}>
          <FontAwesome
            name="user"
            size={25}
            color={colours.LogoColours.cream}
            style={styles.TextInputIcon}
          />
          <TextInput
            value={lastName}
            style={styles.TextInputStyle}
            placeholder="Last Name"
            placeholderTextColor={colours.LogoColours.cream}
            onChangeText={setLastName}
          ></TextInput>
        </View>
        <View style={styles.TextInputStyleView}>
          <FontAwesome
            name="envelope"
            size={25}
            color={colours.LogoColours.cream}
            style={styles.TextInputIcon}
          />
          <TextInput
            value={email}
            style={styles.TextInputStyle}
            placeholder="Email"
            placeholderTextColor={colours.LogoColours.cream}
            onChangeText={setEmail}
          ></TextInput>
        </View>
        <View style={styles.TextInputStyleView}>
          <FontAwesome
            name="lock"
            size={25}
            color={colours.LogoColours.cream}
            style={styles.TextInputIcon}
          />
          <TextInput
            value={password}
            style={styles.TextInputStyle}
            onEndEditing={() => signUpUser()}
            placeholder="Password"
            placeholderTextColor={colours.LogoColours.cream}
            onChangeText={setPassword}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => {
            signUpUser();
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: '800',
              color: colours.LogoColours.green,
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  signUpText: {
    marginTop: 10,
    marginBottom: 3,
    fontSize: 15,
    alignContent: 'center',
    color: colours.LogoColours.green,
    fontWeight: '800',
  },
  signUpButton: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').height * 0.07,
    borderColor: colours.LogoColours.green,
    borderWidth: 0,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginTop: 20,
    backgroundColor: colours.LogoColours.logo_light_green,
  },
  signUpMessageText: {
    marginBottom: 3,
    marginBottom: 40,
    fontSize: 17,
    color: colours.LogoColours.green,
    fontWeight: '400',
  },
  TextInputStyleView: {
    margin: 10,
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.07,
    borderRadius: 15,
    backgroundColor: colours.LogoColours.green,
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextInputStyle: {
    marginHorizontal: 10,
    color: colours.LogoColours.cream,
    fontSize: 18,
  },
  TextInputIcon: {
    marginLeft: 15,
    marginRight: 10,
  },
  imageStyle: {
    marginBottom: 20,
    marginTop: 10,
    width: Dimensions.get('window').height * 0.1,
    height: Dimensions.get('window').height * 0.13,
  },
});
