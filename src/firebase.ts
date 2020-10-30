import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA2w8pNOOoJHOFkChagrBnrEXszS6Fu1Bo',
  authDomain: 'twytter1.firebaseapp.com',
  databaseURL: 'https://twytter1.firebaseio.com',
  projectId: 'twytter1',
  storageBucket: 'twytter1.appspot.com',
  messagingSenderId: '336303112622',
  appId: '1:336303112622:web:a4f92cacad2d5c8e28c83f',
  measurementId: 'G-S3JL9XL2Y1',
};

const app = firebase.initializeApp(firebaseConfig);

// Must be in this order
const db = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export enum DbPath {
  Tweets = 'tweets',
}

export { db, auth, storage };
