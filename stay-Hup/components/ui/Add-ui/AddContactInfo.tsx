import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AddInput from './AddInput';

type Props = {
  location: string;
  setLocation: (value: string) => void;

  landlordName: string;
  setLandlordName: (value: string) => void;

  landlordPhone: string;
  setLandlordPhone: (value: string) => void;

  landlordWhatsapp: string;
  setLandlordWhatsapp: (value: string) => void;
};

export default function AddContactInfo({
  location,
  setLocation,
  landlordName,
  setLandlordName,
  landlordPhone,
  setLandlordPhone,
  landlordWhatsapp,
  setLandlordWhatsapp,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Location & Contact</Text>

      <AddInput
        label="Location *"
        placeholder="Example: Near An-Najah University"
        value={location}
        onChangeText={setLocation}
      />

      <AddInput
        label="Your Name *"
        placeholder="Full name"
        value={landlordName}
        onChangeText={setLandlordName}
      />

      <AddInput
        label="Phone Number *"
        placeholder="059xxxxxxx"
        value={landlordPhone}
        onChangeText={setLandlordPhone}
        keyboardType="phone-pad"
      />

      <AddInput
        label="WhatsApp Number"
        placeholder="Optional"
        value={landlordWhatsapp}
        onChangeText={setLandlordWhatsapp}
        keyboardType="phone-pad"
      />
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