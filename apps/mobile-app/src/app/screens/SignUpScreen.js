import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet,  KeyboardAvoidingView, Keyboard, ActivityIndicator, Image, Dimensions, ScrollView, TouchableWithoutFeedback} from 'react-native';
import colours from '../colours';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


function SignUpScreen({navigation}){

    return(
        <KeyboardAvoidingView style={{flex: 1, justifyContent: 'flex-end'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 20}
        >
            <View style={{alignItems: 'center', marginBottom: Dimensions.get('window').height * 0.07}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={{alignItems: 'center', width: Dimensions.get('window').width}}>
                        <Image
                        source={require('../assets/PhabPharmaLogo.png')}
                        style={styles.imageStyle}
                        >
                        </Image>
                        <Text
                        style={styles.loginText}
                        >Hey it would be great to have you!</Text>
                        <Text
                        style={styles.welcomeText}>
                            Please sign up below
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.TextInputStyleView}>
                    <FontAwesome name="user" size={25} color={colours.cream} style={styles.TextInputIcon}/>
                        <TextInput
                        style={styles.TextInputStyle}
                        placeholder="First Name"
                        placeholderTextColor={colours.cream}>
                    </TextInput>
                </View>
                <View style={styles.TextInputStyleView}>
                    <FontAwesome name="user" size={25} color={colours.cream} style={styles.TextInputIcon}/>
                        <TextInput
                        style={styles.TextInputStyle}
                        placeholder="Last Name"
                        placeholderTextColor={colours.cream}>
                    </TextInput>
                </View>
                <View style={styles.TextInputStyleView}>
                    <FontAwesome name="envelope" size={25} color={colours.cream} style={styles.TextInputIcon}/>
                        <TextInput
                        style={styles.TextInputStyle}
                        placeholder="Email"
                        placeholderTextColor={colours.cream}>
                    </TextInput>
                </View>
                <View style={styles.TextInputStyleView}>
                    <FontAwesome name="lock" size={25} color={colours.cream} style={styles.TextInputIcon}/>
                        <TextInput
                        style={styles.TextInputStyle}
                        placeholder="Password"
                        placeholderTextColor={colours.cream}>
                    </TextInput>
                </View>
                <TouchableOpacity 
                style={styles.loginButton}
                onPress={() => {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Chat' }],
                    });
                  }}
                >
                    <Text style={{fontSize: 20, fontWeight: '800', color: colours.green}}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    loginText: {
        marginTop: 10,
        marginBottom: 3,
        fontSize: 25,
        color: colours.green,
        fontWeight: '800',
    },
    loginButton: {
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').height * 0.07,
        borderColor: colours.green,
        borderWidth: 0,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        marginTop: 50,
        backgroundColor: colours.logo_ligh_green
    },
    welcomeText: {
        marginBottom: 3,
        marginBottom: 40,
        fontSize: 17,
        color: colours.green,
        fontWeight: '400',
    },
    TextInputStyleView:{
        margin: 10,
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.07,
        borderRadius: 15,
        backgroundColor: colours.green,
        flexDirection: 'row', 
        alignItems: 'center'
    },  
    TextInputStyle: {
        marginHorizontal: 10,
        color: colours.cream,
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
    }
})



export default SignUpScreen