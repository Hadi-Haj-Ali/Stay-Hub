import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart, MapPin } from 'lucide-react-native';
import { router } from 'expo-router';

export default function HouseCard({ house, favorites, onToggleFavorite }: any) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: '/home-details',
          params: { house: house.id },
        })
      }
    >
      <Image source={{ uri: house.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{house.title}</Text>
        <Text style={styles.price}>{house.price}</Text>

        <View style={styles.row}>
          <MapPin size={14} color="#777" />
          <Text style={styles.text}>{house.distance}</Text>
        </View>

        <Text style={styles.text}>{house.location}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 160,
  },
  fav: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 20,
  },
  info: {
    padding: 10,
  },
  name: {
    fontWeight: '700',
  },
  price: {
    color: '#2563EB',
    marginVertical: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 4,
    color: '#666',
  },
});