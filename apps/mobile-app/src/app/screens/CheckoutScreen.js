import { CardField, useStripe } from '@stripe/stripe-react-native';
import { setStripePaymentSession, completeCart } from '../scripts/PaymentsScripts';
import { getShippingAddress } from '../scripts/ShopScript';
import { View, Button, ActivityIndicator, Text, TouchableOpacity, FlatList } from "react-native";
import { ShopContext } from '../contexts/ShopContext';
import { useState, useContext } from 'react';
import colours from '../colours';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ShippingSheet from '../components/ShippingSheet';

export default function CheckoutScreen({ navigation }) {
    const { confirmPayment } = useStripe();
    const { loadNumberCart, loadCartData, cartTotal, shipping_addresses } = useContext(ShopContext);
    const [loadingPayment, setPaymenetLoading] = useState(false);
    const [isShippingMenuVisbile, setShippingMeuVisible] = useState(false);
    const [checkedID, setCheckedID] = useState(null);
    const [shippingData, setShippingData] = useState(null);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
        }).format(price / 100);
    };

    const handleShippingAddPress = () => {
        setShippingMeuVisible(true);
    }

    const hideShippingSheet = () => {
        setShippingMeuVisible(false);
    }

    const handlePayPress = async () => {
        if (shippingData) {
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
        }
        
    };

  return (
    <View style={{flex: 1, marginTop: 20, marginHorizontal: 20}}>
        <View style={{flex: 1}}>
            <View>
                <Text>Total price</Text>
                <Text style={{fontSize: 30, color: colours.LogoColours.green, fontWeight: '700', marginBottom: 10}}>{formatPrice(cartTotal)}</Text>  
                <Text style={{fontSize: 20, fontWeight: '400'}}>Shipping Address</Text>
            </View>
        </View>
        <View style={{flex: 6, marginTop: 50}}>
            <View style={{flex: 1}}>
                {shipping_addresses.length != 0 ? (
                    null
                ) : (
                    <Text>Not much going on here, click below to add an account</Text>
                )}
                <FlatList
                style={{flex: 10}}
                    data={shipping_addresses}
                    renderItem={({item, index}) => {
                        return (
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flex: 7}}>
                                    <Text>{item.first_name}</Text>
                                    <Text>{item.last_name}</Text>
                                    <Text>{item.address_1}</Text>
                                    <Text>{item.city}</Text>
                                    <Text>{item.postal}</Text>
                                </View>
                                    {(index === checkedID) ? (
                                        <TouchableOpacity style={{flex: 1, alignSelf: 'center', borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: colours.TailWindColors['mineral-green'][200]}}
                                        onPress={() => setShippingData(item)}
                                        >
                                        <FontAwesome size={30} color={colours.LogoColours.green} name='check'/>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity style={{flex: 1, alignSelf: 'center', borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: colours.TailWindColors['mineral-green'][200]}}
                                        onPress={() => setShippingData(item)}
                                        >
                                        <FontAwesome size={30} color={colours.LogoColours.green} name='plus'/>
                                        </TouchableOpacity>
                                    )}
                            </View>
                        )}}
                /> 
                <TouchableOpacity style={{flex: 0.23,  backgroundColor:  colours.TailWindColors["mineral-green"][200], borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => handleShippingAddPress()}>
                    <FontAwesome name='plus' color={colours.LogoColours.green} size={40}/>
                    <Text>Add new address</Text>
                </TouchableOpacity>
                {isShippingMenuVisbile ? (<ShippingSheet onClose={hideShippingSheet} visible={isShippingMenuVisbile}/>) : null}
            </View>
        </View>
        <CardField
            postalCodeEnabled={false}
            placeholders={{
            number: '4242 4242 4242 4242',
            }}
            cardStyle={{
            backgroundColor: colours.LogoColours.cream,
            textColor: colours.TailWindColors['mineral-green'][600]
            }}
            style={{
                height: '10%',
                alignSelf: 'center',
                width: '100%',
                marginVertical: 10,
            }}
        />
        <View style={{flex: 2, justifyContent: 'center'}}>
            <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={() => handlePayPress()}
            >
                <Text>Pay {formatPrice(cartTotal)}</Text>
            </TouchableOpacity>
            { loadingPayment && <ActivityIndicator size={'large'}/>}
        </View>
    </View>
  );
}