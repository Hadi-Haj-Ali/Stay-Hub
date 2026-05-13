import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AddTypeSelector from './AddTypeSelector';
import AddInput from './AddInput';

type Props = {
  title: string;
  setTitle: (value: string) => void;

  description: string;
  setDescription: (value: string) => void;

  price: string;
  setPrice: (value: string) => void;

  type: string;
  setType: (value: string) => void;
};

export default function AddBasicInfo({
  title,
  setTitle,
  description,
  setDescription,
  price,
  setPrice,
  type,
  setType,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Basic Information</Text>

      <AddInput
        label="House Title *"
        placeholder="Example: Modern Student House"
        value={title}
        onChangeText={setTitle}
      />

      <AddInput
        label="Description *"
        placeholder="Write some details about the house"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <AddInput
        label="Monthly Rent *"
        placeholder="Example: 450 ILS"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <AddTypeSelector selectedType={type} setSelectedType={setType} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 18,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 16,
  },
});