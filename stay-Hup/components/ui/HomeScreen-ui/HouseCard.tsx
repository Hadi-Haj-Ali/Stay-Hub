import { router } from 'expo-router';
import { Heart, MapPin } from 'lucide-react-native';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HouseCard({
  house,
  favorites,
  onToggleFavorite,
}: any) {
  const isFavorite = favorites.includes(house.id);

  const openDetails = () => {
    router.push({
      pathname: '/home-details',
      params: { id: house.id },
    });
  };

  const handleFavorite = () => {
    onToggleFavorite(house.id);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={openDetails}
    >
      <View style={styles.imageBox}>
        <Image source={{ uri: house.image }} style={styles.image} />

        <TouchableOpacity
          style={styles.favBtn}
          onPress={handleFavorite}
          activeOpacity={0.8}
        >
          <Heart
            size={22}
            color={isFavorite ? '#EF4444' : '#64748B'}
            fill={isFavorite ? '#EF4444' : 'transparent'}
          />
        </TouchableOpacity>

        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>
            {house.type || 'Single Room'}
          </Text>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{house.title}</Text>
        <Text style={styles.price}>{house.price}</Text>

        <View style={styles.locationRow}>
          <MapPin size={16} color="#64748B" />
          <Text style={styles.location}>
            {house.distance || house.location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    marginBottom: 18,
    overflow: 'hidden',
    elevation: 3,
  },
  imageBox: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 190,
    backgroundColor: '#E5E7EB',
  },
  favBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeBadge: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    backgroundColor: '#2F4CB3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  typeText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  info: {
    padding: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 7,
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2F4CB3',
    marginBottom: 10,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    marginLeft: 6,
    color: '#64748B',
    fontSize: 14,
  },
});