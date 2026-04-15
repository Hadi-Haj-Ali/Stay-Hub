import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function FilterChips({ filter, setFilter }: any) {
  return (
    <View style={styles.filters}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {['all', 'single', 'shared'].map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.chip, filter === f && styles.activeChip]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.text, filter === f && styles.activeText]}>
              {f === 'all'
                ? 'All'
                : f === 'single'
                ? 'Single Room'
                : 'Shared Room'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  filters: {
    padding: 12,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  activeChip: {
    backgroundColor: '#2F4CB3',
  },
  text: {
    color: '#333',
  },
  activeText: {
    color: '#fff',
  },
});