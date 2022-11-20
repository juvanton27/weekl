import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import PostInfo from "./Info";

const { width, height } = Dimensions.get('window');

const Post = (props) => {

  return (
    <View style={styles.container}>
      <Image style={styles.post} source={{ uri: props.post.post }} resizeMode='cover' />
      <View style={{ display: props.displayInfo?'none':'', width: '90%' }}>
        <PostInfo user={props.user} post={props.post} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  post: {
    width: '90%',
    aspectRatio: 1,
    borderRadius: 20
  }
});

export default Post;