import { collection, getDocs, query, where } from 'firebase/firestore';
import { concatMap, forkJoin, from, map, of } from 'rxjs';
import { db } from '../firebase';
import { findUserById } from './users.service';

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
 * @returns a comments with user informations array
 */
export function findAllCommentsByPostId(id) {
  if (!id) return of([]);
  const commentsRef = collection(db, "comments");
  const q = query(commentsRef, where("post_id", "==", id));
  return from(getDocs(q)).pipe(
    concatMap(querySnapshot => of(querySnapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id })))),
    concatMap(comments => comments.length > 0 ? forkJoin(comments.map(comment => (forkJoin({comment: of(comment), user: findUserById(comment.user_id)})))): of([])),
    map(commentsUser => commentsUser.map(({comment, user}) => ({...comment, username: user.username, picture: user.picture})))
  )
}