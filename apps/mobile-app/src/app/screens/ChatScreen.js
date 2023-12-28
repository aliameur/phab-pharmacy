import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, KeyboardAvoidingView, Keyboard, ActivityIndicator, Image, Dimensions, ScrollView, Platform} from 'react-native';
import colours from '../colours';
import Voice from '@react-native-voice/voice';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import colours from '../colours';
import ActionSheet from '../components/ActionSheet';
import UserMenuSheet from '../components/UserMenuSheet';
import { KeyboardAwareScrollVie, KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';


function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const flatListRef = useRef();
  const textInputref = useRef();
  const [isActionSheetNum, setIsActionSheetNum] = useState(0);
  const [recording, setRecording] = useState();
  const [isMenuModalVisible, setMenuModalVisible] = useState(false);

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const showModal = () => setMenuModalVisible(true);
  useEffect(() => {
    navigation.setParams({ showModal: () => setMenuModalVisible(true) });
  }, [navigation]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      _keyboardDidHide,
    );

    // Cleanup function
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const _keyboardDidShow = () => {
    flatListRef.current.scrollToEnd({ animated: true });
  };

  const _keyboardDidHide = () => {
    flatListRef.current.scrollToEnd({ animated: true });
  };

  const handleMessageCreation = () => {
    if (currentMessage === '') {
      return;
    }
    const newMessage = {
      id: messages.length + 2,
      content: currentMessage,
      fromUser: true,
    };
    setCurrentMessage('');
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    handlePostRequest(currentMessage);
  };

  const handlePostRequest = async (messageToSubmit) => {
    try {
      //const response = await fetch('https://llmdoctor-af19c5c44aab.herokuapp.com/api/sendText', {
      const response = await fetch('http://127.0.0.1:8000/api/sendText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: messageToSubmit,
          history:
            messages.length >= 4
              ? messages.slice(-4).content
              : messages.content,
        }),
      });

      const jsonData = await response.json();
      const newResponse = {
        id: messages.length + 2,
        content: jsonData.message,
        fromUser: false,
        location: jsonData.location,
      };
      setMessages((prevMessages) => [...prevMessages, newResponse]);
    } catch (error) {
      console.log('Error posting data: ', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now(),
          content: 'Invalid Load',
          fromUser: false,
          location: 'None',
        },
      ]);
    }
  };

  const sendMessage = () => {
    handleMessageCreation();
  };

  const showMessageActionSheet = (id) => {
    setIsActionSheetNum(id);
  };

  const hideMessageActionSheet = () => {
    setIsActionSheetNum(0);
  };

  const hideUserSheet = () => {
    setMenuModalVisible(false);
  };

    async function startRecording() {
        Voice.start('en-US');
        setRecording(true);
    };
   Voice.onSpeechResults = (e) => {
        textInputref.current.value = e.value[0]
        setCurrentMessage(e.value[0])
    };
    Voice.onSpeechError = (e) => {
        console.log('onSpeechError: ', e.error);
    };
    
    async function stopRecording() {
        Voice.stop();
        setRecording(false);
    };


    return (
        <KeyboardAvoidingView style={{flex: 1, backgroundColor: colours.LogoColours.cream}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 65 : -200}>
            {isMenuModalVisible ? (<UserMenuSheet onClose={hideUserSheet} visible={isMenuModalVisible} navigation={navigation}/>) : null}
            <View style={styles.messagesView}>
                <FlatList
                    ref={flatListRef}
                    style={styles.messagesView}
                    data={messages}
                    keyExtractor={(item, index) => index.toString()}
                    inverted={false}
                    onContentSizeChange={scrollToBottom}
                    renderItem={({ item }) => {
                        if (item.fromUser){
                            return (
                            <View style={styles.messageContainer}>
                                <TouchableOpacity onPress={() => showMessageActionSheet(item.id)}>
                                    <View style={styles.messageBlock}>
                                        <Text style={styles.message}>{item.content}</Text>
                                        {item.id === isActionSheetNum ? (
                                            <ActionSheet visible={item.id === isActionSheetNum} message={item.content} onClose={hideMessageActionSheet}  />
                                        ) : null}
                                    </View> 
                                </TouchableOpacity>
                            </View>
                            ); 
                        }
                        else {
                            if (item.location === 'None'){
                                return (
                                    <View style={styles.responseContainer}>
                                        <TouchableOpacity onPress={() => showMessageActionSheet(item.id)}>
                                            <View style={styles.responseBlock}>
                                                <Text style={styles.response}>{item.content}</Text>
                                                {item.id === isActionSheetNum ? (
                                                    <ActionSheet visible={item.id === isActionSheetNum} message={item.content} onClose={hideMessageActionSheet}  />
                                                ) : null}
                                            </View>
                                        </TouchableOpacity>
                                    </View>
            
                                );
                            } else{
                                return (
                                    <View style={styles.responseContainer}>
                                        <TouchableOpacity onPress={showMessageActionSheet}>
                                            <View style={styles.responseBlock}>
                                                <Text style={styles.response}>{item.content}</Text>
                                                {isActionSheetNum && (
                                                <ActionSheet visible={isActionSheetNum} message={item.content} onClose={hideMessageActionSheet}  />
                                            )}
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.responseBlock}>
                                        <Image
                                            style={styles.image}
                                            source={{ uri: 'https://i.ibb.co/4P5w20Z/paddington.jpg' }}
                                        />
                                        </View>
                                    </View>
                                );
                            }
                            
                        }  
                    }}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    ref={textInputref}
                    style={styles.input}
                    value={currentMessage}
                    clearButtonMode='while-editing'
                    multiline
                    returnKeyType='done'
                    onChangeText={(text) => {
                        if (text.endsWith('\n')) {
                            setCurrentMessage(text.slice(0, -1));
                            Keyboard.dismiss();
                        } else {
                            setCurrentMessage(text);
                            scrollToBottom();
                        }
                    }}
                    placeholder="Type a message"
                />
                {currentMessage != '' & !recording? (<TouchableOpacity 
                onPress={() => {
                    Keyboard.dismiss();
                    setTimeout(() => {
                        sendMessage();
                    }, 100);
                }}
                style={styles.sendButton}>
                    <Text style={{fontSize: 0.05 * Dimensions.get('window').width, color: colours.LogoColours.green}}>Send</Text>
                </TouchableOpacity>) : (recording ? 
                    (<TouchableOpacity style={styles.iconMicButton} onPress={stopRecording}>
                    <FontAwesome name="stop-circle" size={30} color={colours.LogoColours.green} />
                </TouchableOpacity>) :
                (<TouchableOpacity style={styles.iconMicButton} onPress={startRecording}>
                    <FontAwesome name="microphone" size={30} color={colours.LogoColours.green} />
                </TouchableOpacity>))}
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messagesView: {
        flex: 10,
        marginBottom: 3,
        backgroundColor: colours.LogoColours.cream
    },
    image: {
        width: 260,  
        height: 200,
    },
    message: {
        color: colours.LogoColours.cream, 
        textAlign: 'center',
        fontSize: 0.04 * Dimensions.get('window').width,
    },
    response: {
        color: 'black', 
        textAlign: 'center',
        fontSize: 0.04 * Dimensions.get('window').width,
    },
    messageBlock: {
        padding: 10,
        borderColor: 'black',
        borderWidth: 2,
        margin: 10,
        marginBottom: 0,
        backgroundColor: colours.LogoColours.green,
        borderRadius: 15,
        paddingHorizontal: 15, 
        marginLeft: 30,
    },
    responseBlock: {
        padding: 10,
        borderColor: 'black',
        borderWidth: 2,
        margin: 10,
        marginBottom: 0,
        backgroundColor: colours.LogoColours.logo_cream,
        borderRadius: 15,
        marginRight: '25%',
    },
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    responseContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    inputContainer: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: '5%',
        paddingBottom: '5%',
        borderTopWidth: 1,
        backgroundColor: 'white'
    },
    input: {
        flex: 6,
        marginRight: 5,
        fontSize: 0.05 * Dimensions.get("window").width,
    },
    sendButton: {
        alignSelf: 'center',
        flex: 1
    },
    iconMicButton: {
        alignSelf: 'center',
        flex: 0.5
    }

});

export default ChatScreen;
