import React, { useEffect, useState, useContext } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { addToCart } from '../scripts/CartScripts';
import { searchProducts, getProductByHandler } from '../scripts/ShopScript';
import colours from '../colours';
import { ShopContext } from '../contexts/ShopContext';


function ShopScreen({ navigation, route }) {
  const { loadNumberCart, loadCartData } = useContext(ShopContext);
  const [products, setProducts] = useState([]);

  const addItemToCart = async (handle) => {
    item = await getProductByHandler(handle);
    response = await addToCart(item['variants'][0]['id'], 1);
    if (response) {
        try {
            await loadNumberCart();
            await loadCartData();
        }
        catch (error) {
            console.log(error)
        }
    }
  }

  useEffect(() => {
    const getData = async () => {
      const search = route.params?.search;
      response = await searchProducts(search);
      setProducts(response)
    };

    if (route.params?.search) {
      getData();
    }
  }, [route.params?.search]);



  return (
    <View style={{flex: 1}}>
      <FlatList
        data={products}
        renderItem={({ item }) => {
          return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 10, marginTop: '10%'}}>
              <Text style={{flex: 1, fontSize: 20, fontWeight: '400', color: colours.LogoColours.green}}>{item.title}</Text>
              <Image 
                  source={{ uri: item.thumbnail }}
                  style={{ height: 100, width: 100 }}
                  resizeMode="contain"
                  onError={(e) => { console.log(e.nativeEvent.error); }}
              />
              <Text style={{textAlign: 'center', marginBottom: 10}}>{item.description}</Text>
              <TouchableOpacity style={{height: '20%', width: '70%', borderRadius: 15, backgroundColor: colours.LogoColours.green, alignItems:'center', justifyContent:'center'}}
                onPress={() => addItemToCart(item.handle)}
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
          )
        }}
      />
    </View>
  );
}

export default ShopScreen;
