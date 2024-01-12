import { FlatList, Text, View, Image, Dimensions, ActivityIndicator, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { getCartItems } from "../scripts/CartScripts";
import { useEffect, useState, useContext } from "react";
import colours from "../colours";
import { CartContext } from '../contexts/CartContext';



function CartScreen({navigation, route }) {
    const { cartData, cartTotal, loadCartData } = useContext(CartContext);

    useEffect(() => {
        const getCartProducts = async () => {
            await loadCartData();
        };  
        getCartProducts();
    }, []); 

    if (!cartData){
        items = [{title: 'Loading item 1'}, {title: 'Loading item 2'}]
        return (
            <View>
                <View>
                    <FlatList 
                    ListHeaderComponent={
                        <View style={{borderBottomWidth: 2, borderColor: colours.LogoColours.green}}>
                            <Text style={{fontSize: 30, fontWeight: "700"}}>Your Bill...</Text>
                        </View>
                    }
                    data={items}
                    renderItem={({item}) => {
                    return (
                        <View style={{flex: 1, borderBottomWidth: 2, borderColor: colours.LogoColours.green}}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={{fontSize: 25, flex: 5}}>{item.title}</Text>
                                <Text style={{fontSize: 25, fontWeight: "700", flex: 2}}>£99.99</Text>
                            </View>
                            <View style={{height: Dimensions.get('window').height * 0.12, flexDirection: 'row'}}>
                                <ActivityIndicator size={"large"}/>
                                <Text style={{ alignSelf: 'center', fontSize: 20 }}>x99</Text>
                            </View>
                        </View>
                    )}}
                    keyExtractor={item => item.id}/>
                </View>
            </View>
        )
    }
    return (
        <View style={{flex: 1, justifyContent: 'flex-start', backgroundColor: 'white'}}>
            <FlatList 
            style={styles.flatList}
            /*
            ListHeaderComponent={
                <View style={styles.flatListHeader}>
                    <Text style={{fontSize: 30, fontWeight: "700"}}>Your Bill...</Text>
                </View>
            }*/
            data={cartData}
            renderItem={({item}) => {
            return (
                <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 20, margin: 10, backgroundColor: colours.TailWindColors["mineral-green"][100], height: Dimensions.get('window').height * 0.15, alignItems: 'center', borderRadius: 15}}>
                    <Image 
                        source={{ uri: item.image }}
                        style={{ height: '70%', width: '70%', flex: 1.5, margin: 10 }}
                        resizeMode="cover"
                    />
                    <View style={{flex: 3, marginLeft: 5}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Text style={{fontSize: 20, flex: 5, color: colours.LogoColours.green}}>{item.title}</Text>
                        </View>
                        <View style={{flex: 0.5, flexDirection: 'row', justifyContent:'space-between', margin: 10}}>
                            <View>
                                <Text style={{color: colours.LogoColours.green, fontSize: 18}}>x{item.quantity}</Text>
                            </View>
                            <View>
                                <Text style={{color: colours.LogoColours.green, fontSize: 20, fontWeight: '500'}}>£{item.total.toString().slice(0, -2)}.{item.total.toString().slice(-2)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )}}
            keyExtractor={item => item.id}/>
            <View style={{flex: 0.15, justifyContent: 'center', alignItems:'center'}}>
                <TouchableOpacity style={{backgroundColor: colours.TailWindColors["mineral-green"][600], width: '90%', height: '70%', borderRadius: 15, justifyContent:'center', alignItems: 'center'}}>
                    <Text style={{color: colours.LogoColours.cream, fontSize: 27, fontWeight: "500"}}>Pay via Card - £{cartTotal.toString().slice(0, -2)}.{cartTotal.toString().slice(-2)}</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex: 0.1, justifyContent: 'center', alignItems:'center'}}>
                <TouchableOpacity style={{width: '90%', height: '70%', borderRadius: 15, justifyContent:'center', alignItems: 'center'}}
                onPress={() => navigation.replace('Shop')}
                >
                    <Text style={{fontSize: 20}}>Continue Shopping</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    flatList: {
        flex: 10,
    }
})


export default CartScreen