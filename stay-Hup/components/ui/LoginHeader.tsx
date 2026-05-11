import { Home } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  isSignUp: boolean;
};

export default function LoginHeader({ isSignUp }: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.logo}>
        <Home size={34} color="#FFF" />
      </View>

      <Text style={styles.title}>
        {isSignUp ? 'Create Account' : 'Welcome Back'}
      </Text>

      <Text style={styles.subTitle}>
        {isSignUp
          ? 'Create your account to find student housing'
          : 'Sign in to find your student house'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logo: {
    width: 68,
    height: 68,
    marginBottom: 16,
    borderRadius: 20,
    backgroundColor: '#2F4CB3',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  title: {
    marginBottom: 8,
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
  },
  subTitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },
});