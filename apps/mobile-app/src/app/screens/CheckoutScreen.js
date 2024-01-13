import { CardField, useStripe } from '@stripe/stripe-react-native';
import { setStripePaymentSession, completeCart } from '../scripts/PaymentsScripts';
import { getShippingAddress } from '../scripts/ShopScript';
import { View, Button, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { ShopContext } from '../contexts/ShopContext';
import { useState, useContext } from 'react';
import colours from '../colours';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function CheckoutScreen({ navigation }) {
    const { confirmPayment } = useStripe();
    const { loadNumberCart, loadCartData, cartTotal, shipping_addresses } = useContext(ShopContext);
    const [loadingPayment, setPaymenetLoading] = useState(false);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
        }).format(price / 100);
    };

    const handlePayPress = async () => {
        setPaymenetLoading(true);
        const billingDetails = {
            email: 'jenny.rosen@example.com',
        };
        const clientSecret = await setStripePaymentSession();
        const {paymentIntent, error} = await confirmPayment(clientSecret, {
            paymentMethodType: 'Card',
            paymentMethodData: {
              billingDetails,
            },
          });
      
          if (error) {
            console.log('Payment confirmation error', error);
          } else if (paymentIntent) {
            response = await completeCart();
            if (response){
                console.log('Success from payment process');
                await loadNumberCart();
                await loadCartData();
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'PaymentSuccess' }],
                });
            } 
            else{
                console.log('Failed');
            }
        setPaymenetLoading(false);
        }
    };

  return (
    <View style={{flex: 1}}>
        <View style={{flex: 1}}>
            <View style={{margin: '5%'}}>
                <Text>Total price</Text>
                <Text style={{fontSize: 30, color: colours.LogoColours.green, fontWeight: '700', marginBottom: 10}}>{formatPrice(cartTotal)}</Text>  
                <Text style={{fontSize: 20, fontWeight: '400'}}>Shipping Address</Text>
            </View>
        </View>
        <View style={{margin: '5%', flex: 2}}>
            <View>
                {shipping_addresses.length != 0 ? (
                    <Text>Full</Text>
                ) : (
                    <TouchableOpacity style={{backgroundColor:  colours.TailWindColors["mineral-green"][200], borderRadius: 10, justifyContent: 'center', alignItems: 'center', height: '50%'}}
                        onPress={() => navigation.navigate('Shipping')}
                    >
                        <FontAwesome name='plus' color={colours.LogoColours.green} size={40}/>
                        <Text>Add new address</Text>
                    </TouchableOpacity>
                )}
                <Button onPress={() => getShippingAddress()} title={shipping_addresses.toString()}/>
            </View>
        </View>
        <CardField
            postalCodeEnabled={false}
            placeholders={{
            number: '4242 4242 4242 4242',
            }}
            cardStyle={{
            backgroundColor: colours.LogoColours.cream,
            textColor: colours.LogoColours.green
            }}
            style={{
                height: '10%',
                alignSelf: 'center',
                width: '90%',
                marginVertical: 10,
            }}
        />
        <View style={{flex: 2, justifyContent: 'center'}}>
            <Button title="Pay" onPress={() => handlePayPress()} />
            { loadingPayment && <ActivityIndicator size={'large'}/>}
        </View>
    </View>
  );
}