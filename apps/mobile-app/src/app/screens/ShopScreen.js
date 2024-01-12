import React, { useState, useEffect, useContext } from 'react';
import { Button, FlatList, View, Text, StyleSheet, StatusBar, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import colours from '../colours';
import UserMenuSheet from '../components/UserMenuSheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getStoreCategories } from '../scripts/ShopScript';
import ShopCarousel from '../components/ShopCarousel'; 
import { ShopContext } from '../contexts/ShopContext';


function ShopScreen({ navigation }) {

    const [isMenuModalVisible, setMenuModalVisible] = useState(false);
    const [collectionsData, setCollectionsData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const { cartCount } = useContext(ShopContext);

    useEffect(() => {
        const getData = async () => {
            const category_data = await getStoreCategories();
            setCollectionsData(category_data);
        };
        getData();
    }, []); 

    const showModal = () => setMenuModalVisible(true);
    useEffect(() => {
        navigation.setOptions({ 
            headerRight: () => (
                <TouchableOpacity
                    onPress={showModal}
                    style={{ marginRight: Dimensions.get('window').width * 0.03, alignItems: 'center' }}
                >
                    <FontAwesome name="list-ul" size={30} color={colours.green}/>
                </TouchableOpacity>
            )
        });
    }, [navigation]);


    const hideUserSheet = () => {
        setMenuModalVisible(false);
    }

    const searchSubmit = () => {
        setSearchText('');
        navigation.navigate('Search', {search: searchText})
    }

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <View style={{height: Dimensions.get('window').height * 0.5, alignItems: 'center'}}>
                        <Text style={{flex: 2, marginTop: 30, fontSize: 30, fontWeight: '700', color: colours.LogoColours.green, marginHorizontal: '10%'}}>Your One-Stop Online Wellness Shop</Text>
                        <Text style={{flex: 1, fontSize: 15, fontWeight: '700', color: colours.LogoColours.green, marginHorizontal: '10%'}}>Find all your healthcare needs with ease. Just type and search below.</Text>
                        <View style={{flexDirection: 'row', flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                            <TextInput
                            value={searchText}
                            fontSize={Dimensions.get('window').width * 0.05}
                            style={{backgroundColor: 'white', height: '35%', width: '70%', paddingLeft: 10}}
                            placeholder='What are you looking for?'
                            placeholderTextColor={colours.TailWindColors.norway[400]}
                            onChangeText={(text) => setSearchText(text)}
                            onSubmitEditing={() => searchSubmit()}
                            color={colours.TailWindColors.norway[800]}/>
                            <TouchableOpacity style={{backgroundColor: colours.LogoColours.green, height: '35%', width: '15%', justifyContent: 'center', alignItems: 'center'}}
                            onPress={() => searchSubmit()}
                            testID = 'search-button'
                            >
                                <FontAwesome 
                                name='search'
                                size={Dimensions.get('window').width * 0.1}
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
                        <ShopCarousel style={styles.shopCarousel} handle={item.handle} navigation={navigation}/>
                    </View>
                )}}
                keyExtractor={item => item.id}
            />
            {isMenuModalVisible ? (<UserMenuSheet onClose={hideUserSheet} visible={isMenuModalVisible} navigation={navigation}/>) : null}
            <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('Chat')} testID='chat-button'>
                <FontAwesome name="comments-o" size={35}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')} testID='cart-button'>
                <FontAwesome name="shopping-cart" size={35}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cartLittleButton}>
                    <Text style={{color: colours.LogoColours.cream}}>{cartCount}</Text>
            </TouchableOpacity>
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    cartLittleButton:{
        position: "absolute",
        right: 10,
        bottom: 70,
        height: 20,
        width: 20,
        backgroundColor: colours.TailWindColors.norway[600],
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cartButton: {
        position: 'absolute',
        right: 10,
        bottom: 20,
        backgroundColor: colours.TailWindColors['mineral-green'][200],
        padding: 15,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatButton: {
        position: 'absolute',
        right: Dimensions.get('window').width * 0.8,
        bottom: 20,
        backgroundColor: colours.TailWindColors['mineral-green'][200],
        padding: 15,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shopCarousel: {
        marginBottom: 10,
    },
    collectionText:{
        marginTop: 40,
        fontSize: 40,
        fontWeight: '600',
        marginLeft: 20,
        color: colours.TailWindColors['pampas'][800]
    }
  });

export default ShopScreen