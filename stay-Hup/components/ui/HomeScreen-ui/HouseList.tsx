import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import HouseCard from './HouseCard';

export default function HouseList({
  houses,
  favorites,
  onToggleFavorite,
  listRef,
}: any) {
  return (
    <ScrollView ref={listRef} contentContainerStyle={styles.list}>
      {houses.map((house: any) => (
        <HouseCard
          key={house.id}
          house={house}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      ))}

      {houses.length === 0 && (
        <View style={styles.empty}>
          <Text>No results</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    paddingBottom: 100,
  },
  empty: {
    marginTop: 40,
    alignItems: 'center',
  },
});