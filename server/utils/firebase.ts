import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
const creds = {
  "type": "service_account",
  "projectId": "itsmeromian",
  "privateKey": (process.env.FIREBASE_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
  "clientEmail": (process.env.FIREBASE_PRIVATE_KEY as string)
}

export const firestore = getFirestore(
  getApps()[0] ? getApps()[0] : initializeApp({ credential: cert(creds) })
);
