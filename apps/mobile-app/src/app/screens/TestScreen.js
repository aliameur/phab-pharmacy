import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import colours from '../colours';
import { login } from '../scripts/AuthScript';

function TestScreen({ navigation }) {
  const [inputText, setInputText] = useState('');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 65 : 0}
      >
        {/* Content View */}
        <View style={styles.contentView}>{/* Your content goes here */}</View>

        {/* Text Input */}
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type here..."
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentView: {
    flex: 9, // Takes up 90% of the screen
    backgroundColor: '#f0f0f0', // Just for visibility, you can remove this
  },
  input: {
    flex: 1, // Takes up 10% of the screen
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
});

export default TestScreen;
