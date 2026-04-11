import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { AppIcon } from './AppIcon';

interface HouseCardProps {
  house: any;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
}

export function HouseCard({
  house,
  isFavorite,
  onPress,
  onToggleFavorite,
}: HouseCardProps) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <Image
        source={typeof house.image === 'string' ? { uri: house.image } : house.image}
        style={styles.image}
      />

      <TouchableOpacity style={styles.fav} onPress={onToggleFavorite}>
        <AppIcon
          name="heart"
          size={18}
          color={isFavorite ? 'red' : 'gray'}
          fill={isFavorite ? 'red' : 'transparent'}
        />
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={styles.name}>{house.title}</Text>
        <Text style={styles.price}>{house.price}</Text>

        <View style={styles.row}>
          <AppIcon name="map-pin" size={14} color="#777" />
          <Text style={styles.distance}>{house.distance}</Text>
        </View>

        <Text style={styles.location}>{house.location}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
  },
  fav: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 20,
  },
  info: {
    padding: 12,
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
  },
  price: {
    color: '#2563EB',
    marginVertical: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    marginLeft: 4,
    color: '#6B7280',
  },
  location: {
    color: '#6B7280',
  },
});