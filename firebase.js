import firebase from 'firebase/app'
//import { initializeApp } from "firebase/app";
import 'firebase/firestore';
//import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// const app = initializeApp(firebaseConfig);

!firebase.apps.length? firebase.initializeApp(firebaseConfig) :firebase.app()

const db = firebase.firestore()
//const db = firebase.firestore.getFirestore()

export {firebase,db} 




