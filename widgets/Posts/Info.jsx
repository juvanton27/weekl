import { library } from '@fortawesome/fontawesome-svg-core';
import * as inline_comment from '@fortawesome/free-regular-svg-icons/faComment';
import * as inline_heart from '@fortawesome/free-regular-svg-icons/faHeart';
import * as solid_heart from '@fortawesome/free-solid-svg-icons/faHeart';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { currentModalVisible } from "./Comments";

const { width, height } = Dimensions.get('window');

library.add(inline_comment.faComment, solid_heart.faHeart, inline_heart.faHeart);

const PostInfo = (props) => {
  return (
    <LinearGradient
      style={styles.container}
      colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']}
    >
      <View style={styles.left}>
        <Image style={styles.picture} source={{ uri: props.user.picture }} resizeMode='cover' />
      </View>
      <View style={styles.mid}>
        <Text style={styles.username}>@{props.user.username}</Text>
        <Text style={styles.location}>Avenue de QuelquePart</Text>
      </View>
      <View style={styles.right}>
        <FontAwesomeIcon style={styles.icon} icon={solid_heart.faHeart} color="red" size={30} />
        <Pressable onPress={() => currentModalVisible.set(true)}>
          <FontAwesomeIcon style={styles.icon} icon={inline_comment.faComment} color="white" size={30} />
        </Pressable>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 9 / 10 * width,
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