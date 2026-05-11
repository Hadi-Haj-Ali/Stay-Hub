import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

type Props = {
  title: string;
  loading: boolean;
  onPress: () => void;
};

export default function LoginButton({ title, loading, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.loginBtn, loading && styles.disabled]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#FFF" />
      ) : (
        <Text style={styles.loginText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  loginBtn: {
    height: 52,
    marginTop: 4,
    borderRadius: 15,
    backgroundColor: '#2F4CB3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  loginText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
});