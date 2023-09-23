// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

import { getAnalytics } from "firebase/analytics";

import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAnRFT_1Js5v1rUqYnIXGXc0KeWsCdb8h8",
  authDomain: "hgscodeclub-32393.firebaseapp.com",
  projectId: "hgscodeclub-32393",
  storageBucket: "hgscodeclub-32393.appspot.com",
  messagingSenderId: "646617551466",
  appId: "1:646617551466:web:52101b654ab6776a0cb013",
  measurementId: "G-NMFMN3N3NM",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

