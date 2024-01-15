import React, { useState, useContext } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import colours from '../colours';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';

function MapSheet ({ visible, onClose, location, product}) {

    const handleCancelPress = () => {
        onClose(); 
    };
    switch (location) {
        case 'A':
            videoPath = require('../assets/videos/cupboard_A.mp4');
            break;
        case 'B':
            videoPath = require('../assets/videos/cupboard_B.mp4');
            break;
        case 'C':
            videoPath = require('../assets/videos/cupboard_C.mp4');
            break;
        case 'D':
            videoPath = require('../assets/videos/cupboard_D.mp4');
            break;
        case 'E':
            videoPath = require('../assets/videos/cupboard_E.mp4');
            break;
        case 'F':
            videoPath = require('../assets/videos/cupboard_F.mp4');
            break;
        default:
          videoPath = require('../assets/videos/cupboard_A.mp4'); 
    }

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
                    <Text style={{flex: 1, marginTop: '5%', alignSelf: 'center', fontWeight: '500', fontSize: 20}}>Please find the {product} at {location}</Text>
                    <View style={{flex: 8}}>
                        <Video 
                            source={videoPath}
                            ref={(ref) => {
                            this.player = ref
                            }}                           
                            resizeMode='cover'
                            onBuffer={this.onBuffer}                
                            onError={this.videoError}               
                            style={{ width: '100%', height: '100%' }}
                            repeat={true}
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
        width: '95%',
        height: '40%',
        borderRadius: 10,
        padding: 16,
    },
    image: {
        width: '100%',
        height: '70%',
    },
  });

export default MapSheet;