import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  tip: string;
  loading: boolean;
};

export default function ProfileTipCard({ tip, loading }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Housing Tip</Text>

      <Text style={styles.text}>
        {loading ? 'Loading tip...' : tip}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 18,
    elevation: 3,
    marginBottom: 24,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
});