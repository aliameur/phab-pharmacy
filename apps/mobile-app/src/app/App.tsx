import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Button } from 'react-native';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import colours from './colours';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerTitleAlign: 'center', 
        headerStyle: styles.headerStyle,
        headerTintColor: colours.cream,
      }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen 
          name="Chat" 
          component={ChatScreen}  
          options={({ route }) => ({  
            headerRight: () => (
              <Button
                onPress={() => route.params.showModal()}  // Call the function passed to route.params
                title="Info"
                color={colours.green}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colours.green
  },
});