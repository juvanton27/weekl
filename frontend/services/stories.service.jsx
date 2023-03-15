import { addDoc, collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { catchError, concatMap, forkJoin, from, map, throwError } from 'rxjs';
import { auth, db } from '../firebase';

/**
 * Gets all the user ids who have minimum one active story 
 * @returns an array of user ids
 */
export function findAllActiveUserIds() {
  const sevenDaysAgo = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
  const storiesRef = collection(db, "stories");
  const q = query(storiesRef, where("date", ">=", sevenDaysAgo.toISOString()));
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

export function uploadStory(story) {
  const storiesRef = collection(db, "stories");
  return from(fetch(story.uri)).pipe(
    concatMap(response => forkJoin({
      firestore: from(addDoc(storiesRef, {
        user_id: auth.currentUser.uid,
        date: new Date().toISOString(),
        description: 'Rien'
      })),
      blob: response.blob(),
    })),
    concatMap(({firestore, blob}) => {
      const id = firestore.id;
      const token = "sp=racwdl&st=2023-03-15T18:39:41Z&se=2023-03-16T02:39:41Z&skoid=409f9001-20e5-472e-b005-f54de33acceb&sktid=0d16176d-b84e-4dbf-86ae-7d2f69a59908&skt=2023-03-15T18:39:41Z&ske=2023-03-16T02:39:41Z&sks=b&skv=2021-12-02&spr=https&sv=2021-12-02&sr=c&sig=lpiNyNfgdIynx%2Fv5kpmAt%2F4F3larzJxYXDmm%2B3d%2F%2FBU%3D";
      const url = `https://weeklapp.blob.core.windows.net/weekl/videos/${id}.mov`;
      const updateRef = doc(db, 'stories', id);
      return forkJoin({
        azureUpload: from(fetch(`${url}?${token}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "video/mov",
            "x-ms-blob-type": "BlockBlob",
          },
          body: blob
        })),
        firestoreUpdate: from(updateDoc(updateRef, {
          picture: url
        }))
      })
    }),
  );
}