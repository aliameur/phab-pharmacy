import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = Platform.OS === 'ios' ? 'http://localhost:9000' : 'http://10.0.2.2:9000'; 
service = 'JWToken';
const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/store/auth/token`, {
      email: email,
      password: password,
    });
    const jwtToken = response.data.access_token;
    await Keychain.setGenericPassword(email, jwtToken, { service });
    await createCart(creds);
    return ['good', jwtToken];
  } catch (error) {
      console.error('Login failed', error)
      return ['bad', error];
    }
  };

const logout = async () => {
  try {
    token = await Keychain.getGenericPassword({ service });
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
      await createCart(creds);
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
    await createCart(creds);
    return ['good', response.data];
  } catch (error) {
    return ['bad', error];
  }
};

const createCart = async (creds) => {
  try {
    // Create a new cart
    const cartResponse = await axios.post(`${BASE_URL}/store/carts`);
    const cart_id = cartResponse.data.cart.id;
    await AsyncStorage.setItem('cartID', cart_id);
    console.log('Cart created with', cart_id);

    // Get customer ID
    const customerResponse = await axios.get(`${BASE_URL}/store/customers/me`, {
      headers: {
        'Authorization': `Bearer ${creds.password}` // Make sure this is a token, not a password
      }
    });
    const customer_id = customerResponse.data.id; // Adjust this according to the actual response structure

    const updateResponse = await axios.post(`${BASE_URL}/store/carts/${cart_id}`, {
      customer_id: customer_id,
      email: creds.username
    });
    console.log('Added user to cart');
    
  } catch (error) {
    console.error('Error in createCart function', error);
  }
};


export { login, logout, checkKeychain, createUser };
