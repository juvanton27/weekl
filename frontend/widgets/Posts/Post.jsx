import { library } from '@fortawesome/fontawesome-svg-core';
import * as solid_heart from '@fortawesome/free-solid-svg-icons/faHeart';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import PostInfo from "./Info";

const { width, height } = Dimensions.get('window');

library.add(solid_heart.faHeart);

/**
 * Component that display a picture shared by a user
 * @param {*} displayInfo boolean if the info are displayed or not 
 * @param {*} post the post informations
 * @param {*} user the user informations
 * @returns 
 */
const Post = ({ displayInfo, post, user }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [numberOfLikes, setNumberOfLikes] = useState(0);

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
        style={{ ...styles.post, borderRadius: displayInfo ? 10 : 20, width: displayInfo ? '95%' : '90%' }}
        source={{ uri: post.picture }}
        resizeMode='cover'
      />
      <Animated.View style={{ ...styles.like, opacity: fadeAnim }}>
        <FontAwesomeIcon style={styles.heart} icon={solid_heart.faHeart} size={150} />
        <Text style={styles.count}>{numberOfLikes}</Text>
      </Animated.View>
      <Animated.View style={{ display: displayInfo ? 'none' : 'flex', width: '90%' }}>
        <PostInfo user={user} post={post} anim={{ fadeIn, fadeOut }} setNumberOfLikes={setNumberOfLikes} />
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