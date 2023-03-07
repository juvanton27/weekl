import { collection, getDocs, query, where } from "firebase/firestore";
import { from, map, of } from "rxjs";
import { db } from "../firebase";

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
    map(querySnapshot => querySnapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id }))[0])
  )
}