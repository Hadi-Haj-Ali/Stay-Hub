import { MapPin } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AddContactInfo from '../../ui/Add-ui/AddContactInfo';

type Props = {
  location: string;
  landlordName: string;
  landlordPhone: string;
  landlordWhatsapp: string;
  setValue: (name: any, value: any) => void;
  onUseLocation: () => void;
};

export default function AddContactStep({
  location,
  landlordName,
  landlordPhone,
  landlordWhatsapp,
  setValue,
  onUseLocation,
}: Props) {
  return (
    <View>
      <AddContactInfo
        location={location}
        setLocation={(value: string) => setValue('location', value)}
        landlordName={landlordName}
        setLandlordName={(value: string) => setValue('landlordName', value)}
        landlordPhone={landlordPhone}
        setLandlordPhone={(value: string) => setValue('landlordPhone', value)}
        landlordWhatsapp={landlordWhatsapp}
        setLandlordWhatsapp={(value: string) =>
          setValue('landlordWhatsapp', value)
        }
        onUseLocation={onUseLocation}
      />

      <TouchableOpacity style={styles.locationBtn} onPress={onUseLocation}>
        <MapPin size={18} color="#2F4CB3" />
        <Text style={styles.locationText}>Use Current Location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  locationBtn: {
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    backgroundColor: '#EFF6FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  locationText: {
    color: '#2F4CB3',
    fontSize: 14,
    fontWeight: '800',
    marginLeft: 7,
  },
});