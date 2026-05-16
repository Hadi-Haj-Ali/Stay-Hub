import { auth, db } from '@/firebaseConfig';
import { saveUserId } from '@/services/secureStore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

export type SignUpData = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

export type SignInData = {
  email: string;
  password: string;
};

export async function createAccount(data: SignUpData) {
  const result = await createUserWithEmailAndPassword(
    auth,
    data.email.trim(),
    data.password.trim()
  );

  const user = result.user;

  await saveUserId(user.uid);

  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    name: data.name.trim(),
    phone: data.phone.trim(),
    email: data.email.trim(),
    role: 'student',
    createdAt: serverTimestamp(),
  });
}

export async function loginUser(data: SignInData) {
  const result = await signInWithEmailAndPassword(
    auth,
    data.email.trim(),
    data.password.trim()
  );

  await saveUserId(result.user.uid);
}

export function getAuthErrorMessage(code: string) {
  if (code === 'auth/email-already-in-use') {
    return 'This email is already used.';
  }

  if (code === 'auth/invalid-email') {
    return 'Please enter a valid email.';
  }

  if (code === 'auth/weak-password') {
    return 'Password should be at least 6 characters.';
  }

  if (
    code === 'auth/invalid-credential' ||
    code === 'auth/wrong-password' ||
    code === 'auth/user-not-found'
  ) {
    return 'Email or password is incorrect.';
  }

  return 'Something went wrong. Please try again.';
}