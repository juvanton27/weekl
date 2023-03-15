import { library } from '@fortawesome/fontawesome-svg-core';
import * as inline_logout from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Button, Dimensions, Image, LayoutAnimation, NativeModules, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { BehaviorSubject, concatMap, forkJoin, map, of } from 'rxjs';
import { currentSnackbar } from '../App';
import { auth, logout } from '../firebase';
import { getProfil } from '../services/auth.service';
import { deletePostById, findAllPostsByUserId } from '../services/posts.service';
import { findUserById } from '../services/users.service';
import Comments from "../widgets/Posts/Comments";
import Post from '../widgets/Posts/Post';
import CameraPost from './Camera';
import { currentUserIndex } from './Feed';
import { faTrash } from '@fortawesome/fontawesome-free-solid';
import ConfirmationModal, { currentConfirmationModal } from '../utils/ConfirmationModal';

const { width, height } = Dimensions.get('window');

library.add(inline_logout.faArrowRightFromBracket, faTrash);

const modalVisible = new BehaviorSubject(false);
export const currentModalVisible = {
  set: bool => modalVisible.next(bool),
  onModalVisible: () => modalVisible.asObservable()
}

/**
 * Page that displays the logged user informations or a non logged user informations
 * The actions are varying depending on the user own the profil (typically consulting his profil page)
 * or if it's consulting another user's page 
 * The uid is defined when the profile is diplayed from SearchComponent
 * @param {*} own if the user own the profil
 * @returns 
 */
const Profil = ({ own, search }) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [gridView, setGridView] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const _scrollview = useRef();
  const [postCords, setPostCords] = useState([]);
  const [logginOut, setLoggingOut] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [cameraMode, setCameraMode] = useState('weekl') // weekl or post

  const {UIManager} = NativeModules;

  UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

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
    setLoggingOut(true);
    logout().subscribe({
      next: currentSnackbar.set({ type: 'INFO', message: 'You logged out' })
    })
  }

  const getOwnProfil = () => {
    forkJoin({ user: getProfil(), posts: findAllPostsByUserId(auth.currentUser.uid) }).pipe(
      map(({ user, posts }) => {
        setUser(user);
        setPosts(posts);
      }),
    ).subscribe();
  }

  const deletePost = (id) => {
    const response = new BehaviorSubject(false);
    currentConfirmationModal.set({
      visible: true,
      title: 'Confirmer la suppression',
      message: 'Êtes-vous sûr de vouloir supprimer ce post ?',
      response
    });
    response.asObservable().pipe(
      concatMap((bool) => forkJoin({delete: bool?deletePostById(id):of(undefined), bool: of(bool)})),
      map(({bool}) => bool ? getOwnProfil() : '')
    ).subscribe({
      error: () => currentSnackbar.set({ type: 'ERROR', message: 'An error occured while deleting post' })
    });
  }

  useEffect(() => {
    if (own) {
      getOwnProfil();
    } else if (search) {
      forkJoin({ user: findUserById(search), posts: findAllPostsByUserId(search) }).pipe(
        map(({ user, posts }) => {
          setUser(user);
          setPosts(posts);
        }),
      ).subscribe();
    } else {
      currentUserIndex.onUserIndex().pipe(
        concatMap(userId => {
          if (!userId) return of({ posts: undefined, users: undefined })
          return forkJoin({ posts: findAllPostsByUserId(userId), user: findUserById(userId) })
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
      <ScrollView ref={_scrollview}>
        <View style={styles.bio}>
          <View style={{ paddingVertical: 10 }}>
            <Image style={styles.picture} source={user?.picture ? { uri: user?.picture } : require('../assets/pictures/default.jpg')} />
            <Text style={styles.username}>@{user?.username}</Text>
          </View>
          <Text style={styles.description}>{user?.description}</Text>
          <View style={styles.stats}>
            <View style={styles.follows}>
              <Text style={styles.numbers}>{user?.followers}</Text>
              <Text style={styles.labels}>Followers</Text>
            </View>
            <View style={styles.follows}>
              <Text style={styles.numbers}>{user?.following}</Text>
              <Text style={styles.labels}>Following</Text>
            </View>
            <View style={styles.follows}>
              <Text style={styles.numbers}>
                {posts?.length}
              </Text>
              <Text style={styles.labels}>Posts</Text>
            </View>
          </View>
          {
            !own ?
              <View style={{ width, flexDirection: 'row', justifyContent: 'space-evenly', padding: 10 }}>
                <View style={styles.button}>
                  <Button title='Follow' color="black" />
                </View>
                <View style={styles.button}>
                  <Button title='Message' color="black" />
                </View>
              </View> :
              <View style={{ width, flexDirection: 'row', justifyContent: 'space-evenly', padding: 10 }}>
                <View style={{ ...styles.button, transform: [{ scale: 0.7 }] }}>
                  <Button title='+ Post' color="black" onPress={() => {setCameraMode('post'); currentModalVisible.set(true)}} />
                </View>
                <View style={{ ...styles.button, backgroundColor: 'black' }}>
                  <Button title='+ Weekl' color="white" onPress={() => {setCameraMode('weekl'); currentModalVisible.set(true)}} />
                </View>
                <View style={{ ...styles.button, transform: [{ scale: 0.7 }] }}>
                  {
                    !editMode ?
                      <Button title='Edit' color="black" onPress={() => {setEditMode(true); LayoutAnimation.spring()}} /> :
                      <Button title='Finish editing' color="black" onPress={() => setEditMode(false)} />

                  }
                </View>
                <CameraPost mode={cameraMode} refresh={getOwnProfil} />
              </View>
          }
          {
            own ?
              !logginOut ?
                <Pressable style={styles.logout} onPress={() => onLogoutClick()}>
                  <FontAwesomeIcon icon={inline_logout.faArrowRightFromBracket} size={30} />
                </Pressable> : <ActivityIndicator style={styles.logout} />
              : ''
          }
        </View>
        <GestureDetector gesture={pinch}>
          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
            {posts?.map((post, index) => (
              <View key={index} style={{ width: gridView ? width / 3 : width }} onLayout={e => {
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
                  {
                    editMode ?
                      <Pressable onPress={() => deletePost(post?.uid)} style={{ width: editMode ? 40 : 0, aspectRatio: 1, backgroundColor: 'white', borderRadius: 90, position: 'absolute', top: -10, right: 0, zIndex: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faTrash} color='rgba(0,0,0,0.5)' />
                      </Pressable> : ''
                  }
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </GestureDetector>
      </ScrollView>
      <Comments />
      <ConfirmationModal />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height,
    width,
    paddingTop: height / 10,
    rowGap: 20
  },
  bio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
    textAlign: 'center'
  },
  description: {
    color: 'grey',
    textAlign: 'center',
    padding: 5
  },
  stats: {
    flexDirection: 'row',
    padding: 5,
    paddingBottom: 10
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
    height: 50,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
});

export default Profil;