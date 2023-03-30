// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAx4Y87CkE8TVYCcMjy_sGZAR9vvmh18tk",
  authDomain: "id-app-f1f1e.firebaseapp.com",
  databaseURL: "https://id-app-f1f1e-default-rtdb.firebaseio.com",
  projectId: "id-app-f1f1e",
  storageBucket: "id-app-f1f1e.appspot.com",
  messagingSenderId: "947555898435",
  appId: "1:947555898435:web:3718b1e02fc8e5b4b7b0f6",
  measurementId: "G-ZWGN4DWP0B"
};


// Initialize Firebase


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {auth}