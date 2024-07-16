import admin from "firebase-admin";
import {
  initializeApp as initializeAdminApp,
} from "firebase-admin/app";
import { FirebaseApp, initializeApp,getApps  } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
// import {getDatabase, ref, set} from "firebase/database"
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

let serviceAccount;
if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
} else {
  // Handle the case where GOOGLE_APPLICATION_CREDENTIALS is not defined
  console.error("GOOGLE_APPLICATION_CREDENTIALS environment variable is not defined.");
}

if (!admin.apps.length) {
    initializeAdminApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://remix-firebase-3622f.firebaseio.com",
    });
  }

  const db = admin.firestore();
const adminAuth = admin.auth();



let Firebase: FirebaseApp | undefined;

// Check if Firebase hasn't been initialized yet
// Check if there are no initialized Firebase apps
if (!getApps().length) {
  Firebase = initializeApp(firebaseConfig);
}

if (!Firebase) {
  console.log("There no is firebase instance")
}
  
async function signIn(email: string, password: string) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }
  
  async function signUp(email: string, password: string) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
  }
  
  async function getSessionToken(idToken: string) {
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

  export interface MoodData {
    date: string;
    note: string;
    emotions: string[];
    mood: string;
    userId: string;
    percent: string;
  }
  
  async function saveMood({ userId, mood, percent, note, emotions }: Omit<MoodData, 'date'>) {
    const moodCollection = db.collection("mood");
    const date = new Date().toISOString();
    
    const moodData: MoodData = {
      userId,
      mood,
      percent,
      note,
      emotions,
      date
    };
  
    await moodCollection.add(moodData);
  }

  const fetchMoodData = async (userId: string): Promise<MoodData[]> => {
    const snapshot = await db.collection("mood").where("userId", "==", userId).get();
    return snapshot.docs.map((doc) => doc.data() as MoodData);
  };

  
  export { db, signUp, getSessionToken, signOutFirebase, signIn, adminAuth, saveMood, fetchMoodData };