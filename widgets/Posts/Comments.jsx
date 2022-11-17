import React, { useEffect, useState } from "react";
import { Dimensions, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import { BehaviorSubject } from "rxjs";
import { getCommentsByPost } from "../../services/posts.service";


const { width, height } = Dimensions.get('window');

export const modalVisible = new BehaviorSubject(false);
export const currentModalVisible = {
  set: (bool) => modalVisible.next(bool),
  onModalVisible: () => modalVisible.asObservable(),
}
const Comments = (props) => {
  const [visible, setVisible] = useState(false);

  getCommentsByPost(0);

  useEffect(() => {
    currentModalVisible.onModalVisible().subscribe(bool => {
      setVisible(bool);
    });
  }, []);

  return (
    <Modal
      animationType="slide"
      visible={visible}
      presentationStyle="pageSheet"
      onRequestClose={() => currentModalVisible.set(false)}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Comments</Text>
      </View>
      <ScrollView style={styles.content}>

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
    height: 1/15*height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  title: {
    fontSize: 20,
  },
  content: {
    backgroundColor: 'blue',
  }
});

export default Comments;