// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRAaABWNHExmQ_Ea1g2CXd564qg1arkUw",
  authDomain: "b-4eec9.firebaseapp.com",
  projectId: "b-4eec9",
  storageBucket: "b-4eec9.appspot.com",
  messagingSenderId: "505224528049",
  appId: "1:505224528049:web:0fc6f51da89b9ab55e6290",
  measurementId: "G-CP4R4KD7G1",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
