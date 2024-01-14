import React, { useState, useContext } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import colours from '../colours';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function MapSheet ({ visible, onClose, location, product}) {

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
            <View style={styles.overlay}>
                <View style={styles.sheet}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <TouchableOpacity
                        style={styles.backButton}
                        onPress={handleCancelPress}
                        >
                            <FontAwesome name="chevron-left" size={30} color={colours.LogoColours.green}/>
                        </TouchableOpacity>
                    </View>
                    <Text>Please find the {product} at {location}</Text>
                    <View style={{flex: 10}}>
                        <Image
                            style={styles.image}
                            source={{
                            uri: 'https://i.ibb.co/4P5w20Z/paddington.jpg',
                            }}
                            resizeMode='contain'
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

  
  const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        alignItems: 'center',
    },
    text: {
        color: colours.LogoColours.green,
        fontSize: 20
    },
    sheet: {
        backgroundColor: 'white',
        justifyContent: 'center',
        width: '80%',
        height: '80%',
        borderRadius: 10,
        padding: 16,
    },
    image: {
        width: '100%',
        height: '70%',
    },
  });

export default MapSheet;