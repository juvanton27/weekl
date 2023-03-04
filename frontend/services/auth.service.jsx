import { collection, getDocs, query, where } from "firebase/firestore";
import { from, map } from "rxjs";
import { auth, db } from "../firebase";

/**
 * Gets logged user informations
 * @returns a user
 */
export function getProfil() {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("uid", "==", auth.currentUser.uid));
  return from(getDocs(q)).pipe(
    map(querySnapshot => querySnapshot.docs[0]?.data()),
  );
}