import { useHeaderHeight } from '@react-navigation/elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import UserCheckScreen from './screens/UserCheckScreen';
import ShopScreen from './screens/ShopScreen';
import SearchScreen from './screens/SearchScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

import colours from './colours';

const Stack = createStackNavigator();

export default function App() {
  const headerHeight = Platform.OS === 'ios' ? 44 : 56; // Default header heights
  const statusBarHeight = StatusBar.currentHeight || 0;
  const estimatedHeaderHeight =
    headerHeight + (Platform.OS === 'ios' ? 0 : statusBarHeight);

  return (
    
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerTitleAlign: 'center', 
        headerStyle: styles.headerStyle,
        headerTintColor: colours.LogoColours.green,
      }}>
        <Stack.Screen name='UserCheck' component={UserCheckScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen 
          name="Sign Up" 
          component={SignUpScreen}  
          options={({ navigation }) => (
            {  
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: Dimensions.get('window').width*0.03, alignItems: 'center' }}
              >
                <FontAwesome name="chevron-left" size={30} color={colours.green}/>
              </TouchableOpacity>
            ),
            headerTintColor: colours.LogoColours.green
          })}
        />
        <Stack.Screen 
          name="Shop" 
          component={ShopScreen}  
          options={({ route }) => ({  
            headerRight: () => (
              <TouchableOpacity
                onPress={() => route.params.showModal()}
                style={{ marginRight: Dimensions.get('window').width*0.03, alignItems: 'center' }}
              >
                <FontAwesome name="list-ul" size={30} color={colours.green}/>
              </TouchableOpacity>
            ),
            headerTitle: () => (
              <Image 
              source={require('./assets/phab_pharma_no_text.png')}
              style={{width: headerHeight*0.64, height: headerHeight*0.84}}
              />
            ),
            headerTintColor: colours.LogoColours.green
          })}
        />
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerTintColor: colours.LogoColours.green}} />
        <Stack.Screen name="Product" component={ProductScreen} options={({ navigation }) => (
            {  
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: Dimensions.get('window').width*0.03, alignItems: 'center' }}
              >
                <FontAwesome name="chevron-left" size={30} color={colours.green}/>
              </TouchableOpacity>
            ),
            headerTitle: () => (
              <Image 
              source={require('./assets/phab_pharma_no_text.png')}
              style={{width: headerHeight*0.64, height: headerHeight*0.84}}
              />
            ),
            headerTintColor: colours.LogoColours.green
          })} />
        <Stack.Screen 
          name="Chat" 
          component={ChatScreen}  
          options={({ navigation, route }) => (
            {  
            headerRight: () => (
              <TouchableOpacity
                onPress={() => route.params.showModal()}
                style={{ marginRight: Dimensions.get('window').width*0.03, alignItems: 'center' }}
              >
                <FontAwesome name="list-ul" size={30} color={colours.green}/>
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: Dimensions.get('window').width*0.03, alignItems: 'center' }}
              >
                <FontAwesome name="chevron-left" size={30} color={colours.green}/>
              </TouchableOpacity>
            ),
            headerTitle: () => (
              <Image 
              source={require('./assets/phab_pharma_no_text.png')}
              style={{width: headerHeight*0.64, height: headerHeight*0.84}}
              />
            ),
            headerTintColor: colours.LogoColours.green
          })}
        />
        <Stack.Screen 
        name="Cart" 
        component={CartScreen} 
        options={({ navigation }) => (
            {  
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: Dimensions.get('window').width*0.03, alignItems: 'center' }}
              >
                <FontAwesome name="chevron-left" size={30} color={colours.green}/>
              </TouchableOpacity>
            ),
            headerTitle: () => (
              <Image 
              source={require('./assets/phab_pharma_no_text.png')}
              style={{width: headerHeight*0.64, height: headerHeight*0.84}}
              />
            ),
            headerTintColor: colours.LogoColours.green
          })} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#DEDCD7',
  },
  imageStyle: {
    width: 29,
    height: 35,
  },
});
