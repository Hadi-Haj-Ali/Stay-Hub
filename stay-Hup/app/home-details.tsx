import { db } from '@/firebaseConfig';
import HomeDetails from '@/components/Screens/HomeDetails';
import { router, useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';

export default function Page() {
  const { id } = useLocalSearchParams();

  const [selectedHouse, setSelectedHouse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHouse = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'housing', String(id));
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSelectedHouse({
            id: docSnap.id,
            ...docSnap.data(),
          });
        } else {
          console.log('House not found');
        }
      } catch (error) {
        console.log('Error loading house:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHouse();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!selectedHouse) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No house details found</Text>
      </View>
    );
  }

  return (
    <HomeDetails
      house={selectedHouse}
      onBack={() => router.back()}
    />
  );
}