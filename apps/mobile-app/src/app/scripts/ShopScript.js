import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import {getProductsByCategoryHandle, getCategories } from '@phab/data-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

service = 'JWToken';
const BASE_URL = 'https://phab-pharmacy-backend-ab775283aa48.herokuapp.com';

const getStoreCategories = async () => {
  data = await getCategories();
  var categories = [];
  num = data.length;
  for (let i = 0; i < num; i++) {
    categories.push({
      id: data[i]['id'],
      handle: data[i]['handle'],
      title: data[i]['name'],
    });
  }
  return categories;
};

const getStoreProducts = async (handle) => {
  data = await getProductsByCategoryHandle(handle);
  num = data.length;
  var products = [];
  for (let i = 0; i < num; i++) {
    products.push({
      id: data[i]['id'],
      title: data[i]['title'],
      description: data[i]['description'],
      image: data[i]['thumbnail'],
      //Note this price is hard coded changes to the backend will cause a breaking bug for pricing
      price: data[i]['variants'][0]['prices'][0]['amount'],
      variant_id: data[i]['variants'][0]['id'],
    });
  }
  return products;
};

const searchProducts = async (searchText) => {
    try {
        response = await axios.post(`${BASE_URL}/store/products/search`, {
            q: searchText
        });
        console.log(response)
        return response;
    } catch (error) {
        console.log('Error: ', error)
        return [];
    }
}

const getShippingAddress = async () => {
    const creds = await Keychain.getGenericPassword({ service });
    try {
        const config = {
          method: 'get',
          url: BASE_URL + '/store/customers/me',
          headers: {
            Authorization: `Bearer ${creds.password}`,
          },
        };
        const response = await axios(config);
        return response.data.customer.shipping_addresses
    } catch (e){
        console.log('Address error: ', e);
    }
}

const addShippingAddress = async (first_name, last_name, address, city, postal) => {
    const creds = await Keychain.getGenericPassword({ service });
    const addressData = {
        address: {
          first_name: first_name,
          last_name: last_name,
          address_1: address,
          city: city,
          country_code: "GB",
          postal_code: postal,
        }
    };
    try {
        const response = await axios.post(`${BASE_URL}/store/customers/me/addresses`, addressData, {
            headers: {
                'Authorization': `Bearer ${creds.password}`,
                'Content-Type': 'application/json'
            }
        })
    } catch (error){
        console.log('Error', error)
        return false
    }
    console.log('Address added successfully to User');
    return true
}

const addShippingAddressToOrder = async (address) => {
    const cart_id = await AsyncStorage.getItem('cartID');
    try {
        const response = await axios.post(`${BASE_URL}/store/carts/${cart_id}`, {
            shipping_address: {
                first_name: address.first_name,
                last_name: address.last_name,
                address_1: address.address_1,
                city: address.city,
                country_code: address.country_code,
                postal_code: address.postal_code
            }
        })
    } catch (error){
        console.log('Error Adding Shipping to Order', error.response.data.message)
        return false
    }
    console.log('Shipping Address added to Cart');
    return true
}



export { getStoreCategories, getStoreProducts, searchProducts, getShippingAddress, addShippingAddress, addShippingAddressToOrder };