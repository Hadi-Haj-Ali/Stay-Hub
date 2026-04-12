import { useLocalSearchParams, router } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import HomeDetails from '../components/HomeDetails';

export default function Page() {
  const { house } = useLocalSearchParams();

  const [selectedHouse, setSelectedHouse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

 
  const localHouses = [
    {
      id: '1',
      title: 'Single Student Room',
      price: '8000',
      type: 'Single Room',
      distance: '0.5 km',
      location: 'Near University Gate',
      image: require('../assets/images/1.jpg'),
      amenities: ['WiFi', 'Water'],
      description: 'Nice place for students',
      landlord: {
        name: 'Ameer',
        phone: '0590000000',
        whatsapp: '0590000000',
      },
      reviews: {
        rating: 4.5,
        count: 10,
        comments: [],
      },
    },
    {
      id: '2',
      title: 'Shared Room',
      price: '7000',
      type: 'Shared Room',
      distance: '1.2 km',
      location: 'City Center',
      image: require('../assets/images/2.jpg'),
      amenities: ['Kitchen', 'Parking'],
      description: 'Affordable shared place',
      landlord: {
        name: 'Hadi',
        phone: '0591111111',
        whatsapp: '0591111111',
      },
      reviews: {
        rating: 4.2,
        count: 8,
        comments: [],
      },
    },
  ];

  
  useEffect(() => {
    const loadHouse = async () => {
      try {
       
        const found = localHouses.find((h) => h.id === house);
        setSelectedHouse(found);
      } catch (e) {
        console.log('error:', e);
      } finally {
        setLoading(false);
      }
    };

    loadHouse();
  }, [house]);

  if (loading || !selectedHouse) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <HomeDetails
      house={selectedHouse}
      onBack={() => router.back()}
      isFavorite={false}
      onToggleFavorite={() => {}}
    />
  );
}