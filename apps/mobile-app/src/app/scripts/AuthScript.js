import axios from 'axios';
import * as Keychain from 'react-native-keychain';

const BASE_URL = 'http://localhost:9000';
service = 'JWToken';

const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/store/auth/token`, {
      email: email,
      password: password,
    });

    const jwtToken = response.data.access_token;
    await Keychain.setGenericPassword('UserToken', jwtToken, { service });

    return ['good', jwtToken];
  } catch (error) {
    console.error('Login failed', error);
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
    await Keychain.resetGenericPassword({ service });
    console.log('Sucessful Logout');
  } catch (error) {
    console.error('Logout failed', error);
    throw error;
  }
};

const checkKeychain = async () => {
  try {
    const creds = await Keychain.getGenericPassword({ service });
    console.log('Creds', creds.password);
    try {
      const config = {
        method: 'get',
        url: BASE_URL + '/store/auth',
        headers: {
          Authorization: `Bearer ${creds.password}`,
        },
      };
      const response = await axios(config);
      console.log(response);
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
    return ['good', response.data];
  } catch (error) {
    return ['bad', error];
  }
};

export { login, logout, checkKeychain, createUser };
