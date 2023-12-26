import * as Keychain from 'react-native-keychain';
import axios from 'axios';

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
    await Keychain.resetGenericPassword({ service });
  } catch (error) {
    console.error('Logout failed', error);
    throw error;
  }
};

const checkKeychain = async () => {
    try{
        creds = await Keychain.getGenericPassword( { service } )
        return ['good', creds]
    } catch (error){
        return ['bad', error]
    }
}


export { login, logout, checkKeychain };