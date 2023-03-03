import { addDoc, collection, doc, getDocs, limit, onSnapshot, onSnapshotsInSync, orderBy, query, where } from "firebase/firestore";
import { forkJoin, from, map, of } from "rxjs";
import { db } from "../firebase";

export function findAllConversationsByUserId(id) {
  const conversationsRef = collection(db, "conversations");
  const q1 = query(conversationsRef, where("user_1_id", "==", id));
  const q2 = query(conversationsRef, where("user_2_id", "==", id));
  return forkJoin({q1: from(getDocs(q1)), q2: from(getDocs(q2))}).pipe(
    map(({q1, q2}) => q1.docs.map(doc=>({...doc.data(), uid: doc.id, conv_dest: 2})).concat(q2.docs.map(doc=>({...doc.data(), uid: doc.id, conv_dest: 1})))),
  )
}

export function findAllMessageByConversationId(id) {
  if (!id) return of([]);
  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, where("conversation_id", "==", id), orderBy('timestamp'), limit(25));
  return from(getDocs(q)).pipe(
    map(querySnapshot => querySnapshot.docs.map(doc => ({...doc.data(), uid: doc.id})))
  );
}

export function sendMessage(message) {
  const messagesRef = collection(db, "messages");
  return from(addDoc(messagesRef, message));
}