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
        keyboardVerticalOffset={Platform.OS === 'ios' ? -150 : -100}>
             <View style={{alignItems: 'center', marginBottom: Dimensions.get('window').height * 0.15}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={{alignItems: 'center', width: Dimensions.get('window').width}}>
                        <Image
                        source={require('../assets/PhabPharmaLogo.png')}
                        style={styles.imageStyle}
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
                    style={{alignItems: 'flex-end'}}>
                        <FontAwesome name={seePassword ? "eye-slash" : "eye"} size={25} color={colours.cream}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                style={styles.loginButton}
                onPress={() => loginAccount()}
                >
                    <Text style={{fontSize: 20, fontWeight: '800', color: colours.green}}>Login</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Text>No Account?</Text>
                    <TouchableOpacity style={{marginLeft: 2}} onPress={() => navigation.navigate('Sign Up')}>
                            <Text>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: colours.cream
    },
    loginText: {
        marginTop: 10,
        marginBottom: 3,
        fontSize: 30,
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
        marginTop: 20,
        backgroundColor: colours.logo_light_green
    },
    welcomeText: {
        marginBottom: 3,
        marginBottom: 40,
        fontSize: 17,
        color: colours.green,
        fontWeight: '400',
    },
    TextInputStyleView:{
        margin: 12,
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.07,
        borderRadius: 15,
        backgroundColor: colours.green,
        flexDirection: 'row',
        alignItems: 'center'
    },  
    TextInputStyle: {
        marginHorizontal: 10,
        width: Dimensions.get('window').width * 0.52,
        height: Dimensions.get('window').height * 0.07,
        color: colours.cream,
        fontSize: 15,
    },
    TextInputIcon: {
        marginLeft: 15,
        marginRight: 10,
    },
    imageStyle: {
        marginBottom: 20,
        width: Dimensions.get('window').height * 0.15, 
        height: Dimensions.get('window').height * 0.2,
    }
});

export default LoginScreen;
