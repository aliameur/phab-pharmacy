import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createCart, addToCart } from '../CartScripts';

jest.mock('axios'); 

const BASE_URL = 'https://phab-pharmacy-backend-ab775283aa48.herokuapp.com'; 


const mockCartResponse = {
  data: {
    cart: {
      id: 'mocked_cart_id',
    },
  },
};

const mockCustomerResponse = {
  data: {
    id: 'mocked_customer_id',
  },
};

const mockAsyncStorageData = {
    cartID: 'mocked_cart_id',
  };
  
const mockVariantId = 'mocked_variant_id';
const mockQuantity = 2;

describe('createCart', () => {

    afterEach(() => {
      jest.clearAllMocks(); // Clear mock function calls after each test
    });
  
    it('should create a cart and add a user to it', async () => {

        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      
        axios.post.mockResolvedValueOnce(mockCartResponse);
        axios.get.mockResolvedValueOnce(mockCustomerResponse);
        axios.post.mockResolvedValueOnce({});
    
        AsyncStorage.setItem.mockResolvedValueOnce();
        
        const creds = {
            username: 'test@example.com',
            password: 'password123',
        };
    
        await createCart(creds);
        
        expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/store/carts`, {
            sales_channel_id: 'sc_01HM54EQ2MEYDC0SF09624FJVW',
        });
    
        expect(AsyncStorage.setItem).toHaveBeenCalledWith('cartID', 'mocked_cart_id');
    
        expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/store/customers/me`, {
            headers: {
            Authorization: `Bearer ${creds.password}`,
            },
        });
    
        expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/store/carts/mocked_cart_id`, {
            customer_id: 'mocked_customer_id',
            email: creds.username,
        });
        
        expect(consoleLogSpy).toHaveBeenCalledWith('Cart created with', 'mocked_cart_id');
        expect(consoleLogSpy).toHaveBeenCalledWith('Added user to cart');

        consoleLogSpy.mockRestore();
    });
  
    it('should handle errors gracefully', async () => {

        const consoleLogError = jest.spyOn(console, 'error').mockImplementation();
      
        axios.post.mockRejectedValueOnce(new Error('Axios error'));
    
        
        const creds = {
            username: 'test@example.com',
            password: 'password123',
        };
    
        
        await createCart(creds);
    
        
        expect(consoleLogError).toHaveBeenCalledWith('Error in createCart function', expect.any(Error));

        consoleLogError.mockRestore();
    });
});

describe('addToCart', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should add an item to the cart', async () => {
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      
        AsyncStorage.getItem.mockResolvedValueOnce(mockAsyncStorageData.cartID);

        axios.post.mockResolvedValueOnce({});
    
        const result = await addToCart(mockVariantId, mockQuantity);
    
        expect(AsyncStorage.getItem).toHaveBeenCalledWith('cartID');
        expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/store/carts/${mockAsyncStorageData.cartID}/line-items`, {
            variant_id: mockVariantId,
            quantity: mockQuantity,
        });
    
        expect(consoleLogSpy).toHaveBeenCalledWith(mockVariantId, mockQuantity);
        expect(consoleLogSpy).toHaveBeenCalledWith('Item added to cart');
    
        expect(result).toBe(true);

        consoleLogSpy.mockRestore();
    });
  
    it('should handle errors gracefully', async () => {
        const consoleLogError = jest.spyOn(console, 'error').mockImplementation();

        AsyncStorage.getItem.mockRejectedValueOnce(new Error('AsyncStorage error'));
    
        const result = await addToCart(mockVariantId, mockQuantity);
    
        expect(AsyncStorage.getItem).toHaveBeenCalledWith('cartID');
    
        expect(consoleLogError).toHaveBeenCalledWith('Adding error', expect.any(Error));

        expect(result).toBe(false);
    });
  });