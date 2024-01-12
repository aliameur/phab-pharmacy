import { CardField, useStripe } from '@stripe/stripe-react-native';
import { setStripePaymentSession, completeCart } from '../scripts/PaymentsScripts';
import { View, Button, ActivityIndicator } from "react-native";
import { ShopContext } from '../contexts/ShopContext';
import { useState, useContext } from 'react';

export default function CheckoutScreen({ navigation }) {
    const { confirmPayment } = useStripe();
    const { loadNumberCart, loadCartData} = useContext(ShopContext);
    const [loadingPayment, setPaymenetLoading] = useState(false);

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
    <View>
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
      />
      <Button title="Pay" onPress={() => handlePayPress()} />
      { loadingPayment && <ActivityIndicator size={'large'}/>}
    </View>
  );
}