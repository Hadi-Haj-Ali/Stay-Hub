import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { useAuthForm } from '@/hooks/useLoginForm';
import LoginForm from '../ui/Login-ui/LoginForm';
import LoginHeader from '../ui/Login-ui/LoginHeader';
export default function AuthScreen() {
  const authForm = useAuthForm();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <LoginHeader isSignUp={authForm.isSignUp} />

        <LoginForm
          mode={authForm.mode}
          setMode={authForm.changeMode}
          name={authForm.name}
          setName={authForm.setName}
          phone={authForm.phone}
          setPhone={authForm.setPhone}
          email={authForm.email}
          setEmail={authForm.setEmail}
          password={authForm.password}
          setPassword={authForm.setPassword}
          showPassword={authForm.showPassword}
          setShowPassword={authForm.setShowPassword}
          loading={authForm.loading}
          onSubmit={authForm.handleSubmit}
        />

        <Text style={styles.terms}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
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