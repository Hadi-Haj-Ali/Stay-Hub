import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import HomeScreen from '../../components/Screens/HomeScreen';

export default function Index() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const saved = await AsyncStorage.getItem('favorites');

    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  };

  const toggleFavorite = async (id: string) => {
    let updatedFavorites = [];

    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((item) => item !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }

    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <HomeScreen
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
    />
  );
}