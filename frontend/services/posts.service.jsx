import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { catchError, concatMap, forkJoin, from, map, of, throwError } from 'rxjs';
import { auth, db } from '../firebase';
import { findUserById } from './users.service';

/**
 * Gets all posts by user id
 * @param {*} id the id of the user
 * @returns a posts array
 */
export function findAllPostsByUserId(id) {
  const postsRef = collection(db, "posts");
  const q = query(postsRef, where("user_id", "==", id), orderBy("date", "desc"));
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
    concatMap(comments => comments.length > 0 ? forkJoin(comments.map(comment => (forkJoin({ comment: of(comment), user: findUserById(comment.user_id) })))) : of([])),
    map(commentsUser => commentsUser.map(({ comment, user }) => ({ ...comment, username: user.username, picture: user.picture })))
  )
}

export function uploadPicture(picture) {
  const postsRef = collection(db, "posts");
  return from(fetch(picture.uri)).pipe(
    concatMap(response => forkJoin({
      firestore: from(addDoc(postsRef, {
        user_id: auth.currentUser.uid,
        date: new Date().toISOString()
      })),
      blob: response.blob(),
    })),
    concatMap(({firestore, blob}) => {
      const id = firestore.id;
      const token = "sp=racwdl&st=2023-03-15T09:56:44Z&se=2023-03-15T17:56:44Z&skoid=409f9001-20e5-472e-b005-f54de33acceb&sktid=0d16176d-b84e-4dbf-86ae-7d2f69a59908&skt=2023-03-15T09:56:44Z&ske=2023-03-15T17:56:44Z&sks=b&skv=2021-12-02&spr=https&sv=2021-12-02&sr=c&sig=K8Aa2p5i5vv0WE1zQeeVRU%2FNyok53ymZIlWC0GBBRE4%3D";
      const url = `https://weeklapp.blob.core.windows.net/weekl/posts/${id}.jpg`;
      const updateRef = doc(db, 'posts', id);
      return forkJoin({
        azureUpload: from(fetch(`${url}?${token}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "image/jpeg",
            "x-ms-blob-type": "BlockBlob",
          },
          body: blob
        })),
        firestoreUpdate: from(updateDoc(updateRef, {
          picture: url
        }))
      })
    }),
    catchError(throwError)
  );
}

export function deletePostById(id) {
  const token = "sp=racwdl&st=2023-03-15T09:56:44Z&se=2023-03-15T17:56:44Z&skoid=409f9001-20e5-472e-b005-f54de33acceb&sktid=0d16176d-b84e-4dbf-86ae-7d2f69a59908&skt=2023-03-15T09:56:44Z&ske=2023-03-15T17:56:44Z&sks=b&skv=2021-12-02&spr=https&sv=2021-12-02&sr=c&sig=K8Aa2p5i5vv0WE1zQeeVRU%2FNyok53ymZIlWC0GBBRE4%3D";
  const url = `https://weeklapp.blob.core.windows.net/weekl/posts/${id}.jpg`;
  return from(fetch(`${url}?${token}`, {
    method: 'DELETE'
  })).pipe(
    concatMap(() => from(deleteDoc(doc(db, "posts", id))))
  );
}