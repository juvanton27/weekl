import { library } from '@fortawesome/fontawesome-svg-core';
import * as inline_comment from '@fortawesome/free-regular-svg-icons/faComment';
import * as inline_heart from '@fortawesome/free-regular-svg-icons/faHeart';
import * as solid_heart from '@fortawesome/free-solid-svg-icons/faHeart';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { currentModalVisible, currentPostComments } from "./Comments";

const { width, height } = Dimensions.get('window');

library.add(inline_comment.faComment, solid_heart.faHeart, inline_heart.faHeart);

/**
 * Component on a post that contains all the posts info
 * as the owner, the location and the action buttons
 * @param {*} user the owner of the post
 * @param {*} anim the animation when we resize the grid of posts
 * @param {*} post the post
 * @returns 
 */
const PostInfo = ({ user, anim, post }) => {
  const [liked, setLiked] = useState(false);

  return (
    <LinearGradient
      style={styles.container}
      colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']}
    >
      <View style={styles.left}>
        <Image style={styles.picture} source={user?.picture ? { uri: user?.picture } : require('../../assets/pictures/default.jpg')} resizeMode='cover' />
      </View>
      <View style={styles.mid}>
        <Text style={styles.username}>@{user?.username}</Text>
        <Text style={styles.location}>Avenue de QuelquePart</Text>
      </View>
      <View style={styles.right}>
        <Pressable onPress={() => {
          if (!liked) {
            new Promise(resolve => resolve(anim.fadeIn()))
              .then(setTimeout(() => anim.fadeOut(), 750))
          }
          setLiked(!liked);
        }}>
          <FontAwesomeIcon style={styles.icon} icon={liked ? solid_heart.faHeart : inline_heart.faHeart} color={liked ? 'red' : 'white'} size={30} />
        </Pressable>
        <Pressable onPress={() => { currentModalVisible.set(true); currentPostComments.set(post) }}>
          <FontAwesomeIcon style={styles.icon} icon={inline_comment.faComment} color="white" size={30} />
        </Pressable>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: width / 7,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: "absolute",
    bottom: 0,
    borderRadius: 20,
  },
  left: {
    width: width / 8,
    marginHorizontal: 15
  },
  picture: {
    width: width / 8,
    height: width / 8,
    borderRadius: 90
  },
  mid: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  username: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left'
  },
  location: {
    color: 'grey'
  },
  right: {
    width: width / 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 10
  },
  icon: {
    margin: 5,
  }
});

export default PostInfo;