import { router } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import {
  createAccount,
  getAuthErrorMessage,
  loginUser,
} from '@/services/LoginService';

export type LoginMode = 'signin' | 'signup';

export function useAuthForm() {
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

  const changeMode = (newMode: LoginMode) => {
    setMode(newMode);
    setShowPassword(false);
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
        await createAccount({
          name,
          phone,
          email,
          password,
        });
      } else {
        await loginUser({
          email,
          password,
        });
      }

      clearInputs();
      router.replace('/(tabs)' as any);
    } catch (error: any) {
      Alert.alert('Error', getAuthErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  return {
    mode,
    changeMode,
    loading,
    showPassword,
    setShowPassword,

    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    password,
    setPassword,

    isSignUp,
    handleSubmit,
  };
}