import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { catchError, concatMap, from, map, throwError } from "rxjs";

const firebaseConfig = {
  apiKey: "AIzaSyCC6JdXeiEiKhKQymVVLmgbZUBS8T7lKIA",
  authDomain: "weeklapp.firebaseapp.com",
  projectId: "weeklapp",
  storageBucket: "weeklapp.appspot.com",
  messagingSenderId: "641879100610",
  appId: "1:641879100610:web:1b039d47ff804b28c67f5b",
  measurementId: "G-1WHJPKM4W2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = (email, password) => {
  return from(signInWithEmailAndPassword(auth, email, password))
};

const registerWithEmailAndPassword = (username, email, password) => {
  return from(createUserWithEmailAndPassword(auth, email, password)).pipe(
    map(({user}) => {
      from(addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email,
      followers: 0,
      following: 0,
      picture: null,
      username,
      description: null
    }))}),
  )
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  return from(signOut(auth));
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};