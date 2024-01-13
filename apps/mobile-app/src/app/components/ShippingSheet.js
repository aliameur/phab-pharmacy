import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colours from '../colours';
import { TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function ShippingSheet ({ visible, onClose}) {
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
                    <KeyboardAwareScrollView style={{flex: 1}} extraHeight={1}>
                        <View style={styles.TextWholeInputView}>
                            <Text>First Name</Text>
                            <View style={styles.TextInputStyleView}>
                                <FontAwesome name="user" size={25} color={colours.TailWindColors['mineral-green'][600]} style={styles.TextInputIcon} />
                                <TextInput 
                                style={styles.TextInputStyle}
                                placeholder="John"
                                placeholderTextColor={colours.LogoColours.cream}
                                >
                                </TextInput>
                            </View>
                        </View>
                        <View style={styles.TextWholeInputView}>
                            <Text>Last Name</Text>
                            <View style={styles.TextInputStyleView}>
                                <FontAwesome name="user" size={25} color={colours.TailWindColors['mineral-green'][600]} style={styles.TextInputIcon} />
                                <TextInput 
                                style={styles.TextInputStyle}
                                placeholder="Appleseed"
                                placeholderTextColor={colours.LogoColours.cream}
                                >
                                </TextInput>
                            </View>
                        </View>
                        <View style={styles.TextWholeInputView}>
                            <Text>Address</Text>
                            <View style={styles.TextInputStyleView}>
                                <FontAwesome name="home" size={25} color={colours.TailWindColors['mineral-green'][600]} style={styles.TextInputIcon} />
                                <TextInput 
                                style={styles.TextInputStyle}
                                placeholder="Email"
                                placeholderTextColor={colours.LogoColours.cream}
                                >
                                </TextInput>
                            </View>
                        </View>
                        <View style={styles.TextWholeInputView}>
                            <Text>City</Text>
                            <View style={styles.TextInputStyleView}>
                                <FontAwesome name="building-o" size={25} color={colours.TailWindColors['mineral-green'][600]} style={styles.TextInputIcon} />
                                <TextInput 
                                style={styles.TextInputStyle}
                                placeholder="Email"
                                placeholderTextColor={colours.LogoColours.cream}
                                >
                                </TextInput>
                            </View>
                        </View>
                        <View style={styles.TextWholeInputView}>
                            <Text>Postal Code</Text>
                            <View style={styles.TextInputStyleView}>
                                <FontAwesome name="truck" size={25} color={colours.TailWindColors['mineral-green'][600]} style={styles.TextInputIcon} />
                                <TextInput 
                                style={styles.TextInputStyle}
                                placeholder="Email"
                                placeholderTextColor={colours.LogoColours.cream}
                                >
                                </TextInput>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                    <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handleCancelPress}
                    >
                        <Text style={{color: colours.LogoColours.cream, fontSize: 20, fontWeight: '600'}}>Save Address</Text>
                    </TouchableOpacity>
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
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colours.LogoColours.green,
        marginBottom: 16,
    },
    cancelButton: {
        marginTop: 16,
        width: '60%',
        backgroundColor: colours.TailWindColors['mineral-green'][600],
        borderColor: colours.LogoColours.green,
        color: 'white',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 12,
        flex: 0.1
    },
    TextWholeInputView: {
        height: '25%',
    },
    TextInputStyleView:{
        maxHeight: 50,
        margin: 12,
        borderRadius: 15,
        backgroundColor: colours.TailWindColors.norway[300],
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },  
    TextInputStyle: {
        flex: 8,
        marginHorizontal: 10,
        color: colours.TailWindColors['mineral-green'][600],
        fontSize:  17,
    },
    TextInputIcon: {
        flex: 1,
        marginLeft: 15,
    },
  });

export default ShippingSheet;