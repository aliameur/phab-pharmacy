import { useEffect, useContext } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import { ShopContext } from '../contexts/ShopContext';

import colours from '../colours';
import { checkKeychain } from '../scripts/AuthScript';


function UserCheckScreen({ navigation }) {
    const { loadNumberCart } = useContext(ShopContext);
    useEffect(() => {
        const performCheck = async () => {
            const output = await checkKeychain();
            if (output[0] === 'good') {
                console.log('Remembered user')
                try {
                    await loadNumberCart();
                    navigation.replace('Shop');
                } catch (error){
                }
            } else {
                console.log('User forgotten')
                navigation.replace('Login');
            }
        };

        performCheck();
    }, [navigation]); 
    return (
        <View style={styles.mainView}>
            <Image 
            source={require('../assets/PhabPharmaLogo.png')}
            style={styles.imageStyle}/>
            <ActivityIndicator size={'large'} color={colours.LogoColours.logo_dark_green}/>
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: colours.LogoColours.cream,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        height: 110,
        width: 83,
        marginBottom: 40
    },
})

export default UserCheckScreen