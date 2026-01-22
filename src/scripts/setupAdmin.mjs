// Quick setup script to create initial admin account
// Run with: node src/scripts/setupAdmin.mjs

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1u9jVuJ2B9IAyZCvPvi2VFvEUXEL8EMw",
  authDomain: "photocollection-aaacb.firebaseapp.com",
  projectId: "photocollection-aaacb",
  storageBucket: "photocollection-aaacb.firebasestorage.app",
  messagingSenderId: "1098153185069",
  appId: "1:1098153185069:web:d3dfe08093d65662c88da4",
  measurementId: "G-RY04QP408L",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function setupAdmin() {
  try {
    const adminsRef = collection(db, "attendance_admins");

    // Delete existing admin accounts first
    const existing = await getDocs(adminsRef);
    for (const doc of existing.docs) {
      await deleteDoc(doc.ref);
      console.log("Deleted old admin:", doc.data().username);
    }

    // Create admin account with plain text password
    const adminData = {
      username: "admin",
      password: "admin123", // Plain text password
      name: "Admin",
      createdAt: new Date(),
    };

    await addDoc(adminsRef, adminData);
    console.log("✅ Admin account created successfully!");
    console.log("   Username: admin");
    console.log("   Password: admin123");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

setupAdmin();
