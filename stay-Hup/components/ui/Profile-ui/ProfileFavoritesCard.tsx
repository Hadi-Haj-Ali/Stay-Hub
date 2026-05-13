import { MapPin } from 'lucide-react-native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type House = {
  id: string;
  title?: string;
  price?: string;
  location?: string;
  distance?: string;
  image?: string;
};

type Props = {
  houses: House[];
};

export default function ProfileFavoritesCard({ houses }: Props) {
  if (houses.length === 0) {
    return (
      <View style={styles.emptyBox}>
        <Text style={styles.emptyTitle}>No favorites yet</Text>
        <Text style={styles.emptyText}>
          Start browsing to save your favorite houses!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      {houses.map((house) => (
        <View key={house.id} style={styles.item}>
          {house.image ? (
            <Image source={{ uri: house.image }} style={styles.image} />
          ) : (
            <View style={styles.noImage} />
          )}

          <View style={styles.info}>
            <Text style={styles.title}>{house.title || 'No title'}</Text>
            <Text style={styles.price}>{house.price || '-'}</Text>

            <View style={styles.row}>
              <MapPin size={14} color="#64748B" />
              <Text style={styles.location}>
                {house.distance || house.location || '-'}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 14,
    elevation: 3,
    marginBottom: 24,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F7',
    paddingBottom: 12,
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 14,
    backgroundColor: '#E5E7EB',
  },
  noImage: {
    width: 85,
    height: 85,
    borderRadius: 14,
    backgroundColor: '#E5E7EB',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },
  price: {
    color: '#2F4CB3',
    fontWeight: '800',
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  location: {
    marginLeft: 5,
    color: '#64748B',
    fontSize: 13,
  },
  emptyBox: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 45,
    paddingHorizontal: 18,
    alignItems: 'center',
    elevation: 2,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  emptyText: {
    color: '#64748B',
    fontSize: 14,
    textAlign: 'center',
  },
});