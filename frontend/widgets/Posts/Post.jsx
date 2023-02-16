import { library } from '@fortawesome/fontawesome-svg-core';
import * as solid_heart from '@fortawesome/free-solid-svg-icons/faHeart';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useRef } from "react";
import { Animated, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import PostInfo from "./Info";

const { width, height } = Dimensions.get('window');

library.add(solid_heart.faHeart);

const Post = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false
    }).start();
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ ...styles.post, borderRadius: props.displayInfo ? 10 : 20, width: props.displayInfo ? '95%' : '90%' }}
        source={{ uri: props.post.picture }}
        resizeMode='cover'
      />
      <Animated.View style={{ ...styles.like, opacity: fadeAnim }}>
        <FontAwesomeIcon style={styles.heart} icon={solid_heart.faHeart} size={150} />
        <Text style={styles.count}>5K</Text>
      </Animated.View>
      <Animated.View style={{ display: props.displayInfo ? 'none' : 'flex', width: '90%' }}>
        <PostInfo user={props.user} post={props.post} anim={{ fadeIn, fadeOut }} />
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
  },
  like: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  heart: {
    color: 'rgba(255,255,255,0.5)',
  },
  count: {
    position: 'absolute',
    fontSize: 36,
    color: 'rgba(0,0,0,0.3)',
  }
});

export default Post;