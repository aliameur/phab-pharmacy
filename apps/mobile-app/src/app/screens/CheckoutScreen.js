import { CardField, useStripe } from '@stripe/stripe-react-native';
import { setStripePaymentSession, completeCart } from '../scripts/PaymentsScripts';
import { View, Button } from "react-native";

export default function CheckoutScreen({ navigation }) {
    const { confirmPayment } = useStripe();

    const handlePayPress = async () => {
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
                navigation.replace('Shop');
            } 
            else{
                console.log('Failed');
            }
            
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
    </View>
  );
}