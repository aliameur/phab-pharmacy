import Carousel from 'react-native-reanimated-carousel';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Dimensions, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { getStoreProducts } from '../scripts/ShopScript';
import colours from '../colours';

function ShopCarousel ({ navigation, handle }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getStoreProducts(handle);
                setData(result);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchData();
    }, [handle]);

    const renderItem = ({ item, index }) => {
        return (
            <View style={{
                backgroundColor: colours.TailWindColors.norway[200],
                borderRadius: 5,
                flex: 1,
                height: Dimensions.get('screen').height * 0.5,
                justifyContent: 'center' }}>
                <Text style={{flex: 0.7, color: colours.LogoColours.green, fontSize: 25, fontWeight: '800', alignSelf:'center', marginTop: 10}}>{item.title}</Text>
                <Image 
                    source={{uri: item.image}}
                    style={{flex: 4}}
                    resizeMode="contain"
                />
                <View style={{alignItems: 'center', alignSelf: 'center', flexDirection: 'row', marginTop: 10}}> 
                    <Text style={{fontWeight: '700', fontSize: 20}}>Price: </Text>
                    <Text style={{fontSize: 20}}>£{item.price.toString().slice(0,2)}.{item.price.toString().slice(2,4)}</Text>
                </View>
                <TouchableOpacity style={styles.detailsButtons} onPress={() => navigation.navigate('Product', {data: item})}>
                    <Text style={{fontSize: 25, color: colours.LogoColours.cream}}>Buy Now</Text>
                </TouchableOpacity>
            </View>
        );
    };

    if (!data) {
        const fake = [{
            title: 'Loading title',
        }, 
        {
            title: 'Loading title',
        }, 
        {
            title: 'Loading title',
        }]
        return (
            <SafeAreaView style={styles.collectionView}>
                <View style={styles.carouselView}>
                    <Carousel
                        loop={true}
                        modeConfig={{
                            parallaxScrollingScale: 0.85,
                            parallaxScrollingOffset: 55,
                            parallaxAdjacentItemScale: 0.8,
                        }}
                        panGestureHandlerProps={{
                            activeOffsetX: [-10, 10],
                        }}
                        autoPlayInterval={3500}
                        data={fake}
                        autoPlay={true}
                        mode={'parallax'}
                        width={Dimensions.get('window').width }
                        height={Dimensions.get('window').height * 0.6}
                        renderItem={(item) => (
                            <View style={{
                                backgroundColor: colours.TailWindColors.norway[200],
                                borderRadius: 5,
                                flex: 1,
                                height: Dimensions.get('screen').height * 0.5,
                                justifyContent: 'center' }}>
                                <Text style={{flex: 0.7, color: colours.LogoColours.green, fontSize: 25, fontWeight: '800', alignSelf:'center', marginTop: 10}}>{item.title}</Text>
                                <ActivityIndicator style={{flex: 4}}/>
                                <View style={{alignItems: 'center', alignSelf: 'center', flexDirection: 'row', marginTop: 10}}> 
                                    <Text style={{fontWeight: '700', fontSize: 20}}>Price: </Text>
                                    <Text style={{fontSize: 20}}>£99.99</Text>
                                </View>
                                <TouchableOpacity style={styles.detailsButtons} onPress={() => navigation.navigate('Product', {data: item})}>
                                    <Text style={{fontSize: 25, color: colours.LogoColours.cream}}>Buy Now</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        onSnapToItem={(index) => setActiveIndex(index)}
                    />
                </View>
            </SafeAreaView>
        )
    }

    // Render your carousel with the fetched data
    return (
        <SafeAreaView style={styles.collectionView}>
            <View style={styles.carouselView}>
                <Carousel
                    loop={true}
                    modeConfig={{
                        parallaxScrollingScale: 0.85,
                        parallaxScrollingOffset: 55,
                        parallaxAdjacentItemScale: 0.8,
                    }}
                    panGestureHandlerProps={{
                        activeOffsetX: [-10, 10],
                    }}
                    autoPlayInterval={5000}
                    data={data}
                    autoPlay={true}
                    mode={'parallax'}
                    width={Dimensions.get('window').width }
                    height={Dimensions.get('window').height * 0.6}
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
        alignItems: 'center', 
        alignSelf: 'center',
        justifyContent: 'center',
    },
    detailsButtons: {
        alignItems: 'center', 
        alignSelf: 'center',
        justifyContent: 'center',
        height: '12%',
        width: '50%',
        marginVertical: '3%',
        borderRadius: 10,
        backgroundColor: colours.TailWindColors['mineral-green'][600],
    }

})

export default ShopCarousel;