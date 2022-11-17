import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Comments from "./Comments";
import PostInfo from "./Info";

const { width, height } = Dimensions.get('window');

const Post = (props) => {

  return (
    <View style={styles.container}>
      <Image style={styles.post} source={{ uri: props.post }} resizeMode='cover' />
      <PostInfo user={props.user} />
      <Comments />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  post: {
    width: 9 / 10 * width,
    height: 9 / 10 * width,
    borderRadius: 20
  }
});

export default Post;