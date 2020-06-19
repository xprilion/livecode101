import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJSQobHBhXhgy4nOVO9f8wiOPJd_AEopk",
  authDomain: "livecode101x.firebaseapp.com",
  databaseURL: "https://livecode101x.firebaseio.com",
  projectId: "livecode101x",
  storageBucket: "livecode101x.appspot.com",
  messagingSenderId: "353991901738",
  appId: "1:353991901738:web:67d5110b3ace4e6b0e3953"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;
