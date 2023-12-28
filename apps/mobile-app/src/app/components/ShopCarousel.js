
import Carousel from 'react-native-snap-carousel';

import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Dimensions, Image } from 'react-native';
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
                justifyContent: 'center',
                padding: 20, }}>
                <Text style={{fontSize: 30}}>{item.title}</Text>
                <Image 
                    source={{uri: item.image}}
                    style={{height: '50%', width: '60%'}}
                />
                <Text>{item.description}</Text>
            </View>
        );
    };

    if (!data) {
        return <Text>Loading...</Text>; // or any other placeholder component
    }

    // Render your carousel with the fetched data
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colours.TailWindColors['mineral-green'][600], paddingTop: 20, }}>
            <View style={{ flex: 1, flexDirection:'row' , marginTop: 30,}}>
                <Carousel
                    layout={"default"}
                    data={data}
                    sliderWidth={300}
                    itemWidth={300}
                    renderItem={renderItem}
                    onSnapToItem={(index) => setActiveIndex(index)}
                />
            </View>
        </SafeAreaView>
    );
};

export default ShopCarousel;