import { library } from "@fortawesome/fontawesome-svg-core";
import * as paperPlane from '@fortawesome/free-regular-svg-icons/faPaperPlane';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Image, Keyboard, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { BehaviorSubject, concatMap } from "rxjs";
import { currentSnackbar } from "../App";
import { auth, db } from "../firebase";
import { findAllMessageByConversationId, sendMessage } from "../services/conversations";

const { width, height } = Dimensions.get('window')

library.add(paperPlane.faPaperPlane);

const conversationObs = new BehaviorSubject(undefined);
export const currentConversation = {
  set: conv => conversationObs.next(conv),
  onConversation: () => conversationObs.asObservable()
}

/**
 * Component as modal that display a conversation between two users
 * @param {*} 
 * @returns 
 */
const Conversation = ({ }) => {
  const ref = useRef();
  const [conv, setConv] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');

  function send() {
    if (currentMessage && currentMessage != '') {
      const message = {
        content: currentMessage,
        conversation_id: conv.uid,
        timestamp: new Date().toISOString(),
        user_id: auth.currentUser.uid
      }
      sendMessage(message).subscribe(
        () => setCurrentMessage(''),
        err => currentSnackbar.set({ type: 'ERROR', message: err.message })
      )
    }
  }

  useEffect(() => {
    currentConversation.onConversation().pipe(
      concatMap(conversation => {
        setConv(conversation);
        if (conversation) {
          const q = query(collection(db, 'messages'), where('conversation_id', '==', conversation.uid), orderBy('timestamp'));
          onSnapshot(q, querySnapshot => setMessages(querySnapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id }))))
        }
        return findAllMessageByConversationId(conversation?.uid)
      })
    ).subscribe(setMessages);
    Keyboard.addListener('keyboardDidHide', () => ref.current?.scrollToEnd({animated: true}))
    Keyboard.addListener('keyboardDidShow', () => ref.current?.scrollToEnd({animated: true}))
  }, []);

  return (
    <Modal
      animationType="slide"
      visible={conv !== undefined}
      presentationStyle="pageSheet"
      onRequestClose={() => currentConversation.set(undefined)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={50}
      >
        <View style={styles.content}>
          <View style={styles.conversation}>
            <View style={styles.titleContainer}>
              <Image style={styles.picture} source={{ uri: conv?.conv_dest === 2 ? (conv?.user_2_picture ?? require('../assets/pictures/default.jpg')) : conv?.user_1_picture ?? require('../assets/pictures/default.jpg') }}></Image>
              <Text style={styles.title}>@{conv?.conv_dest === 2 ? conv?.user_2_username : conv?.user_1_username}</Text>
            </View>
            <ScrollView
              ref={ref}
              onContentSizeChange={() => ref.current.scrollToEnd({animated: true})}
            >
              {messages.map(item => (
                <View key={item.uid} style={{ ...styles.row, justifyContent: auth.currentUser.uid === item.user_id ? 'flex-end' : 'flex-start' }}>
                  <View style={{ ...styles.bubble, backgroundColor: auth.currentUser.uid === item.user_id ? 'rgba(66, 135, 245, 0.6)' : 'rgba(209, 227, 255, 0.6)' }}>
                    <Text>{item.content}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} onChangeText={setCurrentMessage} value={currentMessage} placeholder="Envoyer un message" />
            <Pressable style={{ zIndex: 10000 }} onPress={(e) => { e.stopPropagation(); send() }}>
              <FontAwesomeIcon icon={paperPlane.faPaperPlane} size={20} />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    height: '100%',
  },
  conversation: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  titleContainer: {
    flexDirection: 'row',
    height: height / 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  picture: {
    height: '80%',
    aspectRatio: 1,
    borderRadius: 90,
    marginHorizontal: 10
  },
  title: {
    fontSize: 20
  },
  row: {
    width,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 2
  },
  bubble: {
    maxWidth: '70%',
    borderRadius: 90,
    padding: 10
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: 100,
    padding: 10,
    paddingBottom: 25,
  },
  input: {
    height: 50,
    width: '80%',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    padding: 10,
  }
});

export default Conversation;