import { useLocalSearchParams, router } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import HomeDetails from '../components/Screens/HomeDetails';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function Page() {
  const { house } = useLocalSearchParams();

  const [selectedHouse, setSelectedHouse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHouse = async () => {
      try {
        const docRef = doc(db, 'housing', String(house));
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSelectedHouse({
            id: docSnap.id,
            ...docSnap.data(),
          });
        } else {
          console.log('House not found');
        }
      } catch (e) {
        console.log('error:', e);
      } finally {
        setLoading(false);
      }
    };

    if (house) {
      loadHouse();
    } else {
      setLoading(false);
    }
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