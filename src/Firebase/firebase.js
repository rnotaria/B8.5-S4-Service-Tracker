import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDW_WYb8GiS-CioR0dEIWCcuLLD3-qXLVw",
  authDomain: "servicetracker-5abb6.firebaseapp.com",
  databaseURL: "https://servicetracker-5abb6.firebaseio.com",
  projectId: "servicetracker-5abb6",
  storageBucket: "servicetracker-5abb6.appspot.com",
  messagingSenderId: "966364552460",
  appId: "1:966364552460:web:c7b0841f48f4971aad7d29",
  measurementId: "G-N353GX2HNS",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
// db.settings({ timestampsInSnapshots: true });

// export default firebase;
