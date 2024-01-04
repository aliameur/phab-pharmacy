import { FlatList, Text, View, Image, Dimensions } from "react-native";
import { getCartItems } from "../scripts/CartScripts";
import { useEffect, useState } from "react";
import colours from "../colours";



function CartScreen({navigation, route }) {
    [cartItems, setCartItems] = useState(null);
    useEffect(() => {
        const getCartProducts = async () => {
            const items = await getCartItems();
            setCartItems(items);
        };  
        getCartProducts();
    }, []); 

    if (!cartItems){
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }
    return (
        <View>
            <FlatList 
            ListHeaderComponent={
                <View style={{borderBottomWidth: 2, borderColor: colours.LogoColours.green}}>
                    <Text style={{fontSize: 30, fontWeight: "700"}}>Your Bill...</Text>
                </View>
            }
            data={cartItems}
            renderItem={({item}) => {
            return (
                <View style={{flex: 1, borderBottomWidth: 2, borderColor: colours.LogoColours.green}}>
                    <View style={{flexDirection: "row"}}>
                        <Text style={{fontSize: 25, flex: 5}}>{item.title}</Text>
                        <Text style={{fontSize: 25, fontWeight: "700", flex: 2}}>£{item.total.toString().slice(0, -2)}.{item.total.toString().slice(-2)}</Text>
                    </View>
                    <View style={{height: Dimensions.get('window').height * 0.12, flexDirection: 'row'}}>
                        <Image 
                            source={{ uri: item.image }}
                            style={{ height: '100%', width: '30%' }}
                            resizeMode="cover"
                        />
                        <Text style={{ alignSelf: 'center', fontSize: 20 }}>x{item.quantity}</Text>
                    </View>
                </View>
            )}}
            keyExtractor={item => item.id}/>
        </View>
    )
}


export default CartScreen