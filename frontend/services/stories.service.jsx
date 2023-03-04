import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { catchError, concatMap, from, map, throwError } from 'rxjs';
import { db } from '../firebase';

const stories = [
  {
    id: 0,
    videos: [
      {
        id: 0,
        date: new Date(new Date().getTime() - 86400004 * 2),
        // video: require('../assets/videos/01.mp4')
      },
      {
        id: 1,
        date: new Date(new Date().getTime() - 86400003 * 2),
        // video: require('../assets/videos/02.mp4')
      },
      {
        id: 3,
        date: new Date(new Date().getTime() - 86400002 * 2),
        // video: require('../assets/videos/03.mp4')
      },
      {
        id: 4,
        date: new Date(new Date().getTime() - 86400001 * 1),
        // video: require('../assets/videos/04.mp4')
      },
    ],
  },
  {
    id: 1,
    videos: [
      {
        id: 5,
        date: new Date(new Date().getTime() - 86400003 * 1),
        // video: require('../assets/videos/05.mp4')
      },
    ],
  },
  {
    id: 2,
    videos: [
      {
        id: 6,
        date: new Date(new Date().getTime() - 86400002 * 1),
        // video: require('../assets/videos/06.mp4')
      },
    ],
  },
  {
    id: 4,
    videos: [
      {
        id: 7,
        date: new Date(new Date().getTime() - 86400001 * 1),
        // video: require('../assets/videos/07.mp4')
      },
    ],
  },
];

export function findAllActiveUserIds() {
  const storiesRef = collection(db, "stories");
  const q = query(storiesRef);
  return from(getDocs(q)).pipe(
    map(querySnapshot => querySnapshot.docs.map(doc => doc.data().user_id).filter((value, index, array) => array.indexOf(value) === index))
  );
}

export function findAllActiveStoriesByUserId(id) {
  const storiesRef = collection(db, "stories");
  const q = query(storiesRef, where("user_id", "==", id), orderBy("date"));
  return from(getDocs(q)).pipe(
    map(querySnapshot => querySnapshot.docs.map(doc => ({...doc.data(), uid: doc.id})))
  )
}

export default stories;