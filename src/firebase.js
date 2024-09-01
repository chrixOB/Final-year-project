// import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc} from "firebase/firestore";

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

// Function to create a user with email and password
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

// Function to update or create username for a given userId
const updateUsername = async (userId, username) => {
  try {
    const userDocRef = doc(db, 'myUsers', userId); // Ensure collection name matches Firestore setup
    await setDoc(userDocRef, { userID: userId, username: username }, { merge: true });
    console.log('Username updated successfully.');
  } catch (error) {
    console.error('Error updating username: ', error);
  }
};

// Retrieve the username for the current user
const getUsername = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'myUsers', userId)); // Ensure collection name matches Firestore setup
    if (userDoc.exists()) {
      return userDoc.data().username;
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching username: ', error);
    return null;
  }
};

// function useQuizData(quizId) {
//   const [quiz, setQuiz] = useState(null);

//   useEffect(() => {
//     const fetchQuizData = async () => {
//       if (!quizId) {
//         console.error('Quiz ID is undefined or null');
//         return;
//       }

//       try {
//         const quizDoc = await getDoc(doc(collection(db, "Quizzes"), quizId));
//         if (quizDoc.exists()) {
//           setQuiz(quizDoc.data());
//         } else {
//           console.log('No such quiz!');
//         }
//       } catch (error) {
//         console.error('Error fetching quiz data:', error);
//       }
//     };

//     fetchQuizData();
//   }, [quizId]);

//   return quiz;
// }

// Export functions
export {
  auth,
  provider,
  signUpWithEmailPassword,
  signInWithPopup,
  logOut,
  sendResetPasswordEmail,
  updateUsername,
  getUsername,
  // useQuizData
};
