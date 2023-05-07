import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAKcHO1Wf-Gd6YCI0pOXZKWvAOoHJfu0Dc",
  authDomain: "just-chat-5a316.firebaseapp.com",
  projectId: "just-chat-5a316",
  storageBucket: "just-chat-5a316.appspot.com",
  messagingSenderId: "143974166555",
  appId: "1:143974166555:web:876dacddc849671841c8be",
  measurementId: "G-29M92SPY1S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
export{app,db}