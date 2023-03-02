
import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCL2ySiHE62y9crRlq3HoOyAc-RaY5gQvM",
  authDomain: "myapp-6ff13.firebaseapp.com",
  projectId: "myapp-6ff13",
  storageBucket: "myapp-6ff13.appspot.com",
  messagingSenderId: "698688538812",
  appId: "1:698688538812:web:9db677150fc02f331de8b9"
};

firebase.initializeApp(firebaseConfig);

export default firebase;