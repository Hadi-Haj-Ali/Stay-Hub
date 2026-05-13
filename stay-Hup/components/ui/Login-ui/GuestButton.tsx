import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  onPress: () => void;
};

export default function GuestButton({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.guestBtn} onPress={onPress}>
      <Text style={styles.guestText}>Continue as Guest</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  guestBtn: {
    height: 52,
    marginTop: 18,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
});