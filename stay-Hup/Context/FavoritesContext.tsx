import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type FavoritesContextType = {
  favoriteIds: string[];
  toggleFavorite: (id: string) => Promise<void>;
  loadFavorites: () => Promise<string[]>;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

const STORAGE_KEY = 'favorites';

type Props = {
  children: ReactNode;
};

export function FavoritesProvider({ children }: Props) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);

    if (!saved) {
      setFavoriteIds([]);
      return [];
    }

    const ids = JSON.parse(saved) as string[];
    setFavoriteIds(ids);

    return ids;
  };

  const toggleFavorite = async (id: string) => {
    let updatedFavorites: string[];

    if (favoriteIds.includes(id)) {
      updatedFavorites = favoriteIds.filter((item) => item !== id);
    } else {
      updatedFavorites = [...favoriteIds, id];
    }

    setFavoriteIds(updatedFavorites);

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedFavorites)
    );
  };

  const isFavorite = (id: string) => {
    return favoriteIds.includes(id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        toggleFavorite,
        loadFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }

  return context;
}