import { useHouses } from '@/hooks/useHouse';
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import FilterChips from '../ui/HomeScreen-ui/FilterChips';
import HomeHeader from '../ui/HomeScreen-ui/HomeHeader';
import HouseList from '../ui/HomeScreen-ui/HouseList';

export default function HomeScreen({ favorites, onToggleFavorite }: any) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const listRef = useRef<ScrollView>(null);

  const {
    data: houses = [],
    isLoading,
    isError,
  } = useHouses();

  const changeFilter = useCallback((value: string) => {
    setFilter(value);

    listRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }, []);

  const filteredHouses = useMemo(() => {
    return houses.filter((house: any) => {
      const title = house.title?.toLowerCase() || '';
      const location = house.location?.toLowerCase() || '';
      const type = house.type?.toLowerCase() || '';

      const searchText = search.toLowerCase();

      const matchSearch =
        title.includes(searchText) || location.includes(searchText);

      const matchFilter =
        filter === 'all' || type.includes(filter);

      return matchSearch && matchFilter;
    });
  }, [houses, search, filter]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Could not load houses</Text>;
  }

  return (
    <View style={styles.container}>
      <HomeHeader search={search} setSearch={setSearch} />

      <FilterChips filter={filter} setFilter={changeFilter} />

      <HouseList
        houses={filteredHouses}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        listRef={listRef}
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