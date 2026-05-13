import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const types = ['Single Room', 'Shared Room', 'Bedsitter', 'Studio'];

type Props = {
  selectedType: string;
  setSelectedType: (value: string) => void;
};

export default function AddTypeSelector({ selectedType, setSelectedType }: Props) {
  return (
    <View style={styles.box}>
      <Text style={styles.label}>House Type *</Text>

      <View style={styles.grid}>
        {types.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.typeBtn,
              selectedType === item && styles.activeBtn,
            ]}
            onPress={() => setSelectedType(item)}
          >
            <Text
              style={[
                styles.typeText,
                selectedType === item && styles.activeText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 7,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  typeBtn: {
    width: '48%',
    height: 45,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBtn: {
    backgroundColor: '#2F4CB3',
    borderColor: '#2F4CB3',
  },
  typeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  activeText: {
    color: '#FFF',
  },
});