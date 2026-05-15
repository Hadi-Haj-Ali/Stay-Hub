import { auth, db } from '@/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { signOut } from 'firebase/auth';
import { removeUserId } from '@/secureStore';
import {
  collection,
  doc,
  deleteDoc,
  documentId,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ProfileFavoritesCard from '../ui/Profile-ui/ProfileFavoritesCard';
import ProfileHeader from '../ui/Profile-ui/ProfileHeader';
import ProfileInfoCard from '../ui/Profile-ui/ProfileInfo';
import ProfileRequestsCard, { PendingHouse} from '../ui/Profile-ui/ProfileRequestsCard'; 
import ProfileSettingsCard from '../ui/Profile-ui/ProfileSettingsCard';
import ProfileStatCard from '../ui/Profile-ui/ProfileStatCard';
import ProfileTabs, { ProfileTab } from '../ui/Profile-ui/ProfileTabs';

type UserData = {
  name: string;
  email: string;
  phone: string;
  role: string;
};

type FavoriteHouse = {
  id: string;
  title?: string;
  price?: string;
  location?: string;
  distance?: string;
  image?: string;
};

export default function ProfileScreen() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ProfileTab>('favorites');

  const [pendingHouses, setPendingHouses] = useState<PendingHouse[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [favoriteHouses, setFavoriteHouses] = useState<FavoriteHouse[]>([]);

  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    role: '',
  });

  useEffect(() => {
  loadUser();
  loadFavorites();
}, []);

useFocusEffect(
  useCallback(() => {
    const refreshData = async () => {
      const user = auth.currentUser;

      await loadFavorites();

      if (user) {
        await loadPendingHouses(user.uid);
      }
    };

    refreshData();
  }, [])

);;
  

  const loadFavorites = async () => {
    const saved = await AsyncStorage.getItem('favorites');

    if (!saved) {
      return;
    }

    const ids = JSON.parse(saved) as string[];
    setFavoriteIds(ids);

    if (ids.length === 0) {
      setFavoriteHouses([]);
      return;
    }

    const q = query(
      collection(db, 'housing'),
      where(documentId(), 'in', ids)
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    })) as FavoriteHouse[];

    setFavoriteHouses(data);
  };

  const loadPendingHouses = async (uid: string) => {
    const q = query(
      collection(db, 'pending_housing'),
      where('ownerId', '==', uid)
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    })) as PendingHouse[];

    setPendingHouses(data);
  };

  const loadUser = async () => {
    const user = auth.currentUser;

    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();

        setUserData({
          name: String(data.name || ''),
          email: String(data.email || user.email || ''),
          phone: String(data.phone || ''),
          role: String(data.role || 'student'),
        });
      } else {
        setUserData({
          name: 'User',
          email: user.email || '',
          phone: '',
          role: 'student',
        });
      }

      await loadPendingHouses(user.uid);
    } catch (error) {
      Alert.alert('Error', 'Could not load profile');
    } finally {
      setLoading(false);
    }
  };
const deletePendingHouse = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'pending_housing', id));

    setPendingHouses((prev) =>
      prev.filter((house) => house.id !== id)
    );
  } catch (error) {
    Alert.alert('Error', 'Could not delete request');
  }
};
  const logout = async () => {
  try {
    await removeUserId();
    await signOut(auth);
    router.replace('/Login');
  } catch (error) {
    Alert.alert('Error', 'Could not logout');
  }
};

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2F4CB3" />
      </View>
    );
  }

  if (!auth.currentUser) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.guestTitle}>Guest Mode</Text>
          <Text style={styles.guestText}>Login to view your profile.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ProfileHeader
          name={userData.name}
          email={userData.email}
          onBack={() => router.replace('/(tabs)' as any)}
        />
        <ProfileInfoCard userData={userData} />
        <ProfileTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          pendingCount={pendingHouses.length}
          favoritesCount={favoriteIds.length}
        />

        {activeTab === 'favorites' ? (
          <ProfileFavoritesCard houses={favoriteHouses} />
        ) : (
          <ProfileRequestsCard
            houses={pendingHouses}
           onDelete={deletePendingHouse}
/>
        )}

        <ProfileSettingsCard onLogout={logout} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    paddingBottom: 110,
  },
  center: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  guestTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  guestText: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
  },
});