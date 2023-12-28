import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Keychain from 'react-native-keychain';

import colours from '../colours';
import { logout } from '../scripts/AuthScript';

function UserMenuSheet({ navigation, visible, onClose }) {
  const logOut = async () => {
    service = 'JWToken';
    await logout();
    navigation.replace('Login', {});
    onClose();
  };
  const handleCancelPress = () => {
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
              <Text style={styles.text}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => logOut()}>
              <Text style={styles.text}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancelPress}
            >
              <Text
                style={{
                  color: colours.cream,
                  fontSize: 20,
                  fontWeight: '600',
                }}
              >
                Cancel
              </Text>
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

export default UserMenuSheet;
