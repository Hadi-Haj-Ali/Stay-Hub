import { useFavorites } from '@/Context/FavoritesContext';
import HomeScreen from '@/components/Screens/HomeScreen';

export default function Index() {
  const { favoriteIds, toggleFavorite } = useFavorites();

  return (
    <HomeScreen
      favorites={favoriteIds}
      onToggleFavorite={toggleFavorite}
    />
  );
}