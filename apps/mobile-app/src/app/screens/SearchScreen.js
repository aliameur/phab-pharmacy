import React, { useState, useEffect } from 'react';
import { Button, FlatList, View, Text, StyleSheet, StatusBar, Dimensions, TextInput, TouchableOpacity } from 'react-native';

function ShopScreen({ navigation, route }){
    const search = route.params?.search;
    return(
        <View>
            <Text>{search}</Text>
        </View>
    )
}

export default ShopScreen