import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { Search, MapPin, Heart, Moon, User } from 'lucide-react-native';

export default function HomeScreen({ houses, favorites, onToggleFavorite }: any) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredHouses = houses.filter((h: any) => {
    const matchSearch =
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.location.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === 'all' ||
      (filter === 'single' && h.title.toLowerCase().includes('single')) ||
      (filter === 'shared' && h.title.toLowerCase().includes('shared'));

    return matchSearch && matchFilter;
  });

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.title}>Good Morning!</Text>
            <Text style={styles.sub}>Find your place</Text>
          </View>

          <View style={styles.icons}>
            <TouchableOpacity onPress={() => console.log('dark')}>
              <Moon size={20} color="#fff" style={{ marginRight: 14 }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/profile')}>
              <User size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Search size={18} color="#666" />

          <TextInput
            placeholder="Search..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />

          <View style={styles.smallBtn}>
            <Text style={{ color: '#fff' }}>⚙️</Text>
          </View>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['all', 'single', 'shared'].map((f) => (
            <TouchableOpacity
              key={f}
              style={[
                styles.chip,
                filter === f && styles.activeChip,
              ]}
              onPress={() => setFilter(f)}
            >
              <Text
                style={[
                  styles.chipText,
                  filter === f && styles.activeText,
                ]}
              >
                {f === 'all'
                  ? 'All'
                  : f === 'single'
                  ? 'Single Room'
                  : 'Shared Room'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* List */}
      <ScrollView contentContainerStyle={styles.list}>
        {filteredHouses.map((house: any) => (
          <TouchableOpacity
            key={house.id}
            style={styles.card}
            activeOpacity={0.9}
            onPress={() =>
              router.push({
                pathname: '/home-details',
                params: { house: house.id },
              })
            }
          >
            <Image
              source={
                typeof house.image === 'string'
                  ? { uri: house.image }
                  : house.image
              }
              style={styles.image}
            />

            {/* Favorite */}
            <TouchableOpacity
              style={styles.fav}
              onPress={() => onToggleFavorite(house.id)}
            >
              <Heart
                size={18}
                color={favorites.includes(house.id) ? 'red' : 'gray'}
                fill={favorites.includes(house.id) ? 'red' : 'transparent'}
              />
            </TouchableOpacity>

            {/* Info */}
            <View style={styles.info}>
              <Text style={styles.houseName}>{house.title}</Text>
              <Text style={styles.price}>{house.price}</Text>

              <View style={styles.row}>
                <MapPin size={14} color="#777" />
                <Text style={styles.text}>{house.distance}</Text>
              </View>

              <Text style={styles.text}>{house.location}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {filteredHouses.length === 0 && (
          <View style={styles.empty}>
            <Text>No results</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  header: {
    backgroundColor: '#2F4CB3',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },

  sub: {
    color: '#ddd',
    marginTop: 4,
  },

  icons: {
    flexDirection: 'row',
  },

  searchBox: {
    marginTop: 20,
    backgroundColor: '#E5E7EB',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 48,
  },

  input: {
    flex: 1,
    marginLeft: 8,
  },

  smallBtn: {
    backgroundColor: '#2F4CB3',
    padding: 8,
    borderRadius: 10,
  },

  filters: {
    padding: 12,
  },

  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },

  activeChip: {
    backgroundColor: '#2F4CB3',
  },

  chipText: {
    color: '#333',
  },

  activeText: {
    color: '#fff',
  },

  list: {
    padding: 16,
    paddingBottom: 100,
  },

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

  houseName: {
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

  empty: {
    marginTop: 40,
    alignItems: 'center',
  },
});