  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOmTnd8Md2yK0SVEwI1l6VbV1M7N8ySaA",
  authDomain: "magneti1001.firebaseapp.com",
  projectId: "magneti1001",
  storageBucket: "magneti1001.appspot.com",
  messagingSenderId: "596941070186",
  appId: "1:596941070186:web:e9af3e1e5ecb7459e80f13",
  measurementId: "G-Z02PPN0HRS"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);