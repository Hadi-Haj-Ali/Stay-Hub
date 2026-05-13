import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import FilterChips from '../ui/HomeScreen-ui/FilterChips';
import HomeHeader from '../ui/HomeScreen-ui/HomeHeader';
import HouseList from '../ui/HomeScreen-ui/HouseList';

export default function HomeScreen({ favorites, onToggleFavorite }: any) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [houses, setHouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'housing'));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setHouses(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  const filtered = houses.filter((h: any) => {
    const title = h.title || '';
    const location = h.location || '';
    const type = h.type || '';

    const matchSearch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      location.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === 'all' ||
      type.toLowerCase() === filter.toLowerCase();

    return matchSearch && matchFilter;
  });

  if (loading) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <HomeHeader search={search} setSearch={setSearch} />
      <FilterChips filter={filter} setFilter={setFilter} />

      <HouseList
        houses={filtered}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});