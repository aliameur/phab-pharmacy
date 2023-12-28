import React, { useState, useEffect } from 'react';
import { Button, FlatList, View, Text, StyleSheet, StatusBar, Dimensions } from 'react-native';
import colours from '../colours';
import Voice from '@react-native-voice/voice';
import UserMenuSheet from '../components/UserMenuSheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getCollections } from '../scripts/ShopScript';
import { CarouselItem } from '../components/CarouselCard';
import ShopCarousel from '../components/ShopCarousel';


function ShopScreen({ navigation }) {

    const [isMenuModalVisible, setMenuModalVisible] = useState(false);
    const [collectionsData, setCollectionsData] = useState([])

    useEffect(() => {
        const getData = async () => {
            const collection_data = await getCollections();
            setCollectionsData(collection_data);
        };
        getData();
    }, []); 

    const showModal = () => setMenuModalVisible(true);
    useEffect(() => {
        navigation.setParams({ showModal: () => setMenuModalVisible(true) });
    }, [navigation]);

    const hideUserSheet = () => {
        setMenuModalVisible(false);
    }

    const getNumOfCollections = async () => {
        collections = await getCollections();
        return collections.length;
    }

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <View style={{height: Dimensions.get('window').height * 0.5}}></View>
                }
                data={collectionsData}
                renderItem={({item}) => <ShopCarousel style={styles.shopCarousel} id={item.id} /> }
                keyExtractor={item => item.id}
            />
            {isMenuModalVisible ? (<UserMenuSheet onClose={hideUserSheet} visible={isMenuModalVisible} navigation={navigation}/>) : null}
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    shopCarousel: {
        marginBottom: 10,
    }
  });

export default ShopScreen