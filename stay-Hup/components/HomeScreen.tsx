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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = houses.filter((h: any) => {
    const matchSearch =
      h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.location.toLowerCase().includes(searchQuery.toLowerCase());

   const matchFilter =
  activeFilter === 'all' ||
  (activeFilter === 'single' && h.title.toLowerCase().includes('single')) ||
  (activeFilter === 'shared' && h.title.toLowerCase().includes('shared'));

    return matchSearch && matchFilter;
  });

  return (
    <View style={styles.container}>
      
     
      <View style={styles.topHeader}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Good Morning!</Text>
            <Text style={styles.subText}>Find your perfect house today</Text>
          </View>

          <View style={styles.icons}>
            <TouchableOpacity
    onPress={() => console.log('Dark Mode Click')}
  >
    <Moon size={20} color="#fff" style={{ marginRight: 14 }} />
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => router.push('/profile')}
  >
    <User size={20} color="#fff" />
  </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Search size={18} color="#6B7280" />

          <TextInput
            placeholder="Search by location, price, or type..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />

          <View style={styles.filterBtn}>
            <Text style={{ color: '#fff' }}>⚙️</Text>
          </View>
        </View>
      </View>

      {/* 🟣 FILTERS */}
      <View style={styles.filtersWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          
          {['all', 'single', 'shared'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterChip,
                activeFilter === type && styles.activeFilterChip,
              ]}
              onPress={() => setActiveFilter(type)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  activeFilter === type && styles.activeFilterChipText,
                ]}
              >
                {type === 'all'
                  ? 'All'
                  : type === 'single'
                  ? 'Single Room'
                  : 'Shared Room'}
              </Text>
            </TouchableOpacity>
          ))}

        </ScrollView>
      </View>

      
      <ScrollView contentContainerStyle={styles.listContent}>
        {filtered.map((house: any) => (
          <TouchableOpacity
            key={house.id}
            style={styles.card}
            activeOpacity={0.9}
            onPress={() =>
              router.push({
  pathname: '/home-details',
  params: {
    house: house.id,
  },
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

            <View style={styles.info}>
              <Text style={styles.name}>{house.title}</Text>
              <Text style={styles.price}>{house.price}</Text>

              <View style={styles.row}>
                <MapPin size={14} color="#777" />
                <Text style={styles.distance}>{house.distance}</Text>
              </View>

              <Text style={styles.location}>{house.location}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {filtered.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No housing found</Text>
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

  topHeader: {
    backgroundColor: '#2F4CB3',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  greeting: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },

  subText: {
    color: '#D1D5DB',
    marginTop: 4,
  },

  icons: {
    flexDirection: 'row',
  },

  searchContainer: {
    marginTop: 20,
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 50,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
  },

  filterBtn: {
    backgroundColor: '#2F4CB3',
    padding: 10,
    borderRadius: 12,
  },

  
  filtersWrapper: {
    paddingVertical: 12,
    paddingLeft: 16,
  },

  filterChip: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 10,
  },

  activeFilterChip: {
    backgroundColor: '#2F4CB3',
    borderColor: '#2F4CB3',
  },

  filterChipText: {
    color: '#374151',
    fontWeight: '600',
  },

  activeFilterChipText: {
    color: '#FFFFFF',
  },

  listContent: {
    padding: 16,
    paddingBottom: 100,
  },

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

  emptyState: {
    marginTop: 40,
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
});