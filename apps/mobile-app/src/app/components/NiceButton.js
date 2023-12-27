import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import colours from '../colours';


function NiceButton({ label, navigation, where}){
    return(
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(where)}>
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colours.logo_dark_green, // You can change the color
        width: "47%",
        height: "60%",
        borderRadius: 25, // Adjust for more or less roundness
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2, // Optional, for Android shadow
        shadowOffset: { width: 0, height: 2 }, // Optional, for iOS shadow
        shadowOpacity: 0.25, // Optional, for iOS shadow
        shadowRadius: 3.84, // Optional, for iOS shadow
    },
    buttonText: {
        color: 'white', // You can change the text color
        fontSize: 0.04 * Dimensions.get('window').width, // You can adjust the font size
    },
});

export default NiceButton;