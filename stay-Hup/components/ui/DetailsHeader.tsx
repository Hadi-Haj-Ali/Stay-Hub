import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ArrowLeft, Heart } from 'lucide-react-native';

type Props = {
  house: any;
  onBack: () => void;
 
};

export default function DetailsHeader({
  house,
  onBack,
}: Props) {
  return (
    <View style={styles.imageBox}>
      <Image
        source={
          typeof house.image === 'string'
            ? { uri: house.image }
            : house.image
        }
        style={styles.image}
      />

      <View style={styles.topBtns}>
        <TouchableOpacity style={styles.circleBtn} onPress={onBack}>
          <ArrowLeft size={20} color="#111" />
        </TouchableOpacity>

      </View>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>{house.type || 'Room'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageBox: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 260,
  },
  topBtns: {
    position: 'absolute',
    top: 15,
    left: 15,
    right: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circleBtn: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
  },
  badge: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    backgroundColor: '#2563EB',
    padding: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '600',
  },
});