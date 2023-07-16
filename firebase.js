// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdfrjM69zStP0RXw5SCauUlGyccIEpo04",
  authDomain: "summarist-aa339.firebaseapp.com",
  projectId: "summarist-aa339",
  storageBucket: "summarist-aa339.appspot.com",
  messagingSenderId: "690114814184",
  appId: "1:690114814184:web:f5afcad81da435bb88e95d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)