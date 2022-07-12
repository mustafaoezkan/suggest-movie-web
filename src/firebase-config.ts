import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCh981GyW8OQ0X28MMkkMKkuB3NSsNfuOE",
  authDomain: "suggest-movie-auth.firebaseapp.com",
  projectId: "suggest-movie-auth",
  storageBucket: "suggest-movie-auth.appspot.com",
  messagingSenderId: "616150542460",
  appId: "1:616150542460:web:ff14468c4a50e6af5581f9",
  measurementId: "G-088KVLGP9X"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);