import { Lock, Mail, Phone, User } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import LoginButton from './Login-ui/LoginButton';
import LoginInput from './LoginInput';
import LoginTabs, { LoginMode } from './LoginTabs';

type Props = {
  mode: LoginMode;
  setMode: (value: LoginMode) => void;

  name: string;
  setName: (value: string) => void;

  phone: string;
  setPhone: (value: string) => void;

  email: string;
  setEmail: (value: string) => void;

  password: string;
  setPassword: (value: string) => void;

  showPassword: boolean;
  setShowPassword: (value: boolean) => void;

  loading: boolean;
  onSubmit: () => void;
};

export default function LoginForm({
  mode,
  setMode,
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  loading,
  onSubmit,
}: Props) {
  const signUp = mode === 'signup';

  return (
    <View style={styles.card}>
      <LoginTabs mode={mode} setMode={setMode} />

      {signUp && (
        <>
          <LoginInput
            label="Full Name"
            icon={<User size={20} color="#64748B" />}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />

          <LoginInput
            label="Phone Number"
            icon={<Phone size={20} color="#64748B" />}
            placeholder="059xxxxxxx"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </>
      )}

      <LoginInput
        label="Email"
        icon={<Mail size={20} color="#64748B" />}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <LoginInput
        label="Password"
        icon={<Lock size={20} color="#64748B" />}
        placeholder={signUp ? 'Create password' : 'Enter password'}
        value={password}
        onChangeText={setPassword}
        secure={!showPassword}
        showToggle
        onToggleSecure={() => setShowPassword(!showPassword)}
      />

      <LoginButton
        title={signUp ? 'Create Account' : 'Sign In'}
        loading={loading}
        onPress={onSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    borderRadius: 22,
    backgroundColor: '#FFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
  },
});