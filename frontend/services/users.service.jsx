import { arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { concatMap, from, map, of } from "rxjs";
import { auth, db } from "../firebase";

/**
 * Gets user information
 * @param {*} id the id of the user
 * @returns a user
 */
export function findUserById(id) {
  if (!id) return of(undefined);
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("uid", "==", id));
  return from(getDocs(q)).pipe(
    map(querySnapshot => querySnapshot.docs.map(doc => ({ ...doc.data(), userId: doc.id }))[0])
  );
}

/**
 * Searchs a user by username for the moment
 * @param {*} string a string that match user
 * @returns an array of users
 */
export function searchUser(string) {
  if (!string || string === '') return of([])
  const usersRef = collection(db, "users");
  const q = query(usersRef, where('username', '>=', string), where('username', '<=', string + '\uf8ff'));
  return from(getDocs(q)).pipe(
    map(querySnapshot => querySnapshot.docs.map(doc => (doc.data())))
  );
}

export function followUserById(id) {
  const currentId = auth.currentUser.uid;
  return from(findUserById(id)).pipe(
    concatMap(({ userId }) => {
      const followedAccountRef = doc(db, 'users', userId);
      return from(updateDoc(followedAccountRef, {
        followers: arrayUnion(currentId)
      }))
    }),
    concatMap(() => findUserById(currentId)),
    concatMap(({ userId }) => {
      const followingAccountRef = doc(db, 'users', userId);
      return from(updateDoc(followingAccountRef, {
        following: arrayUnion(id)
      }))
    }),
  );
}

export function unfollowUserById(id) {
  const currentId = auth.currentUser.uid;
  return from(findUserById(id)).pipe(
    concatMap(({ userId }) => {
      const followedAccountRef = doc(db, 'users', userId);
      return from(updateDoc(followedAccountRef, {
        followers: arrayRemove(currentId)
      }))
    }),
    concatMap(() => findUserById(currentId)),
    concatMap(({ userId }) => {
      const followingAccountRef = doc(db, 'users', userId);
      return from(updateDoc(followingAccountRef, {
        following: arrayRemove(id)
      }))
    }),
  );
}