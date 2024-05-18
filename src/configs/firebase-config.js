import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCV4usOg_Rdh2L4whJF9MjX7lLU85vqg1s",
  authDomain: "fir-tutorial-5fe2a.firebaseapp.com",
  projectId: "fir-tutorial-5fe2a",
  storageBucket: "fir-tutorial-5fe2a.appspot.com",
  messagingSenderId: "486861123957",
  appId: "1:486861123957:web:4b0b03fd6f5f63ddece33c",
  measurementId: "G-KJ13JBNRW3",
};

// initialize firebase
const app = initializeApp(firebaseConfig);

// initialize firebase authentication
export const auth = getAuth(app);

// initialize cloud firestore
export const db = getFirestore(app);
