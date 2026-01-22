// Script to create the student account 'hazman'
// Run with: node src/scripts/createStudent.mjs

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
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

async function createStudent() {
  try {
    const studentsRef = collection(db, "attendance_students");

    // Check if exists
    const q = query(studentsRef, where("username", "==", "hazman"));
    const existing = await getDocs(q);

    if (!existing.empty) {
      console.log('Student "hazman" already exists.');
      // Optional: Update password if needed, but for now just exit if exists to avoid dupes
      // passing true to update logic could be added here
    } else {
      const studentData = {
        name: "Hazman",
        username: "hazman",
        password: "man123", // Plain text as per previous change
        department: "IT",
        isActive: true,
        createdAt: new Date(),
      };

      await addDoc(studentsRef, studentData);
      console.log('✅ Student account "hazman" created successfully!');
    }

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

createStudent();
