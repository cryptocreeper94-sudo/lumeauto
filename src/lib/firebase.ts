/**
 * LumeAuto — Firebase Client SDK
 * Shared auth via DarkWave Auth Firebase project.
 * 
 * DarkWave Studios LLC — Copyright 2026
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByHm_Zwo9NGZ3DyHtZ5_wCtHlLXcat23Q",
  authDomain: "darkwave-auth.firebaseapp.com",
  projectId: "darkwave-auth",
  storageBucket: "darkwave-auth.firebasestorage.app",
  messagingSenderId: "41307406912",
  appId: "1:41307406912:web:9a674f22472924b52a55a5",
  measurementId: "G-3YHVG8K6L8",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ── Domain Whitelist ──
const ALLOWED_DOMAINS = ['darkwavestudios.com'];
const ALLOWED_EMAILS = ['kathytidwell74@gmail.com', 'rtaron@bellsouth.net', 'cryptocreeper94@gmail.com', 'averymackenna@gmail.com'];

function validateEmailDomain(email: string | null): void {
  if (!email) throw new Error('No email address found on this account.');
  const lower = email.trim().toLowerCase();
  const domain = lower.split('@')[1];
  if (ALLOWED_EMAILS.includes(lower)) return;
  if (!domain || !ALLOWED_DOMAINS.includes(domain)) {
    throw new Error('Access restricted to authorized email addresses.');
  }
}

// ── Providers ──
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("email");
googleProvider.addScope("profile");

// ── Sign-In Helpers ──

export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  validateEmailDomain(result.user.email);
  return result.user;
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  const cleanEmail = email.trim();
  validateEmailDomain(cleanEmail);
  const result = await signInWithEmailAndPassword(auth, cleanEmail, password);
  return result.user;
}

export async function registerWithEmail(email: string, password: string): Promise<User> {
  const cleanEmail = email.trim();
  validateEmailDomain(cleanEmail);
  const result = await createUserWithEmailAndPassword(auth, cleanEmail, password);
  return result.user;
}

export async function firebaseSignOut(): Promise<void> {
  await signOut(auth);
}

export { onAuthStateChanged, type User };
