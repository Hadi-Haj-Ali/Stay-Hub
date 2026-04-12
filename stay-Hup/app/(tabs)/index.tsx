import React, { useState } from 'react';
import HomeScreen from '../../components/HomeScreen';

export default function Index() {

  const [favorites, setFavorites] = useState<string[]>(['1']);

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <HomeScreen
      favorites={favorites}
      onToggleFavorite={handleToggleFavorite}
    />
  );
}