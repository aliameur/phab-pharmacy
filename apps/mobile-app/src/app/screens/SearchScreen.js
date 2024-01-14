import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { searchProducts } from '../scripts/ShopScript';

function ShopScreen({ navigation, route }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const search = route.params?.search;
      response = await searchProducts(search);
    };

    if (route.params?.search) {
      getData();
    }
  }, [route.params?.search]);

  return (
    <View>
      <Text>{products}</Text>
    </View>
  );
}

export default ShopScreen;
