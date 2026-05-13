import { Heart } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ProfileFavoritesEmpty() {
  return (
    <View style={styles.box}>
      <Heart size={56} color="#64748B" />

      <Text style={styles.title}>No favorites yet</Text>

      <Text style={styles.text}>
        Start browsing to save your favorite houses!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 45,
    paddingHorizontal: 18,
    alignItems: 'center',
    elevation: 2,
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginTop: 18,
    marginBottom: 8,
  },
  text: {
    color: '#64748B',
    fontSize: 14,
    textAlign: 'center',
  },
});