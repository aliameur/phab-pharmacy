
import Carousel from 'react-native-snap-carousel';

import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Dimensions, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getProducts } from '../scripts/ShopScript';
import colours from '../colours';

function ShopCarousel ({ id }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getProducts(id);
                setData(result);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchData();
    }, [id]);

    const renderItem = ({ item, index }) => {
        return (
            <View style={{
                backgroundColor: colours.TailWindColors.norway[200],
                borderRadius: 5,
                flex: 1,
                height: Dimensions.get('screen').height * 0.5,
                justifyContent: 'center' }}>
                <Image 
                    source={{uri: item.image}}
                    style={{flex: 4}}
                    resizeMode="contain"
                />
                <View style={{alignItems: 'center', alignSelf: 'center', flexDirection: 'row', marginTop: 10}}> 
                    <Text style={{fontWeight: '700'}}>Price: </Text>
                    <Text>£{item.price.toString().slice(0,2)}.{item.price.toString().slice(2,4)}</Text>
                </View>
                <TouchableOpacity style={styles.detailsButtons}>
                    <Text style={{fontSize: 20, color: colours.LogoColours.cream}}>See Details</Text>
                </TouchableOpacity>
            </View>
        );
    };

    if (!data) {
        return <Text>Loading...</Text>; // or any other placeholder component
    }

    // Render your carousel with the fetched data
    return (
        <SafeAreaView style={styles.collectionView}>
            <View style={styles.carouselView}>
                <Carousel
                    loop={true}
                    layout={"default"}
                    data={data}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width * 0.75}
                    renderItem={renderItem}
                    onSnapToItem={(index) => setActiveIndex(index)}
                />
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    collectionView: {
        backgroundColor: colours.TailWindColors['mineral-green'][600], 
        marginVertical: 20
    },
    carouselView:{
        flex: 1, 
        marginVertical: 30,
        alignItems: 'center', 
        alignSelf: 'center',
        justifyContent: 'center',
    },
    detailsButtons: {
        alignItems: 'center', 
        alignSelf: 'center',
        justifyContent: 'center',
        height: '15%',
        width: '50%',
        marginVertical: '3%',
        borderRadius: 10,
        backgroundColor: colours.LogoColours.green,
    }

})

export default ShopCarousel;