import { CheckCircle, Plus } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const options = [
  'Wi-Fi',
  'Water',
  'Security',
  'Parking',
  'Kitchen',
  'Study Area',
  'Laundry',
  'AC',
];

type Props = {
  amenities: string[];
  toggleAmenity: (value: string) => void;
};

export default function AddAmenities({ amenities, toggleAmenity }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Amenities</Text>

      <View style={styles.grid}>
        {options.map((item) => {
          const selected = amenities.includes(item);

          return (
            <TouchableOpacity
              key={item}
              style={[styles.item, selected && styles.activeItem]}
              onPress={() => toggleAmenity(item)}
            >
              {selected ? (
                <CheckCircle size={20} color="#2F4CB3" />
              ) : (
                <Plus size={20} color="#64748B" />
              )}

              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 18,
    elevation: 3,
    marginBottom: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  item: {
    width: '30%',
    minHeight: 70,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  activeItem: {
    borderColor: '#2F4CB3',
    backgroundColor: '#EEF3FF',
  },
  text: {
    marginTop: 6,
    fontSize: 12,
    color: '#111827',
    textAlign: 'center',
  },
});