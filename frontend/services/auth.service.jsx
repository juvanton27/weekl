import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { catchError, concatMap, from, map, of, throwError } from "rxjs";
import { currentIsLogged } from "../App";

export function isLoggedIn() {
  return from(AsyncStorage.getItem('token')).pipe(
    concatMap(token => {
      if (token !== null)
        return from(axios.get('http://localhost:3000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }));
      return of({ status: 0 });
    }),
    map(({ status }) => status === 200),
    catchError(err => console.warn(err.message))
  );
}

export function login(username, password) {
  return from(axios.post('http://localhost:3000/auth/login', { username, password })).pipe(
    map(({ data }) => { console.log(data); return from(AsyncStorage.setItem('token', data?.access_token)) }),
    concatMap(() => isLoggedIn()),
    map(bool => currentIsLogged.set(bool)),
    catchError(err => {
      console.warn(err.message);
      return throwError(err);
    })
  );
}

export function logout() {
  return from(AsyncStorage.removeItem('token')).pipe(
    concatMap(() => isLoggedIn()),
    map(bool => currentIsLogged.set(bool)),
    catchError(err => console.warn(err.message)),
  );
}

export function signup(username, password) {
  return from(axios.post('http://localhost:3000/auth/register', { username, password })).pipe(
    catchError(err => {
      console.warn(err.message);
      return throwError(err);
    }),
  );
}