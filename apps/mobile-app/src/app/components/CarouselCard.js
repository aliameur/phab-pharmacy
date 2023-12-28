import React, { useState } from 'react';
import { Button, FlatList, View, Text, StyleSheet, Dimensions } from 'react-native';
import colours from '../colours';

const CarouselItem = ({title}) => (
    <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    </View>
);


const styles = StyleSheet.create({
    item: {
      backgroundColor: colours.TailWindColors['norway'][200],
      padding: 20,
      marginBottom: 30,
      height: Dimensions.get('window').height * 0.5,
      marginRight: '15%',
    },
    title: {
      fontSize: 32,
    },
  });

export { CarouselItem }