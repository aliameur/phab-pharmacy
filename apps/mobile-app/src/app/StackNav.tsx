import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import colours from './colours';



const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerTitleAlign: 'center', 
      headerStyle: option.headerStyle,
      headerTintColor: colours.cream,
    }}>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}}/>
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}

const option = StyleSheet.create({
  headerStyle: {
    backgroundColor: colours.green
  },
})

export default MyStack;