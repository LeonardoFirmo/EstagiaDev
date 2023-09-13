import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB8Us95ehINqGzBbWuwZlphzR67QSgBLwA",
  authDomain: "estagiadev.firebaseapp.com",
  projectId: "estagiadev",
  storageBucket: "estagiadev.appspot.com",
  messagingSenderId: "839113997914",
  appId: "1:839113997914:web:5aec204304dda5d3e26263",
  measurementId: "G-GBGBS558E7"
};




const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}