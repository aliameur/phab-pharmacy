import React, { useState, useEffect, useContext } from 'react';
import { Button, FlatList, View, Image, Text, StyleSheet, StatusBar, Dimensions, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { searchProducts } from '../scripts/ShopScript';
import colours from '../colours';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { addToCart } from '../scripts/CartScripts';
import { CartContext } from '../contexts/CartContext';


function ProductScreen({ route }) {
    const { data } = route.params;
    const { loadNumberCart } = useContext(CartContext);
    const addItemToCart = async (variant_id, quantity) => {
        console.log('Staring adding')
        response = await addToCart(variant_id, quantity);
        if (response) {
            try {
                await loadNumberCart();
            }
            catch (error) {
                console.log(error)
            }
        }
    }
    return ( 
        <SafeAreaView style={{flex: 1, justifyContent: 'center', 'backgroundColor': colours.LogoColours.cream}}>
            <View style={styles.halfBackground}/>
            <View style={{flex: 1, marginLeft: 20, marginTop: 20}}>
                <Text style={{color: colours.LogoColours.cream, fontSize: 30}}>{data.title}</Text>
            </View>
            <View style={{flex: 4, margin: 20, backgroundColor: 'white', borderRadius: 30, justifyContent: 'center'}}>
                <Image 
                    source={{uri: data.image, height: '90%'}}
                    resizeMode="contain"
                />
            </View>
            <View style={{flex: 2, alignSelf: 'center', justifyContent: 'flex-start'}}> 
                <Text style={{fontSize: 20, fontWeight: '600', marginHorizontal: 10}}>{data.description}</Text>
                <View style={{alignItems: 'center', alignSelf: 'center', flexDirection: 'row', marginTop: 5}}> 
                    <Text style={{fontWeight: '700', fontSize: 20, color: colours.TailWindColors.pampas[900]}}>Price: </Text>
                    <Text style={{fontSize: 20, color: colours.TailWindColors.pampas[900]}}>£{data.price.toString().slice(0,2)}.{data.price.toString().slice(2,4)}</Text>
                </View>
            </View>
            <View style={{flex: 1, marginBottom: 10}}>
                <TouchableOpacity style={{backgroundColor: colours.LogoColours.green, width: '40%', height: '70%', alignSelf: 'center', justifyContent: 'center', borderRadius: 10}}
                    onPress={() => addItemToCart(data.variant_id, 1)}
                >
                        <View style={{alignItems: 'center', alignSelf: 'center', flexDirection: 'row'}}>
                            <Text style={{color: colours.LogoColours.cream, alignContent: 'center'}}>Add to Cart</Text>
                            <FontAwesome 
                            name="shopping-cart"
                            style={{marginLeft: 10}}
                            color={colours.LogoColours.cream}
                            size={30}/>
                        </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({
    halfBackground: {
        position: 'absolute',
        top: 0,
        bottom: '70%', // Adjust this value to change where the color cuts
        left: 0,
        right: 0,
        backgroundColor: colours.LogoColours.green, // Your choice of color
    },
});

export default ProductScreen