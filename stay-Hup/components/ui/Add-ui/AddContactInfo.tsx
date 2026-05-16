import { MapPin } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

  onUseLocation: () => void;
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
  onUseLocation,
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

      <TouchableOpacity style={styles.locationBtn} onPress={onUseLocation}>
        <MapPin size={18} color="#2F4CB3" />
        <Text style={styles.locationText}>Use Current Location</Text>
      </TouchableOpacity>

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
  locationBtn: {
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    backgroundColor: '#EFF6FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  locationText: {
    color: '#2F4CB3',
    fontSize: 14,
    fontWeight: '800',
    marginLeft: 7,
  },
});