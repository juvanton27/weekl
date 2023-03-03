import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { collection, getDocs, query, where } from "firebase/firestore";
import { catchError, concatMap, from, map, of, throwError } from "rxjs";
import { currentIsLogged } from "../App";
import { auth, db } from "../firebase";

/**
 * Verify if an user is logged
 * @returns true if logged, false otherwise
 */
export function isLoggedIn() {
  return from(AsyncStorage.getItem('token')).pipe(
    concatMap(token => {
      if (token !== null)
        return from(axios.get('http://localhost:3000/auth/profil', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }));
      return of({ status: 0 });
    }),
    map(({ status }) => status === 200),
    catchError(() => of(false))
  );
}

/**
 * Gets essentials profil informations
 * @returns {userId, username}
 */
export function getProfil() {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("uid", "==", auth.currentUser.uid));
  return from(getDocs(q)).pipe(
    map(querySnapshot => querySnapshot.docs[0]?.data()),
  );
}

/**
 * Log an user in
 * @param {*} username of the user
 * @param {*} password of the user
 */
export function login(username, password) {
  return from(axios.post('http://localhost:3000/auth/login', { username, password })).pipe(
    map(({ data }) => from(AsyncStorage.setItem('token', data?.access_token))),
    concatMap(() => isLoggedIn()),
    map(bool => currentIsLogged.set(bool)),
    catchError(err => throwError(err))
  );
}

/**
 * Log an user out
 */
export function logout() {
  return from(AsyncStorage.removeItem('token')).pipe(
    concatMap(() => isLoggedIn()),
    map(bool => currentIsLogged.set(bool)),
    catchError(err => throwError(err)),
  );
}

/**
 * Register an user
 * @param {*} username of the user
 * @param {*} password of the user
 * @returns 
 */
export function signup(username, password) {
  return from(axios.post('http://localhost:3000/auth/register', { username, password })).pipe(
    catchError(err => throwError(err)),
  );
}