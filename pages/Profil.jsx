import { Dimensions, StyleSheet, Text, View } from "react-native";

const {width, height} = Dimensions.get('window');

const Profil = (props) => {
    return (
        <View style={styles.container}>
            <Text>
                Profil
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Profil;