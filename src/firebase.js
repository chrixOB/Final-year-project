// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCkEnyDjLUw4Ei2xlLL4LgUQPsJy8qQUs",
  authDomain: "pro-tutor-f2a80.firebaseapp.com",
  projectId: "pro-tutor-f2a80",
  storageBucket: "pro-tutor-f2a80.appspot.com",
  messagingSenderId: "316867394582",
  appId: "1:316867394582:web:415a8f415d136cfb7d8937",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Function to create user with email and password
const signUpWithEmailPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Function to log out
const logOut = () => {
  return signOut(auth);
};

// Function to send a password reset email
const sendResetPasswordEmail = (email) => {
  return sendPasswordResetEmail(auth, email);
};

// Function to load lessons from Firestore
const loadLessons = async () => {
  const lessonsCol = collection(db, 'lessons');
  const lessonsSnapshot = await getDocs(lessonsCol);
  const lessonsList = lessonsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return lessonsList;
};

// Function to load a single lesson from Firestore by ID
const loadLessonById = async (id) => {
  const lessonDoc = doc(db, 'lessons', id);
  const lessonSnapshot = await getDoc(lessonDoc);
  return lessonSnapshot.exists() ? lessonSnapshot.data() : null;
};

// Export functions
export { auth, provider, signUpWithEmailPassword, signInWithPopup, logOut, sendResetPasswordEmail, loadLessons, loadLessonById };
