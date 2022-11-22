import React, { useRef, useState } from "react";
import { Animated, Dimensions, Image, StyleSheet, View } from "react-native";
import PostInfo from "./Info";

const { width, height } = Dimensions.get('window');

const Post = (props) => {
  return (
    <View style={styles.container}>
      <Image 
        style={{...styles.post, borderRadius: props.displayInfo?10:20, width: props.displayInfo?'95%':'90%'}} 
        source={{ uri: props.post.post }} 
        resizeMode='cover' 
      />
      <Animated.View style={{ opacity: props.fadeAnim, width: '90%' }}>
        <PostInfo user={props.user} post={props.post} />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  post: {
    aspectRatio: 1,
  }
});

export default Post;