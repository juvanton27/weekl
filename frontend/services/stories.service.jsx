import { catchError, concatMap, from, map, throwError } from 'rxjs';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const stories = [
  {
    id: 0,
    videos: [
      {
        id: 0,
        date: new Date(new Date().getTime() - 86400004 * 2),
        video: require('../assets/videos/01.mp4')
      },
      {
        id: 1,
        date: new Date(new Date().getTime() - 86400003 * 2),
        video: require('../assets/videos/02.mp4')
      },
      {
        id: 3,
        date: new Date(new Date().getTime() - 86400002 * 2),
        video: require('../assets/videos/03.mp4')
      },
      {
        id: 4,
        date: new Date(new Date().getTime() - 86400001 * 1),
        video: require('../assets/videos/04.mp4')
      },
    ],
  },
  {
    id: 1,
    videos: [
      {
        id: 5,
        date: new Date(new Date().getTime() - 86400003 * 1),
        video: require('../assets/videos/05.mp4')
      },
    ],
  },
  {
    id: 2,
    videos: [
      {
        id: 6,
        date: new Date(new Date().getTime() - 86400002 * 1),
        video: require('../assets/videos/06.mp4')
      },
    ],
  },
  {
    id: 4,
    videos: [
      {
        id: 7,
        date: new Date(new Date().getTime() - 86400001 * 1),
        video: require('../assets/videos/07.mp4')
      },
    ],
  },
];

export function getActiveStoriesByUser(id) {
  return stories.find(s => s.id === id).videos.filter(v => v.date.getTime() >= new Date().getTime() - (7 * 86400000));
}

const url = 'http://localhost:3000/stories'

export function findAllActiveUserIds() {
  return from(AsyncStorage.getItem('token')).pipe(
    concatMap(token => {
      if(token !== null)
        return from(axios.get(`${url}/users`, {
          headers: { Authorization: `Bearer ${token}` }
        }));
        return of({data: undefined})
    }),
    map(({ data }) => data),
    catchError(err => throwError(err))
  );
}

export function findAllActiveStoriesByUserId(id) {
  return from(AsyncStorage.getItem('token')).pipe(
    concatMap(token => {
      if(token !== null)
        return from(axios.get(`${url}/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        }));
        return of({data: undefined})
    }),
    map(({ data }) => data),
    catchError(err => throwError(err))
  )
}

export default stories;