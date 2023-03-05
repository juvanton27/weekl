import { collection, getDocs, query, where } from 'firebase/firestore';
import { from, map, of } from 'rxjs';
import { db } from '../firebase';

/**
 * Gets all posts by user id
 * @param {*} id the id of the user
 * @returns a posts array
 */
export function findAllPostsByUserId(id) {
  const postsRef = collection(db, "posts");
  const q = query(postsRef, where("user_id", "==", id));
  return from(getDocs(q)).pipe(
    map(querySnapshot => querySnapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id }))),
  );
}

/**
 * Gets all the comments of a post
 * @param {*} id the id of the post
 * @returns a comments array
 */
export function findAllCommentsByPostId(id) {
  if (!id) return of([]);
  const commentsRef = collection(db, "comments");
  const q = query(commentsRef, where("post_id", "==", id));
  return from(getDocs(q)).pipe(
    map(querySnapshot => querySnapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id })))
  )
}