import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";


const { width, height } = Dimensions.get('window');


const End = (props) => {

  return (
    <View style={styles.container}>
      <Text>You saw all your Weekls</Text>
      <Text>Follow more people</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default End;