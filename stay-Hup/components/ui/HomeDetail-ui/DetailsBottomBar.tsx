import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';
import { Phone, MessageCircle } from 'lucide-react-native';

type Props = {
  house: any;
};

export default function DetailsBottomBar({ house }: Props) {
  const handleCall = async () => {
    const phone = house.phone || house.landlord?.phone;

    if (!phone) {
      console.log('No phone number');
      return;
    }

    const url = `tel:${phone}`;
    const ok = await Linking.canOpenURL(url);
    if (ok) Linking.openURL(url);
  };

  const handleWhatsApp = async () => {
    const phone = String(house.phone || house.landlord?.whatsapp || '').replace(/\D/g, '');

    if (!phone) {
      console.log('No phone number');
      return;
    }

    const url = `https://wa.me/${phone}`;

    try {
      await Linking.openURL(url);
    } catch (e) {
      console.log('WhatsApp error:', e);
    }
  };

  return (
    <View style={styles.bottom}>
      <TouchableOpacity style={styles.callBtn} onPress={handleCall}>
        <Phone size={18} color="#2563EB" />
        <Text style={styles.callText}>Call</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.whatsappBtn} onPress={handleWhatsApp}>
        <MessageCircle size={18} color="#fff" />
        <Text style={styles.whatsappText}>WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
  },
  callBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#2563EB',
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  callText: {
    color: '#2563EB',
  },
  whatsappBtn: {
    flex: 1,
    backgroundColor: '#16A34A',
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 8,
    gap: 5,
  },
  whatsappText: {
    color: '#fff',
  },
});