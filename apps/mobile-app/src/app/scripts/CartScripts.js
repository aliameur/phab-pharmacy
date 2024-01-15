import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { removeCartLineItem, updateCartLineItem } from '@phab/data-react-native';

const BASE_URL = 'https://phab-pharmacy-backend-ab775283aa48.herokuapp.com';

const createCart = async (creds) => {
    try {
      const cartResponse = await axios.post(`${BASE_URL}/store/carts`, {
          sales_channel_id: 'sc_01HM54EQ2MEYDC0SF09624FJVW'
      });
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
    console.log(varient_id, quantity)
    const cart_id = await AsyncStorage.getItem('cartID');
    console.log(cart_id)
    response = await axios.post(
      `${BASE_URL}/store/carts/${cart_id}/line-items`,
      {
        variant_id: varient_id,
        quantity: quantity,
      },
    );
    console.log('Item added to cart');
    return true;
  } catch (error) {
    console.error('Adding error', error);
    return false;
  }
};

const addAnotherItemToCart = async (item) => {
  const cart_id = await AsyncStorage.getItem('cartID');
  try { 
    response = await updateCartLineItem({cartId: cart_id, lineId: item.id, quantity: item.quantity+1});
  }
  catch (error) {
    console.log('Error removing from cart: ', error)
  }
}

const minusFromCart = async (item) => {
  const cart_id = await AsyncStorage.getItem('cartID');
  try { 
    response = await updateCartLineItem({cartId: cart_id, lineId: item.id, quantity: item.quantity-1});
  }
  catch (error) {
    console.log('Error removing from cart: ', error)
  }
}

const getCartItemNumber = async () => {
  try {
    const cart_id = await AsyncStorage.getItem('cartID');
    response = await axios.get(`${BASE_URL}/store/carts/${cart_id}`);
    count = 0;
    num = response.data['cart']['items'].length;
    for (let i = 0; i < num; i++) {
      count += response.data['cart']['items'][i]['quantity'];
    }
    return count;
  } catch (error) {
      console.error('Error getting number of cart items:')
  }
};

const getCartItems = async () => {
  try {
    const cart_id = await AsyncStorage.getItem('cartID');
    response = await axios.get(`${BASE_URL}/store/carts/${cart_id}`);
    items = response.data['cart']['items'];
    var products = [];
    for (let i = 0; i < items.length; i++) {
      products.push({
        id: items[i]['id'],
        title: items[i]['title'],
        description: items[i]['description'],
        image: items[i]['thumbnail'],
        variant_id: items[i]['variant_id'],
        quantity: items[i]['quantity'],
        total: items[i]['total'],
      });
    }
    return [products, response.data['cart']['total']];
  } catch (error) {
    console.error('Error getting cart items:', error.message);
  }
};

export { createCart, addToCart, getCartItems, getCartItemNumber, minusFromCart, addAnotherItemToCart };
