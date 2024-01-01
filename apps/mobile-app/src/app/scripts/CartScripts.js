import { Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = Platform.OS === 'ios' ? 'http://localhost:9000' : 'http://10.0.2.2:9000'; 

const createCart = async (creds) => {
    try {
      const cartResponse = await axios.post(`${BASE_URL}/store/carts`);
      const cart_id = cartResponse.data.cart.id;
      await AsyncStorage.setItem('cartID', cart_id);
      console.log('Cart created with', cart_id);
  
      const customerResponse = await axios.get(`${BASE_URL}/store/customers/me`, {
        headers: {
          'Authorization': `Bearer ${creds.password}` 
        }
      });
      const customer_id = customerResponse.data.id; 
  
      const updateResponse = await axios.post(`${BASE_URL}/store/carts/${cart_id}`, {
        customer_id: customer_id,
        email: creds.username
      });
      console.log('Added user to cart');
      
    } catch (error) {
      console.error('Error in createCart function', error);
    }
  };

const addToCart = async (varient_id, quantity) => {
    try {
        const cart_id = await AsyncStorage.getItem('cartID');
        response = await axios.post(`${BASE_URL}/store/carts/${cart_id}/line-items`, {
            variant_id: varient_id,
            quantity: quantity
        })
        console.log('Item added to cart')
    } catch (error) {
        console.error('Adding error', error.message)
    }
  }

const getCartItems = async () => {
    try {
        const cart_id = await AsyncStorage.getItem('cartID');
        response = await axios.get(`${BASE_URL}/store/carts/${cart_id}`)
        items = response.data['cart']['items']
        var products = []
        for (let i = 0; i < (items.length); i++){
            products.push({
                id: items[i]["id"], 
                title: items[i]["title"], 
                description: items[i]["description"],
                image: items[i]["thumbnail"],
                variant_id: items[i]["variant_id"],
                quantity: items[i]["quantity"],
                total: items[i]["total"]
                //Note this price is hard coded changes to the backend will cause a breaking bug for pricing 
            })
        }
        return products
    } catch (error) {
        console.error('Error getting cart items:', error.message)
    }
}


  export { createCart, addToCart, getCartItems };