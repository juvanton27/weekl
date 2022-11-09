import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { getUserById } from "../../services/users.service";

const { width, height } = Dimensions.get('window');

const Info = (props) => {
    const user = getUserById(props.user);
    return (
        <LinearGradient
            style={styles.container}
            colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']}
        >
            <Image
                style={styles.picture}
                source={require('../../assets/pictures/01.jpeg')}
                resizeMode='cover'
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width,
        bottom: 0,
        padding: 20,
        paddingBottom: 50,
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    picture: {
        width: 75,
        height: 75,
        borderRadius: 45,
    }
});

export default Info;