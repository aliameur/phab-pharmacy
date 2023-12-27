import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet,  KeyboardAvoidingView, Keyboard, ActivityIndicator, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import colours from '../colours';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { login } from '../scripts/AuthScript';
import * as Keychain from 'react-native-keychain';

function LoginScreen ({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [seePassword, setSeePassword] = useState(true);

    const loginAccount = async () => {
        try {
            const output = await login(email, password); 
            if (output[0] === 'good') {
                service = 'JWToken'
                creds = await Keychain.getGenericPassword( { service } );
                console.log(creds.password);
                navigation.replace('Chat'); 
            } else {
                console.log('Login Error:', output[1]); 
            }
        } catch (error) {
            console.log('Login Exception:', error); 
        }
    };
    
    return(
        <KeyboardAvoidingView
        style={styles.mainView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -100 : -100}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{alignItems: 'center', flex: 1.5}}>
                    <Image
                    source={require('../assets/PhabPharmaLogo.png')}
                    style={styles.imageStyle}
                    resizeMode="contain"
                    >
                    </Image>
                    <Text
                    style={styles.loginText}
                    >Welcome back!</Text>
                    <Text
                    style={styles.welcomeText}>
                        Log into your existing account
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.TextInputStyleView}>
                <FontAwesome name="user" size={25} color={colours.cream} style={styles.TextInputIcon} />
                <TextInput 
                value={email}
                style={styles.TextInputStyle}
                placeholder="Email"
                placeholderTextColor={colours.cream}
                onChangeText={text => setEmail(text)}>
                </TextInput>
            </View>
            <View style={styles.TextInputStyleView}>
                <FontAwesome name="lock" size={25} color={colours.cream} style={styles.TextInputIcon}/>
                <TextInput
                value={password}
                secureTextEntry={seePassword}
                style={styles.TextInputStyle}
                placeholder="Password"
                placeholderTextColor={colours.cream}
                onChangeText={text => setPassword(text)}>
                </TextInput>
                <TouchableOpacity
                onPress={() => setSeePassword(!seePassword)}
                style={{flex: 0.7, marginRight: 10}}>
                    <FontAwesome name={seePassword ? "eye-slash" : "eye"} size={25}  color={colours.cream}/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => loginAccount()}
            >
                <Text style={{fontSize: 20, fontWeight: '800', color: colours.green}}>Login</Text>
            </TouchableOpacity>
            <View style={styles.signUpText}>
                <Text>No Account?</Text>
                <TouchableOpacity style={{marginLeft: 2}} onPress={() => navigation.navigate('Sign Up')}>
                        <Text>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: colours.cream
    },
    loginText: {
        marginTop: 15,
        flex: 0.7,
        fontSize: 20,
        color: colours.green,
        fontWeight: '800',
        alignSelf: 'center'
    },
    loginButton: {
        flex: 0.3,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        marginHorizontal: '20%',
        backgroundColor: colours.logo_light_green,
    },
    welcomeText: {
        flex: 0.7,
        fontSize: 0.06 * Dimensions.get('window').width,
        color: colours.green,
        fontWeight: '400',
    },
    TextInputStyleView:{
        margin: 12,
        borderRadius: 15,
        backgroundColor: colours.green,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.35,
    },  
    TextInputStyle: {
        flex: 7,
        marginHorizontal: 10,
        color: colours.cream,
        fontSize:  0.05 * Dimensions.get('window').width,
    },
    TextInputIcon: {
        flex: 0.5,
        marginLeft: 15,
    },
    imageStyle: {
        marginTop: '10%',
        flex: 1.5,
    },
    signUpText:{
        flex: 1,
        flexDirection: 'row', 
        marginTop: 15, 
        alignSelf: 'center',
    }
});

export default LoginScreen;
