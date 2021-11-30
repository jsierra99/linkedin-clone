import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const firebaseConfig = 
{
  apiKey: "AIzaSyC0uJ_0qWvOqlEGbhtEOrsfdRKC2Uvq2wg",
  authDomain: "linkedin-clone-2d2a4.firebaseapp.com",
  projectId: "linkedin-clone-2d2a4",
  storageBucket: "linkedin-clone-2d2a4.appspot.com",
  messagingSenderId: "596406878889",
  appId: "1:596406878889:web:61f92abeca1394f69a1fb8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebaseApp.storage();

export { auth, provider, storage };
export default db;