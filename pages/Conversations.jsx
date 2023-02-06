import { useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { getLastMessageFromConv } from "../services/conversations";
import { getAllConversationsByUserId, getUserById } from "../services/users.service";

const { width, height } = Dimensions.get('window');

const Conversations = (props) => {
  const [user, setUser] = useState(0);
  return (
    <View style={styles.container} >
      <ScrollView contentOffset={{}}>
        {getAllConversationsByUserId(user)?.sort((a, b) => getLastMessageFromConv(a.id).date.getTime() - getLastMessageFromConv(b.id).date.getTime()).map((c, index) => (
          <View style={styles.row} key={index}>
            <Image style={styles.picture} source={getUserById(c.users_id.find(u => u !== user)).picture} resizeMode='cover' />
            <View style={styles.content}>
              <Text style={styles.username}>@{getUserById(c.users_id.find(u => u !== user)).username}</Text>
              <Text style={styles.lastMessage}>{getLastMessageFromConv(c.id).message}</Text>
              <Text style={styles.lastMessage}>{getLastMessageFromConv(c.id).date.toISOString()}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
  },
  row: {
    marginHorizontal: 5,
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: '100%',
    paddingLeft: '30%',
    height: '80%',
    borderRadius: 20,
    justifyContent: 'space-evenly'
  },
  picture: {
    width: '25%',
    aspectRatio: 1,
    backgroundColor: 'black',
    borderRadius: 90,
    margin: 5,
    zIndex: 2
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  lastMessage: {
    color: 'grey'
  }
});

export default Conversations;