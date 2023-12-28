import React, { useState, useEffect } from 'react';
import { Button, FlatList, View, Text, StyleSheet, StatusBar, Dimensions, TextInput, TouchableOpacity } from 'react-native';
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
            setCollectionsData(collection_data.reverse());
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
                    <View style={{height: Dimensions.get('window').height * 0.6, alignItems: 'center'}}>
                        <Text style={{flex: 1, marginTop: 30}}>Your One-Stop Online Wellness Shop</Text>
                        <Text style={{flex: 1}}>Find all your healthcare needs with ease. Just type and search below.</Text>
                        <View style={{flexDirection: 'row', flex: 4, justifyContent: 'center', alignItems: 'center'}}>
                            <TextInput
                            fontSize={20}
                            style={{backgroundColor: 'white', height: '25%', width: '70%', paddingLeft: 10}}
                            placeholder='What are you looking for?'/>
                            <TouchableOpacity style={{backgroundColor: colours.LogoColours.green, height: '25%', width: '18%', justifyContent: 'center', alignItems: 'center'}}>
                                <FontAwesome 
                                name='search'
                                size={40}
                                color={colours.LogoColours.cream}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                data={collectionsData}
                renderItem={({item}) => {
                return (
                    <View>
                        <Text style={styles.collectionText}>{item.title}</Text>
                        <ShopCarousel style={styles.shopCarousel} id={item.id} />
                    </View>
                )}}
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
    },
    collectionText:{
        marginTop: 40,
        fontSize: 40,
        fontWeight: '600',
        color: colours.TailWindColors['pampas'][800]
    }
  });

export default ShopScreen