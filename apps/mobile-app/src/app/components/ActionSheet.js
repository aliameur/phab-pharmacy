import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useState } from 'react';
import colours from '../colours';
import Tts from 'react-native-tts';

function ActionSheet({visible, onClose, message }) {
    const [speaking, setSpeaking] = useState(false);
    const handleCancelPress = () => {
        onClose(); 
    };
    const copyToClipboard = () => {
      Clipboard.setString(message);
      onClose();
    };
    const speakOut = () => {
      Tts.setDefaultLanguage('en-UK');
      Tts.getInitStatus().then(() => {
        Tts.speak(message, {
          iosVoiceId: 'com.apple.ttsbundle.Samantha-compact',
          rate: 0.5,
        });
      });
      onClose();
    };
    return (
        <Modal
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
            visible={visible}
        >
             <TouchableOpacity
                activeOpacity={1}
                onPress={onClose} // Close the modal when tapped outside
                style={styles.overlay}
            >
                <View style={styles.container}>
                <View style={styles.sheet}>
                    <TouchableOpacity style={styles.button}>
                    <Text style={styles.text} onPress={copyToClipboard}>Copy Text</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                    <Text style={styles.text} onPress={speakOut}>Speak To Me</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={handleCancelPress}
                    >
                    <Text style={{color: 'white'}}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
}

  
  const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background overlay
    },
    text: {
        color: colours.green,
    },
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    sheet: {
      backgroundColor: 'white',
      width: '100%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      padding: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colours.green,
      marginBottom: 16,
    },
    button: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    cancelButton: {
      marginTop: 16,
      backgroundColor: colours.green,
      borderColor: colours.green,
      color: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
  });
  
  export default ActionSheet;