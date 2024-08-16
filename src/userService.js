// userService.js

// import { db } from './firebase';
// import { doc, setDoc, getDoc } from 'firebase/firestore';

// Update the username for the current user
// export const updateUsername = async (userId, username) => {
//   try {
//     await setDoc(doc(db, 'usernames', userId), {
//       username: username
//     });
//     console.log('Username updated successfully.');
//   } catch (error) {
//     console.error('Error updating username: ', error);
//   }
// };

// // Retrieve the username for the current user
// export const getUsername = async (userId) => {
//   try {
//     const userDoc = await getDoc(doc(db, 'usernames', userId));
//     if (userDoc.exists()) {
//       return userDoc.data().username;
//     } else {
//       console.log('No such document!');
//       return null;
//     }
//   } catch (error) {
//     console.error('Error fetching username: ', error);
//     return null;
//   }
// };
