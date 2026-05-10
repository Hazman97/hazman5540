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
import bcrypt from "bcryptjs";

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

const SALT_ROUNDS = 10;

async function createStudent() {
  try {
    const studentsRef = collection(db, "attendance_students");

    // Check if exists
    const q = query(studentsRef, where("username", "==", "hazman"));
    const existing = await getDocs(q);

    if (!existing.empty) {
      console.log('Student "hazman" already exists.');
    } else {
      const hashedPassword = bcrypt.hashSync("man123", SALT_ROUNDS);

      const studentData = {
        name: "Hazman",
        username: "hazman",
        password: hashedPassword,
        department: "IT",
        isActive: true,
        createdAt: new Date(),
      };

      await addDoc(studentsRef, studentData);
      console.log('✅ Student account "hazman" created successfully!');
      console.log("   Password is hashed with bcrypt (10 salt rounds)");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

createStudent();
