import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {

  apiKey: "AIzaSyAceCRB16nXtboiT3S1rli6aELYWJj4c7A",
  authDomain: "reactapp-3f238.firebaseapp.com",
  projectId: "reactapp-3f238",
  storageBucket: "reactapp-3f238.appspot.com",
  messagingSenderId: "304453488499",
  appId: "1:304453488499:web:3a380f280faa386ac77f06",

};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app)
export const storage = getStorage(app)

