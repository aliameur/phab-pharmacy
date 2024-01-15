import { CardField, useStripe } from '@stripe/stripe-react-native';
import { setStripePaymentSession, completeCart } from '../scripts/PaymentsScripts';
import { addShippingAddressToOrder } from '../scripts/ShopScript';
import { View, Keyboard, ActivityIndicator, Text, TouchableOpacity, FlatList, TouchableWithoutFeedback } from "react-native";
import { ShopContext } from '../contexts/ShopContext';
import { useState, useContext, useEffect } from 'react';
import colours from '../colours';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ShippingSheet from '../components/ShippingSheet';
import { KeyboardAvoidingView } from 'react-native';

export default function CheckoutScreen({ navigation }) {
    const { confirmPayment } = useStripe();
    const { loadNumberCart, loadCartData, cartTotal, shipping_addresses } = useContext(ShopContext);
    const [loadingPayment, setPaymenetLoading] = useState(false);
    const [isShippingMenuVisbile, setShippingMeuVisible] = useState(false);
    const [checkedID, setCheckedID] = useState(null);
    const [shippingData, setShippingData] = useState(null);
    const [paymentFail, setPaymentFail] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            setKeyboardVisible(true);
        }
        );
        const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setKeyboardVisible(false);
        }
        );

        // Clean up function
        return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
        };
    }, []);

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
            response = await addShippingAddressToOrder(shippingData);
            if (response) {
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
            } else {
                setPaymentFail(true);
                setPaymenetLoading(false);
            }
        }
        
    };

  return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 40}
        style={{flex: 1, marginTop: 20, marginHorizontal: 20}}>
            <View>
                <View>
                    <Text>Total price</Text>
                    <Text style={{fontSize: 30, color: colours.LogoColours.green, fontWeight: '700', marginBottom: 0}}>{formatPrice(cartTotal)}</Text>  
                    <Text style={{fontSize: 20, fontWeight: '400'}}>Choose a Shipping Address: </Text>
                </View>
            </View>
            <View style={{height: '40%'}}>
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
                                <View style={{flexDirection: 'row', marginBottom: '5%'}}>
                                    <View style={{flex: 7}}>
                                        <Text>{item.first_name}</Text>
                                        <Text>{item.last_name}</Text>
                                        <Text>{item.address_1}</Text>
                                        <Text>{item.city}</Text>
                                        <Text>{item.postal_code}</Text>
                                    </View>
                                        {(index === checkedID) ? (
                                            <TouchableOpacity style={{flex: 1, alignSelf: 'center', borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: colours.TailWindColors['mineral-green'][200]}}
                                            onPress={() => {
                                                setShippingData(item)
                                                setCheckedID(index)
                                            }}
                                            >
                                            <FontAwesome size={30} color={colours.LogoColours.green} name='check'/>
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity style={{flex: 1, alignSelf: 'center', borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: colours.TailWindColors['mineral-green'][200]}}
                                            onPress={() => {
                                                setShippingData(item)
                                                setCheckedID(index)
                                            }}
                                            >
                                            <FontAwesome size={30} color={colours.LogoColours.green} name='plus'/>
                                            </TouchableOpacity>
                                        )}
                                </View>
                            )}}
                    /> 
                    {!isKeyboardVisible ? (<TouchableOpacity style={{height: '25%', minHeight: '25%', marginTop: '5%', paddingVertical: 5, backgroundColor:  colours.TailWindColors["mineral-green"][200], borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => handleShippingAddPress()}>
                        <FontAwesome name='plus' color={colours.LogoColours.green} size={40}/>
                        <Text>Add new address</Text>
                    </TouchableOpacity>) : (null)}
                    {isShippingMenuVisbile ? (<ShippingSheet onClose={hideShippingSheet} visible={isShippingMenuVisbile}/>) : null}
                </View>
            </View>
            <Text style={{marginTop: '5%'}}>Add Card Details: </Text>
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
            <View style={{justifyContent: 'flex-start'}}>
                <TouchableOpacity
                    style={{justifyContent: 'center', alignItems: 'center', backgroundColor: colours.TailWindColors['mineral-green'][600], height: '30%', borderRadius: 15}}
                    onPress={() => handlePayPress()}>
                    <Text style={{color: colours.LogoColours.cream, fontSize: 20}}>Pay {formatPrice(cartTotal)}</Text>
                </TouchableOpacity>
                { loadingPayment && <ActivityIndicator size={'large'}/>}
            </View>
    </KeyboardAvoidingView>
  );
}