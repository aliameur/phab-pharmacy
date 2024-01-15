import axios from 'axios';
import { login, logout, createUser } from '../AuthScript'
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://phab-pharmacy-backend-ab775283aa48.herokuapp.com';

jest.mock('axios');
const createCart = jest.fn();

describe('login', () => {
    it('should return ["good", jwtToken] on successful login', async () => {
        const email = 'test@example.com';
        const password = 'Password';

      axios.post.mockResolvedValue({ data: { access_token: 'mockedToken' } });

      const result = await login(email, password);

      expect(result).toEqual(['good', 'mockedToken']);
    });
  
    it('should return ["bad", "Invalid Login Password"] on unauthorized login', async () => {
      const email = 'test@example.com';
      const password = 'invalidPassword';
  
      axios.post.mockRejectedValue({ response: { data: 'Unauthorized' } });
  
      const result = await login(email, password);

      expect(result).toEqual(['bad', 'Invalid Login Password']);
    });
  
    it('should return ["bad", errorMessage] on other errors during login', async () => {
      const email = 'test@example.com';
      const password = 'password';
  
      axios.post.mockRejectedValue({ response: { data: { message: 'Some error message' } } });
  
      const result = await login(email, password);
  
      expect(result).toEqual(['bad', 'Some error message']);
    });
  });

describe('logout function', () => {
    const mockService = 'JWToken';
    const mockToken = { password: 'mockToken' };
  
    beforeEach(() => {
      Keychain.getGenericPassword.mockResolvedValue(mockToken);
      AsyncStorage.removeItem.mockResolvedValue(null);
      axios.delete.mockResolvedValue({ data: 'Success' });
      Keychain.resetGenericPassword.mockResolvedValue(null);
    });
  
    it('should handle successful logout', async () => {
      await logout();
      expect(Keychain.getGenericPassword).toHaveBeenCalledWith({ service: mockService });
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('cartID');
      expect(axios.delete).toHaveBeenCalledWith(`${BASE_URL}/store/auth`, {
        headers: {
          Authorization: `Bearer ${mockToken.password}`,
        },
      });
      expect(Keychain.resetGenericPassword).toHaveBeenCalledWith({ service: mockService });
    });
  });

  describe('createUser', () => {
    const mockResponseData = { id: 123, name: 'John Doe' };
    const mockCreds = { username: 'user', password: 'pass' };
  
    beforeEach(() => {
      axios.post.mockResolvedValue({ data: mockResponseData });
      Keychain.getGenericPassword.mockResolvedValue(mockCreds);
      createCart.mockResolvedValue('Cart Created');
    });
  
    it('handles error in user creation', async () => {
      const errorMessage = 'Error creating user';
      axios.post.mockRejectedValue(new Error(errorMessage));
  
      const result = await createUser('John', 'Doe', 'john.doe@example.com', 'password123');
  
      expect(result[0]).toBe('bad');
      expect(result[1]).toBeInstanceOf(Error);
      expect(result[1].message).toBe(errorMessage);
    });
  });
