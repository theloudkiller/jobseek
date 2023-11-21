
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
  appId: "1:761982556411:web:f74777220c626c8686b85e",
  measurementId: "G-YH6L7G222D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);