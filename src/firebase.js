// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyB61XV5py-yatD5_cIfV5ZNilOqo2F91GQ", // 🔁 replace with your real config
  authDomain: "fir-1-f7ca7.firebaseapp.com",
  projectId: "fir-1-f7ca7",
  storageBucket: "fir-1-f7ca7.firebasestorage.app",
  messagingSenderId: "820103152903",
  appId: "1:820103152903:web:abefd0f81cef3fbdc671a2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

