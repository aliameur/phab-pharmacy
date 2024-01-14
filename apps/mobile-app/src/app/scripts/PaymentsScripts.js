import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createCart } from './CartScripts'
import * as Keychain from 'react-native-keychain';

const BASE_URL = 'https://phab-pharmacy-backend-ab775283aa48.herokuapp.com';

const createPaymentSessions = async (cart_id) => {
    try {
        const response = await axios.post(`${BASE_URL}/store/carts/${cart_id}/payment-sessions`);
        return response.data.cart;
    } catch (error) {
        console.error('Error creating payment sessions:', error.response ? error.response.data : error.message);
    }
};

const setStripePaymentSession = async () => {
    const cart_id = await AsyncStorage.getItem('cartID');
    try {
        const cart = await createPaymentSessions(cart_id);
        const isStripeAvailable = cart.payment_sessions?.some(
            (session) => session.provider_id === "stripe"
        );

        if (!isStripeAvailable) {
            console.log("Stripe is not available");
            return;
        }

        const response = await axios.post(`${BASE_URL}/store/carts/${cart_id}/payment-session`, {
            provider_id: "stripe",
        });
        return response.data.cart.payment_session.data.client_secret;
    } catch (error) {
        console.error('Error setting Stripe payment session:', error.response ? error.response.data : error.message);
    }
};

const completeCart = async () => {
    const cart_id = await AsyncStorage.getItem('cartID');
    try {
        const response = await axios.post(`${BASE_URL}/store/carts/${cart_id}/complete`);
        console.log(response.data.type)
        if (response.data.type === 'order'){
            console.log('Sucessful Order', response.data)
            const creds = await Keychain.getGenericPassword({ service });
            await createCart(creds);
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        console.error('Error creating payment sessions:', error.response ? error.response.data : error.message);
    }
}

export {createPaymentSessions, setStripePaymentSession, completeCart};
