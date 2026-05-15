import { auth, db } from '@/firebaseConfig';
import { saveUserId} from '@/secureStore';
import { router } from 'expo-router';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

import LoginForm from '../ui/Login-ui/LoginForm';
import LoginHeader from '../ui/Login-ui/LoginHeader';
import { LoginMode } from '../ui/Login-ui/LoginTabs';

export default function AuthScreen() {
  const [mode, setMode] = useState<LoginMode>('signin');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isSignUp = mode === 'signup';

  const clearInputs = () => {
    setName('');
    setPhone('');
    setEmail('');
    setPassword('');
    setShowPassword(false);
  };

 const signUp = async () => {
  const result = await createUserWithEmailAndPassword(
    auth,
    email.trim(),
    password.trim()
  );

  const user = result.user;

  await saveUserId(user.uid);

  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    name: name.trim(),
    phone: phone.trim(),
    email: email.trim(),
    role: 'student',
    createdAt: serverTimestamp(),
  });
};

  const signIn = async () => {
  const result = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    password.trim()
  );

  await saveUserId(result.user.uid);
};


  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing Fields', 'Please enter your email and password');
      return;
    }

    if (isSignUp && (!name.trim() || !phone.trim())) {
      Alert.alert('Missing Fields', 'Please enter your name and phone number');
      return;
    }

    try {
      setLoading(true);

      if (isSignUp) {
        await signUp();
      } else {
        await signIn();
      }

      clearInputs();
      router.replace('/(tabs)' as any);
    } catch (error: any) {
      Alert.alert('Error', getAuthErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const changeMode = (newMode: LoginMode) => {
    setMode(newMode);
    setShowPassword(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <LoginHeader isSignUp={isSignUp} />

        <LoginForm
          mode={mode}
          setMode={changeMode}
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          loading={loading}
          onSubmit={handleSubmit}
        />

        <Text style={styles.terms}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function getAuthErrorMessage(code: string) {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  terms: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 18,
  },
});