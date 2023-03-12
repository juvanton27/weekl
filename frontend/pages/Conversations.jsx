import { useEffect, useState } from "react";
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { BehaviorSubject, map } from "rxjs";
import { auth } from "../firebase";
import { findAllConversationsByUserId } from "../services/conversations";
import Conversation, { currentConversation } from "../widgets/Conversation";

const { width, height } = Dimensions.get('window');

const lastMessageUpdated = new BehaviorSubject({ id: undefined, message: undefined });
export const currentLastMessageUpdate = {
  set: ({ id, message }) => lastMessageUpdated.next({ id, message }),
  onLastMessageUpdated: () => lastMessageUpdated.asObservable()
}
/**
 * Page that displays all the conversations of the logged user
 * @returns 
 */
const Conversations = ({ }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    findAllConversationsByUserId(auth.currentUser.uid).pipe(
      map(conversations => setConversations(conversations)),
    ).subscribe();
    currentLastMessageUpdate.onLastMessageUpdated().subscribe(({ id, message }) => {
      if (conversations.length > 0) {
        const nextConversations = conversations.map(conversation => conversation.uid === id ? { ...conversation, last_message: message } : conversation);
        setConversations(nextConversations);
      }
    })
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ padding: 20 }}>
        {conversations.map((conversation, index) => (
          <Pressable key={index} style={styles.tile} onPress={() => { currentConversation.set(conversation) }}>
            <Image style={styles.thumbnail} source={{ uri: conversation?.picture }}></Image>
            <View>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{conversation?.username}</Text>
              <Text style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{conversation?.last_message}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <Conversation />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    paddingTop: height / 10,
  },
  title: {
    fontSize: '45px',
    marginBottom: 10
  },
  tile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    width: width * 9 / 10,
    margin: 5,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.01)',
  },
  thumbnail: {
    height: '80%',
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 90,
    marginHorizontal: 10
  }
});

export default Conversations;