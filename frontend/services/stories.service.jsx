import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { from, map } from 'rxjs';
import { db } from '../firebase';

/**
 * Gets all the user ids who have minimum one active story 
 * @returns an array of user ids
 */
export function findAllActiveUserIds() {
  const storiesRef = collection(db, "stories");
  const q = query(storiesRef);
  return from(getDocs(q)).pipe(
    map(querySnapshot => querySnapshot.docs.map(doc => doc.data().user_id).filter((value, index, array) => array.indexOf(value) === index))
  );
}

/**
 * Gets all active stories of a user 
 * @param {*} id the id of the user
 * @returns an array of stories
 */
export function findAllActiveStoriesByUserId(id) {
  const storiesRef = collection(db, "stories");
  const q = query(storiesRef, where("user_id", "==", id), orderBy("date"));
  return from(getDocs(q)).pipe(
    map(querySnapshot => querySnapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id })))
  )
}