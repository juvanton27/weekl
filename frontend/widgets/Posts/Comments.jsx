import { library } from '@fortawesome/fontawesome-svg-core';
import * as solid_xmark from '@fortawesome/free-solid-svg-icons/faXmark';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { BehaviorSubject, concatMap, forkJoin, of } from "rxjs";
import { findAllCommentsByPostId } from "../../services/posts.service";
import { findUserById } from '../../services/users.service';

library.add(solid_xmark.faXmark);

const { width, height } = Dimensions.get('window');

export const modalVisible = new BehaviorSubject(false);
export const currentModalVisible = {
  set: (bool) => modalVisible.next(bool),
  onModalVisible: () => modalVisible.asObservable(),
}
const postComments = new BehaviorSubject(undefined);
export const currentPostComments = {
  set: (post) => postComments.next(post),
  onPostComments: () => postComments.asObservable(),
}

/**
 * Component as a modal to display all the comments of a post 
 * @returns 
 */
const Comments = ({}) => {
  const [visible, setVisible] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    currentModalVisible.onModalVisible().subscribe(setVisible);
    currentPostComments.onPostComments().pipe(
      concatMap(post => findAllCommentsByPostId(post?.uid)),
      concatMap(comments => comments.length > 0 ? forkJoin(comments.map(comment => (forkJoin({comment: of(comment), user: findUserById(comment.user_id)})))): of([]))
    ).subscribe(commentsUser => setComments(commentsUser.map(({comment, user}) => ({...comment, username: user.username, picture: user.picture}))));
  }, []);

  return (
    <Modal
      animationType="slide"
      visible={visible}
      presentationStyle="pageSheet"
      onRequestClose={() => currentModalVisible.set(false)}
      style={styles.container}
    >
      <LinearGradient style={styles.header} colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0)']}>
        <Text style={styles.title}>{comments.length} comments</Text>
        <Pressable style={styles.close} onPress={() => currentModalVisible.set(false)}>
          <FontAwesomeIcon style={styles.icon} icon={solid_xmark.faXmark} color="black" size={20} />
        </Pressable>
      </LinearGradient>
      <ScrollView style={styles.content}>
        {comments.map(comment => (
          <View key={comment.uid} style={styles.comment}>
            <Image style={styles.picture} source={{ uri: comment.picture }} />
            <View style={styles.text}>
              <Text style={styles.username}>@{comment.username}</Text>
              <Text style={styles.commentContent}>{comment.content}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  header: {
    position: 'absolute',
    width,
    height: 1 / 15 * height,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  title: {
    fontSize: 20,
  },
  close: {
    position: 'absolute',
    right: 15
  },
  content: {
    paddingTop: 1 / 15 * height
  },
  comment: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    margin: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.1)'
  },
  picture: {
    width: width / 8,
    height: width / 8,
    borderRadius: 90,
    marginHorizontal: 5
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 5
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  commentContent: {

  }
});

export default Comments;