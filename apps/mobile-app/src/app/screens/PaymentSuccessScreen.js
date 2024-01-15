import { useEffect } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colours from '../colours';


function PaymentSuccessScreen({ navigation }) {

    return (
        <View style={{flex: 1.5, justifyContent: 'center', alignItems: 'center', marginTop: '15%'}}>
            <Image 
            source={require('../assets/PhabPharmaLogo.png')}
            resizeMode='contain'
            style={{flex: 1}}/>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <FontAwesome name="check" size={100} color={colours.LogoColours.green}/>
            </View>
            <Text style={{flex: 1, color: colours.LogoColours.gree, fontSize: 20, fontWeight: '500', marginHorizontal: '10%', textAlign: 'center'}}>Thank you for shopping with Phab Pharmacy, we'll handle it from here!</Text>
            <TouchableOpacity style={{flex: 0.5, backgroundColor: colours.TailWindColors.norway[600], alignItems: 'center', justifyContent: 'center', width: '70%', marginBottom: '20%', borderRadius: 20}}
                onPress={() => navigation.replace('Shop')}
            >
                <Text style={{fontSize: 20, fontWeight: '500', color: colours.LogoColours.cream}}>Return to Shop</Text>
            </TouchableOpacity>
        </View>
    )

}


export default PaymentSuccessScreen