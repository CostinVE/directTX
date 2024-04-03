import { initializeApp } from "firebase/app";
import { getAuth as firebaseGetAuth, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import { getStorage} from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIY74pn9-27GOxzCL4k4tMdrqmjgtPpD8",
  authDomain: "directtx-f34b3.firebaseapp.com",
  databaseURL: "https://directtx-f34b3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "directtx-f34b3",
  storageBucket: "directtx-f34b3.appspot.com",
  messagingSenderId: "631778574144",
  appId: "1:631778574144:web:da28e42293b00c15f604a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = firebaseGetAuth(app)
export const googleProvider =  new GoogleAuthProvider



export const db = getFirestore(app)
export const storage = getStorage(app)