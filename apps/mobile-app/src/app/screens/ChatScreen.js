import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet,  KeyboardAvoidingView, Keyboard, ActivityIndicator, Image, Dimensions} from 'react-native';
import colours from '../colours';
import Voice from '@react-native-voice/voice';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ActionSheet from '../components/ActionSheet';

function ChatScreen() {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const flatListRef = useRef();
    const textInputref = useRef();
    const [isActionSheetNum, setIsActionSheetNum] = useState(0);
    const [recording, setRecording] = useState();

    const scrollToBottom = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    };
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
        if (currentMessage === ''){
            return;
        } 
        const newMessage = {
            id: messages.length + 2,
            content: currentMessage, 
            fromUser: true,
        };
        setCurrentMessage('');
        setMessages(prevMessages => [...prevMessages, newMessage]);
        handlePostRequest(currentMessage);
    }

    const handlePostRequest = async (messageToSubmit) => {
        try {
            //const response = await fetch('https://llmdoctor-af19c5c44aab.herokuapp.com/api/sendText', {
            const response = await fetch('http://127.0.0.1:8000/api/sendText', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: messageToSubmit, history: messages.length >= 4 ? messages.slice(-4).content: messages.content}),
            });

            const jsonData = await response.json();
            const newResponse = {
                id: messages.length + 2,
                content: jsonData.message,
                fromUser: false,
                location: jsonData.location,
            };
            setMessages(prevMessages => [...prevMessages, newResponse]);
        } catch (error) {
            console.log('Error posting data: ', error);
            setMessages(prevMessages => [...prevMessages, { id: Date.now(), content: 'Invalid Load', fromUser: false, location: 'None' }]);
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

    async function startRecording() {
        Voice.start('en-US');
        setRecording(true);
    };
   Voice.onSpeechResults = (e) => {
        console.log('onSpeechResults: ', e.value);
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
        <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 80}
        style={styles.container}>
            <View style={messageStyles(messages).view}>
                <FlatList
                    ref={flatListRef}
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
                    multiline
                    onSubmitEditing={() => {
                        Keyboard.dismiss();
                        sendMessage();
                    }}
                    onChangeText={text => setCurrentMessage(text)}
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
                    <Text style={{fontSize: 0.05 * Dimensions.get('window').width, color: colours.green}}>Send</Text>
                </TouchableOpacity>) : (recording ? 
                    (<TouchableOpacity style={styles.sendButton} onPress={stopRecording}>
                    <FontAwesome name="stop-circle" size={30} color={colours.green} />
                </TouchableOpacity>) :
                (<TouchableOpacity style={styles.sendButton} onPress={startRecording}>
                    <FontAwesome name="microphone" size={30} color={colours.green} />
                </TouchableOpacity>))}
            </View>
        </KeyboardAvoidingView>
    );
}

const messageStyles = (message) => StyleSheet.create({
    view: {
        flex: 1
    },
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    image: {
        width: 260,  
        height: 200,
    },
    message: {
        color: colours.cream, 
        textAlign: 'center',
        fontSize: 0.035 * Dimensions.get('window').width,
    },
    response: {
        color: 'black', 
        textAlign: 'center',
        fontSize: 0.035 * Dimensions.get('window').width,
    },
    messageBlock: {
        padding: 10,
        borderColor: 'black',
        borderWidth: 2,
        margin: 10,
        marginBottom: 0,
        backgroundColor: colours.green,
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
        backgroundColor: colours.logo_cream,
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
        flexDirection: 'row',
        //padding: 5,
        height: 0.12 * Dimensions.get('window').height,
        marginHorizontal: 15,
        marginBottom: '5%',
        borderColor: colours.green,
        borderWidth: 1.5,
        borderRadius: 10,
        marginTop: 5,
    },
    input: {
        flex: 1,
        borderRadius: 10,
        padding: 10,
        color: colours.green,
        alignItems: 'center',
        fontSize: 0.05 * Dimensions.get('window').width,
    },
    sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 0.15 * Dimensions.get('window').width,
        margin: 5,
        //borderWidth: 1.5,
        borderRadius: 5,
        //borderColor: colours.logo_cream,
        //backgroundColor: colours.green,
    },
});

export default ChatScreen;