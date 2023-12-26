import { View, ActivityIndicator, Image, Dimensions, StyleSheet} from 'react-native';
import colours from '../colours';
import { login } from '../scripts/AuthScript';
import * as Keychain from 'react-native-keychain';
import { useEffect } from 'react';
import { checkKeychain } from '../scripts/AuthScript';


function UserCheckScreen({ navigation }) {
    useEffect(() => {
        const performCheck = async () => {
            const output = await checkKeychain();
            console.log(output)
            if (output[0] === 'good') {
                navigation.replace('Chat');
            } else {
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
            <ActivityIndicator size={'large'} color={colours.logo_dark_green}/>
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: colours.cream,
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