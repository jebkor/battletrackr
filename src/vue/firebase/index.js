import Firebase from "firebase";

const db = Firebase.initializeApp({
  apiKey: "AIzaSyC-eQj1sHH7xg6uJD7GBgZIMZFzlEV0B9c",
  authDomain: "dm-toolkit-cf79d.firebaseapp.com",
  databaseURL: "https://dm-toolkit-cf79d.firebaseio.com",
  projectId: "dm-toolkit-cf79d",
  storageBucket: "dm-toolkit-cf79d.appspot.com",
  messagingSenderId: "970352388036"
}).database();

export const toolkitRef = db.ref('');