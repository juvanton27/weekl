import { useEffect, useState } from "react";
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { map } from "rxjs";
import { auth } from "../firebase";
import { findAllConversationsByUserId } from "../services/conversations";
import Conversation, { currentConversation } from "../widgets/Conversation";

const { width, height } = Dimensions.get('window');

const Conversations = ({ }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    findAllConversationsByUserId(auth.currentUser.uid).pipe(
      map(conversations => setConversations(conversations)),
    ).subscribe();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ padding: 20 }}>
        <Text style={styles.title}>Conversations</Text>
        {conversations.map((conversation, index) => (
          <Pressable key={index} style={styles.tile} onPress={() => { currentConversation.set(conversation) }}>
            <Image style={styles.thumbnail} source={{ uri: conversation?.conv_dest === 2 ? conversation?.user_2_picture : conversation?.user_1_picture }}></Image>
            <View>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{conversation?.conv_dest === 2 ? conversation?.user_2_username : conversation?.user_1_username}</Text>
              <Text style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Last message sent</Text>
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