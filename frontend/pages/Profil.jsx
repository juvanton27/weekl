import { library } from '@fortawesome/fontawesome-svg-core';
import * as inline_logout from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Animated, Button, Dimensions, Image, LayoutAnimation, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { concatMap, forkJoin, map } from 'rxjs';
import { currentSnackbar } from '../App';
import { getProfil, logout } from '../services/auth.service';
import { findAllPostsByUserId } from '../services/posts.service';
import stories from '../services/stories.service';
import { findUserById, getUserById } from '../services/users.service';
import Comments from "../widgets/Posts/Comments";
import Post from '../widgets/Posts/Post';
import { currentWeeklIndex } from './Feed';

const { width, height } = Dimensions.get('window');

library.add(inline_logout.faArrowRightFromBracket);

const Profil = (props) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [gridView, setGridView] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const _scrollview = useRef();
  const [postCords, setPostCords] = useState([]);

  const pinch = Gesture.Pinch().onStart((e) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (e.scale < 1) {
      if (!gridView) {
        fadeOut();
        setGridView(true);
      }
    }
  });

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false
    }).start();
  }
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false
    }).start();
  }

  const onLogoutClick = () => {
    logout().subscribe({
      next: currentSnackbar.set({ type: 'INFO', message: 'You logged out' })
    })
  }

  useEffect(() => {
    currentWeeklIndex.onWeeklIndex().subscribe(i =>
      setUser(getUserById(stories[i]?.id))
    );
    if (props.own) {
      getProfil().pipe(
        concatMap(({ userId }) => {
          return forkJoin({ posts: findAllPostsByUserId(userId), user: findUserById(userId) });
        }),
        map(({ posts, user }) => {
          setUser(user);
          setPosts(posts);
        }),
      ).subscribe();
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 85 }} ref={_scrollview}>
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
                {posts?.length}
              </Text>
              <Text style={styles.labels}>Posts</Text>
            </View>
          </View>
          <Pressable style={styles.logout} onPress={() => onLogoutClick()}>
            <FontAwesomeIcon icon={inline_logout.faArrowRightFromBracket} size={30} />
          </Pressable>
        </View>
        <GestureDetector gesture={pinch}>
          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
            {posts?.map((post, index) => (
              <View key={post.id} style={{ width: gridView ? width / 3 : width }} onLayout={e => {
                postCords[index] = e.nativeEvent.layout.y + height / 3 - 100;
                setPostCords(postCords);
              }}>
                <TouchableOpacity activeOpacity={1} onPress={() => {
                  if (gridView) {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut, () => _scrollview.current.scrollTo({ y: postCords[index] }));
                    fadeIn();
                    setGridView(false);
                  } else {
                    _scrollview.current.scrollTo({ y: postCords[index] });
                  }
                }}>
                  <Post user={user} post={post} displayInfo={gridView} fadeAnim={fadeAnim} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </GestureDetector>
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
  logout: {
    position: 'absolute',
    top: 20,
    right: 20,
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