import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  number: string;
  label: string;
};

export default function ProfileStatCard({ number, label }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 105,
    borderRadius: 18,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    marginHorizontal: 5,
  },
  number: {
    fontSize: 23,
    fontWeight: '800',
    color: '#2F4CB3',
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    color: '#64748B',
  },
});