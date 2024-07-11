import admin from "firebase-admin";
import {
  applicationDefault,
  initializeApp as initializeAdminApp,
} from "firebase-admin/app";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

if (!admin.apps.length) {
    initializeAdminApp({
      credential: applicationDefault(),
      databaseURL: "https://remix-firebase-3622f.firebaseio.com",
    });
  }

  const db = admin.firestore();
const adminAuth = admin.auth();

let Firebase;

if (!Firebase?.apps?.length) {
    Firebase = initializeApp(firebaseConfig);
  }

  
async function signIn(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }
  
  async function signUp(email, password) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
  }
  
  async function getSessionToken(idToken) {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    if (new Date().getTime() / 1000 - decodedToken.auth_time > 5 * 60) {
      throw new Error("Recent sign in required");
    }
    const twoWeeks = 60 * 60 * 24 * 14 * 1000;
    return adminAuth.createSessionCookie(idToken, { expiresIn: twoWeeks });
  }
  
  async function signOutFirebase() {
    await signOut(getAuth());
  }
  
  export { db, signUp, getSessionToken, signOutFirebase, signIn, adminAuth };