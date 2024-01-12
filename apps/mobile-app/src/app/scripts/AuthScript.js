import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { Platform } from 'react-native';
import { createCart } from './CartScripts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://phab-pharmacy-backend-ab775283aa48.herokuapp.com'
service = 'JWToken';

const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/store/auth/token`, {
      email: email,
      password: password,
    });
    const jwtToken = response.data.access_token;
    await Keychain.setGenericPassword(email, jwtToken, { service });
    const creds = await Keychain.getGenericPassword({ service });
    try {
      const cart = await AsyncStorage.getItem('cartID');
      if (cart) {
        console.log('Loaded cart: ', cart)
      }
      else {
        console.log('Failed to load cartID')
        await createCart(creds);
      }
    } catch (error) {
      console.log('Failed to load cart with error:', error)
      await createCart(creds);
    }
    return ['good', jwtToken];
  } catch (error) {
      if (error.response.data === 'Unauthorized') {
        return ['bad', 'Invalid Login Password']
      }
      else {
        return ['bad', error.response.data.message];
      }
    }
  };

const logout = async () => {
  try {
    token = await Keychain.getGenericPassword({ service });
    await AsyncStorage.removeItem('cartID');
    const response = await axios.delete(`${BASE_URL}/store/auth`, {
      headers: {
        Authorization: `Bearer ${token.password}`, // Replace {access_token} with the actual token
      },
    });
    console.log('Sucessful Logout');
  } catch (error) {
    console.error('Logout failed', error);
  } finally {
    await Keychain.resetGenericPassword({ service });
  }
};

const checkKeychain = async () => {
  try {
    const creds = await Keychain.getGenericPassword({ service });
    try {
      const config = {
        method: 'get',
        url: BASE_URL + '/store/auth',
        headers: {
          Authorization: `Bearer ${creds.password}`,
        },
      };
      const response = await axios(config);
      try {
        const cart = await AsyncStorage.getItem('cartID');
        console.log('cart', cart)
        if (cart) {
          console.log('Loaded cart: ', cart)
        }
        else {
          console.log('Failed to load cartID')
          await createCart(creds);
        }
      } catch (error) {
        console.log('Failed to load cart with error:', error)
        await createCart(creds);
      }
      return ['good', response.data];
    } catch (error) {
      return ['bad', error];
    }
  } catch (error) {
    return ['bad', error];
  }
};

const createUser = async (firstName, lastName, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/store/customers`, {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    });
    const creds = await Keychain.getGenericPassword({ service });
    await createCart(creds);
    return ['good', response.data];
  } catch (error) {
    return ['bad', error];
  }
};




export { login, logout, checkKeychain, createUser };
