import React, { useState, useEffect, createContext, useContext } from 'react';
import { Button, FlatList, View, Text, StyleSheet, StatusBar, Dimensions } from 'react-native';
import colours from '../colours';
import Voice from '@react-native-voice/voice';
import UserMenuSheet from '../components/UserMenuSheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getCollections } from '../scripts/ShopScript';
import { CarouselItem } from '../components/CarouselCard';


function ShopScreen({ navigation }) {

    const [isMenuModalVisible, setMenuModalVisible] = useState(false);
    const [data, setData] = useState([])

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
      ];

    useEffect(() => {
        const getData = async () => {
            const data = await getCollections();
            setData(data.reverse());
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
                data={data}
                renderItem={({item}) => <CarouselItem title={item.title}/>}
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
    }
  });

export default ShopScreen