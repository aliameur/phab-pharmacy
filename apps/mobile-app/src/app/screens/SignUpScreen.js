import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet,  KeyboardAvoidingView, Keyboard, ActivityIndicator, Image, Dimensions, ScrollView, TouchableWithoutFeedback} from 'react-native';
import colours from '../colours';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createUser, login } from '../scripts/AuthScript';


export default function SignUpScreen({navigation}){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUpUser = async () => {
        try {
            const signUpResult = await createUser(firstName, lastName, email, password);
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
                console.log('Signup failed:', signUpResult[1]);
            }
        } catch (error) {
            console.error('Signup error:', error);
        }
    };
     

    return(
        <KeyboardAvoidingView style={{flex: 1, justifyContent: 'flex-end'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
        <ScrollView>
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
                        value={firstName}
                        style={styles.TextInputStyle}
                        placeholder="First Name"
                        placeholderTextColor={colours.cream}
                        onChangeText={setFirstName}>
                    </TextInput>
                </View>
                <View style={styles.TextInputStyleView}>
                    <FontAwesome name="user" size={25} color={colours.cream} style={styles.TextInputIcon}/>
                        <TextInput
                        value={lastName}
                        style={styles.TextInputStyle}
                        placeholder="Last Name"
                        placeholderTextColor={colours.cream}
                        onChangeText={setLastName}>
                    </TextInput>
                </View>
                <View style={styles.TextInputStyleView}>
                    <FontAwesome name="envelope" size={25} color={colours.cream} style={styles.TextInputIcon}/>
                        <TextInput
                        value={email}
                        style={styles.TextInputStyle}
                        placeholder="Email"
                        placeholderTextColor={colours.cream}
                        onChangeText={setEmail}>
                    </TextInput>
                </View>
                <View style={styles.TextInputStyleView}>
                    <FontAwesome name="lock" size={25} color={colours.cream} style={styles.TextInputIcon}/>
                        <TextInput
                        value={password}
                        style={styles.TextInputStyle}
                        placeholder="Password"
                        placeholderTextColor={colours.cream}
                        onChangeText={setPassword}>
                    </TextInput>
                </View>
                <TouchableOpacity 
                    style={styles.loginButton}
                    onPress={() => {signUpUser()}}
                >
                    <Text style={{fontSize: 20, fontWeight: '800', color: colours.green}}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    loginText: {
        marginTop: 10,
        marginBottom: 3,
        fontSize: 15,
        alignContent: 'center',
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
