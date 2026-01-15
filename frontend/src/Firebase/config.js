import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6uSVtyFGgot7IqKkrxn2GEnfY8lkrpDA",
  authDomain: "myapp-488ef.firebaseapp.com",
  projectId: "myapp-488ef",
  storageBucket: "myapp-488ef.appspot.com",
  messagingSenderId: "53909885361",
  appId: "1:53909885361:web:abcd1234ef56789",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

export default app;
