import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBx0rGIvee-zz75av3pnisS0dNDniH-ItA",
    authDomain: "clone-f44bc.firebaseapp.com",
    databaseURL: "https://clone-f44bc.firebaseio.com",
    projectId: "clone-f44bc",
    storageBucket: "clone-f44bc.appspot.com",
    messagingSenderId: "838517902301",
    appId: "1:838517902301:web:ba70b93af1f17e4ab70434",
    measurementId: "G-D8LM8T5S32"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth }