// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await auth.signInWithPopup(googleProvider);
    // You can handle user data or other logic after successful sign-in
    console.log(result.user);
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

export { auth, db, storage, signInWithGoogle, googleProvider }; // Add 'googleProvider' to the export statement