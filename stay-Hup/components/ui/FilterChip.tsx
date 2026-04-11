import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface FilterChipProps {
  label: string;
  active?: boolean;
  onPress: () => void;
}

export function FilterChip({
  label,
  active = false,
  onPress,
}: FilterChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, active && styles.activeChip]}
      activeOpacity={0.85}
    >
      <Text style={[styles.text, active && styles.activeText]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 10,
  },
  activeChip: {
    backgroundColor: '#2F4CB3',
    borderColor: '#2F4CB3',
  },
  text: {
    color: '#374151',
    fontWeight: '600',
  },
  activeText: {
    color: '#FFFFFF',
  },
});