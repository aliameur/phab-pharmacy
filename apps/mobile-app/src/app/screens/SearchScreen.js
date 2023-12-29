import React, { useState, useEffect } from 'react';
import { Button, FlatList, View, Text, StyleSheet, StatusBar, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import {searchProducts} from '../scripts/ShopScript';

function ShopScreen({ navigation, route }){
    const [products, setProducts] = useState([]); 

    useEffect(() => {
        const getData = async () => {
            const search = route.params?.search; 
            console.log(await searchProducts(search));
        };

        if (route.params?.search) {
            getData();
        }
    }, [route.params?.search]);

    return(
        <View>
            <Text>{products}</Text>
        </View>
    )
}

export default ShopScreen