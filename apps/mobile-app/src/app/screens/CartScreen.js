import { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { addToCart } from '../scripts/CartScripts';
import colours from '../colours';
import { ShopContext } from '../contexts/ShopContext';

function CartScreen({navigation, route }) {
    const { cartData, cartTotal, loadCartData, loadNumberCart, loadShippingAddress } = useContext(ShopContext);

    useEffect(() => {
        const getCartProducts = async () => {
            await loadShippingAddress();
            await loadCartData();
            await loadNumberCart();
        };  
        getCartProducts();
    }, []); 

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
        }).format(price / 100); 
    };

    const addItem = async (item) => {
        response = await addToCart(item.variant_id, 1);
        if (response){
            await loadCartData();
        } 
    }

    const minusItem = async (item) => {
        response = await addToCart(item.variant_id, 1);
        if (response){
            await loadCartData();
        } 
    }
    return (
        <View style={{flex: 1, justifyContent: 'flex-start', backgroundColor: 'white'}}>
            {cartData.length === 0 ? (
                    <Text style={{alignSelf: 'center', position: 'absolute', top: '30%', fontSize: 20, fontWeight: '600', textAlign: 'center'}}>It's lonely here add something to your cart</Text>
                ) : (
                    null
            )}
            <FlatList 
            style={styles.flatList}
            data={cartData}
            renderItem={({item}) => {
            return (
                <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 20, margin: 10, backgroundColor: colours.TailWindColors["mineral-green"][100], height: Dimensions.get('window').height * 0.15, alignItems: 'center', borderRadius: 15}}>
                    <Image 
                        source={{ uri: item.image }}
                        style={{ height: '70%', width: '70%', flex: 1.5, margin: 10 }}
                        resizeMode="cover"
                    />
                    <View style={{flex: 3, marginLeft: 5}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Text style={{fontSize: 20, flex: 5, color: colours.LogoColours.green}}>{item.title}</Text>
                        </View>
                        <View style={{flex: 0.5, flexDirection: 'row', justifyContent:'space-between', margin: 10}}>
                            <View style={{flexDirection: 'row', flex: 1}}>
                                <Text style={{color: colours.LogoColours.green, fontSize: 18, alignSelf: 'center'}}>x{item.quantity}</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}> 
                                    <TouchableOpacity style={{marginLeft: '20%', backgroundColor: colours.LogoColours.green, padding:'6%', borderRadius: 5}}>
                                        <FontAwesome size={15} color={colours.LogoColours.cream} name='minus'/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{marginLeft: '5%', backgroundColor: colours.LogoColours.green, padding:'6%', borderRadius: 5}}
                                        onPress={() => addItem(item)}
                                    >
                                        <FontAwesome size={15} color={colours.LogoColours.cream} name='plus'/> 
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <Text style={{flex: 1, color: colours.LogoColours.green, fontSize: 20, fontWeight: '500', alignSelf: 'center'}}>{formatPrice(item.total.toString())}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )}}
            keyExtractor={item => item.id}/>
            <View style={{flex: 0.15, justifyContent: 'center', alignItems:'center'}}>
                {cartData.length === 0 ? (
                        null
                    ) : (
                        <TouchableOpacity style={{backgroundColor: colours.TailWindColors["mineral-green"][600], width: '90%', height: '70%', borderRadius: 15, justifyContent:'center', alignItems: 'center'}}
                        onPress={() => navigation.navigate('Checkout')}
                        >
                        <Text style={{color: colours.LogoColours.cream, fontSize: 27, fontWeight: "500"}}>Pay via Card - {formatPrice(cartTotal.toString())}</Text>
                        </TouchableOpacity>
                )}
            </View>
            <View style={{flex: 0.15, justifyContent: 'center', alignItems:'center'}}>
                <TouchableOpacity style={[{width: '90%', height: '70%', borderRadius: 15, justifyContent:'center', alignItems: 'center'}, cartData.length === 0 ? { backgroundColor: colours.TailWindColors.norway[200] } : {}]}
                onPress={() => navigation.goBack()}
                >
                    <Text style={{fontSize: 20}}>Continue Shopping</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  flatList: {
    flex: 10,
  },
});

export default CartScreen;
