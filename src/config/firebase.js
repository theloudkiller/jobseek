// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,signInWithRedirect } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebase from "firebase/app";



const firebaseConfig = {
 apiKey: "AIzaSyAMawOYV_6HtosTYp0RnjNUFb7idBXdwxY",
  authDomain: "web-app-af6cb.firebaseapp.com",
  projectId: "web-app-af6cb",
  storageBucket: "web-app-af6cb.appspot.com",
  messagingSenderId: "761982556411",
  appId: "1:761982556411:web:6e9bbc0a3767d6c286b85e",
  measurementId: "G-ZXF08H1WKC"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();




const signInWithGoogle = async () => {
  try {
    // Start the Google sign-in redirect
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    console.error("Error starting Google sign-in redirect:", error);
  }
};


const auth = getAuth();


export { auth, db, storage, signInWithGoogle,signInWithRedirect, googleProvider }; // Add 'googleProvider' to the export statement
