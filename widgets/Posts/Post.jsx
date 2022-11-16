import React, { useEffect, useState } from "react";
import { Dimensions, Image, Modal, Screen, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BehaviorSubject } from "rxjs";
import PostInfo from "./Info";

const { width, height } = Dimensions.get('window');

export const modalVisible = new BehaviorSubject(false);
export const currentModalVisible = {
  set: (bool) => modalVisible.next(bool),
  onModalVisible: () => modalVisible.asObservable(),
}
const Post = (props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    currentModalVisible.onModalVisible().subscribe(bool => {
      setVisible(bool);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.post} source={{ uri: props.post }} resizeMode='cover' />
      <PostInfo user={props.user} />
      <Modal
        animationType="slide"
        visible={visible}
        presentationStyle="pageSheet"
        onRequestClose={() => currentModalVisible.set(false)}
      >
        <Text>Comments</Text>
      </Modal>
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