import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get('window');

const Day = (props) => {
  return (
    <View style={styles.container}>
      <Text>Story {props.title} by {props.user}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height,
  },
});

export default Day;