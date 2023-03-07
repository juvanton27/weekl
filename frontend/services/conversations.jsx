import { addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";
import { concatMap, forkJoin, from, map, of } from "rxjs";
import { db } from "../firebase";
import { findUserById } from "./users.service";

/**
 * Gets all conversations by user id
 * @param {*} id the id of the user
 * @returns all conversations where either the user_1_id or the user_2_id is equal to user id
 */
export function findAllConversationsByUserId(id) {
  const conversationsRef = collection(db, "conversations");
  const q1 = query(conversationsRef, where("user_1_id", "==", id));
  const q2 = query(conversationsRef, where("user_2_id", "==", id));
  return forkJoin({ q1: from(getDocs(q1)), q2: from(getDocs(q2)) }).pipe(
    concatMap(({ q1, q2 }) => {
      const first = q1.docs.map(doc => ({...doc.data(), uid: doc.id}));
      const second = q2.docs.map(doc => ({...doc.data(), uid: doc.id}));
      const result = first.map(conversation => ({
        uid: conversation.uid,
        last_message: conversation.last_message,
        user_id: conversation.user_2_id,
      })).concat(second.map(conversation => ({
        uid: conversation.uid,
        last_message: conversation.last_message,
        user_id: conversation.user_1_id,
      })));
      return of(result);
    }),
    concatMap(conversations => conversations.length > 0 ? forkJoin(conversations.map(conversation => (forkJoin({conversation: of(conversation), user: findUserById(conversation.user_id)})))) : of([])),
    map(conversationsUser => conversationsUser.map(({conversation, user}) => ({...conversation, username: user.username, picture: user.picture})))
  )
}

/**
 * Gets all the messages of a conversation
 * @param {*} id the id of the conversation
 * @returns a messages array
 */
export function findAllMessageByConversationId(id) {
  if (!id) return of([]);
  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, where("conversation_id", "==", id), orderBy('timestamp'), limit(25));
  return from(getDocs(q)).pipe(
    map(querySnapshot => querySnapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id })))
  );
}

/**
 * Add a message in db
 * @param {*} message 
 */
export function sendMessage(message) {
  const messagesRef = collection(db, "messages");
  return from(addDoc(messagesRef, message));
}

/**
 *  Updates the last message of the conversation
 * @param {*} id the id of the conversation
 * @returns 
 */
export function updateLastMessageByConversationId(id, message) {
  const conversationDoc = doc(db, "conversations", id);
  return from(updateDoc(conversationDoc, {last_message: message}))
}