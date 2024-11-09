import { type FirebaseOptions, initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const projectId =
	process.env.NODE_ENV === "test"
		? "test"
		: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

const firebaseConfig: FirebaseOptions = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: projectId,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const isDev = process.env.NODE_ENV !== "production";

export const db = getFirestore(app);
if (isDev) {
	connectFirestoreEmulator(db, "127.0.0.1", 8080);
}
