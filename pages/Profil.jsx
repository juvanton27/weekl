import { useEffect, useState } from 'react';
import { Animated, Button, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import stories from '../services/stories.service';
import { getUserById } from '../services/users.service';
import { currentWeeklIndex } from './Feed';
import { useRef } from 'react';
import { getPostsByUser } from '../services/posts.service';
import Post from '../widgets/Posts/Post';

const { width, height } = Dimensions.get('window');

const Profil = (props) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    currentWeeklIndex.onWeeklIndex().subscribe(i =>
      setUser(getUserById(stories[i].id))
    );
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 85}}>
        <View style={styles.bio}>
          <View>
            <Image style={styles.picture} source={{ uri: user?.picture }} />
            <Text style={styles.username}>@{user?.username}</Text>
          </View>
          <Text style={styles.description}>Ceci est une description{'\n'}Je peux même passer à la ligne</Text>
          <Text style={styles.stats}>1000 Followers</Text>
        </View>
        {getPostsByUser(user?.id)?.map(post => (
          <Post key={post.id} user={user} post={post.post} />
        ))}
      </ScrollView>
      <View style={{ ...styles.button, left: 25 }}>
        <Button title='Follow' color="black" />
      </View>
      <View style={{ ...styles.button, right: 25 }}>
        <Button title='Message' color="black" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: height - 50,
    width,
    top: 50,
  },
  bio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: height / 3,
  },
  picture: {
    width: width / 3,
    height: width / 3,
    resizeMode: 'cover',
    borderRadius: 90,
    margin: 5,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    color: 'grey',
    textAlign: 'center'
  },
  stats: {
    fontWeight: 'bold',
  },
  button: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 3,
    height: 50,
    bottom: 35,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
  },
});

export default Profil;