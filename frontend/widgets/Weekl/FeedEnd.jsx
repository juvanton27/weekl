import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";


const { width, height } = Dimensions.get('window');

/**
 * Compoenent that is displayed at the end of the feed
 * @returns 
 */
const End = ({}) => {

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