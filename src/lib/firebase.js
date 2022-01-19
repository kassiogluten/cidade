import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBfuXJY6R2k_tCVbgjOq_0l5BLyDXtVAtE",
  authDomain: "painel-kassio-site.firebaseapp.com",
  projectId: "painel-kassio-site",
  storageBucket: "painel-kassio-site.appspot.com",
  messagingSenderId: "122795262720",
  appId: "1:122795262720:web:3d1e2b85c1b8ea3821a9e5",
  measurementId: "G-GVT1Q7QET4",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firestore = firebase.firestore();
