import { useEffect, useState } from 'react';
import { Button, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { BehaviorSubject } from 'rxjs';
import { getPostsByUser } from '../services/posts.service';
import stories from '../services/stories.service';
import { getUserById } from '../services/users.service';
import Comments from "../widgets/Posts/Comments";
import Post from '../widgets/Posts/Post';
import { currentWeeklIndex } from './Feed';

const { width, height } = Dimensions.get('window');

const Profil = (props) => {
  const [user, setUser] = useState({});
  const [gridView, setGridView] = useState(false);

  useEffect(() => {
    currentWeeklIndex.onWeeklIndex().subscribe(i =>
      setUser(getUserById(stories[i].id))
    );
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 85 }}>
        <View style={styles.bio}>
          <View>
            <Image style={styles.picture} source={{ uri: user?.picture }} />
            <Text style={styles.username}>@{user?.username}</Text>
          </View>
          <Text style={styles.description}>Ceci est une description{'\n'}Je peux même passer à la ligne</Text>
          <View style={styles.stats}>
            <View style={styles.follows}>
              <Text style={styles.numbers}>1000</Text>
              <Text style={styles.labels}>Followers</Text>
            </View>
            <View style={styles.follows}>
              <Text style={styles.numbers}>100</Text>
              <Text style={styles.labels}>Following</Text>
            </View>
            <View style={styles.follows}>
              <Text style={styles.numbers}>
                {getPostsByUser(user?.id)?.length}
              </Text>
              <Text style={styles.labels}>Posts</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity activeOpacity={1} style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }} onPress={() => setGridView(!gridView)}>
          {getPostsByUser(user?.id)?.map(post => (
            <View key={post.id} style={{ width: gridView?width / 3:width }}>
              <Post user={user} post={post} displayInfo={gridView} />
            </View>
          ))}
        </TouchableOpacity>
      </ScrollView>
      <View style={{ ...styles.button, left: 25 }}>
        <Button title='Follow' color="black" />
      </View>
      <View style={{ ...styles.button, right: 25 }}>
        <Button title='Message' color="black" />
      </View>
      <Comments />
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
    flexDirection: 'row',
  },
  follows: {
    marginHorizontal: 5,
  },
  numbers: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  labels: {
    color: 'grey',
    fontSize: 8,
    textAlign: 'center'
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