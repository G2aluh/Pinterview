

import { initializeApp,getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjmM3rLL9sDTIdkHQO-MV0RpPm84R_b58",
  authDomain: "pinterview-448e1.firebaseapp.com",
  projectId: "pinterview-448e1",
  storageBucket: "pinterview-448e1.firebasestorage.app",
  messagingSenderId: "782344756977",
  appId: "1:782344756977:web:464f6612a14b4f6d3a5350",
  measurementId: "G-BGQNLDERN9"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig): getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);