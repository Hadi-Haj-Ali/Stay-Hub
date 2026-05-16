import { auth } from '@/firebaseConfig';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import {
  deletePendingHouse,
  FavoriteHouse,
  getFavoriteHouses,
  getPendingHouses,
  getUserProfile,
  logoutUser,
  PendingHouse,
  UserData,
} from '@/services/profileService';

export function useProfileData() {
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    role: '',
  });

  const [pendingHouses, setPendingHouses] = useState<PendingHouse[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [favoriteHouses, setFavoriteHouses] = useState<FavoriteHouse[]>([]);

  const loadFavorites = async () => {
    const result = await getFavoriteHouses();

    setFavoriteIds(result.ids);
    setFavoriteHouses(result.houses);
  };

  const loadPending = async () => {
    const user = auth.currentUser;

    if (!user) return;

    const data = await getPendingHouses(user.uid);
    setPendingHouses(data);
  };

  const loadUser = async () => {
    const user = auth.currentUser;

    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const profile = await getUserProfile(user.uid, user.email);

      setUserData(profile);

      await loadPending();
      await loadFavorites();
    } catch (error) {
      Alert.alert('Error', 'Could not load profile');
    } finally {
      setLoading(false);
    }
  };

  const removePendingHouse = async (id: string) => {
    try {
      await deletePendingHouse(id);

      setPendingHouses((prev) =>
        prev.filter((house) => house.id !== id)
      );
    } catch (error) {
      Alert.alert('Error', 'Could not delete request');
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      router.replace('/Login');
    } catch (error) {
      Alert.alert('Error', 'Could not logout');
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
      loadPending();
    }, [])
  );

  return {
    loading,
    userData,
    pendingHouses,
    favoriteIds,
    favoriteHouses,
    logout,
    removePendingHouse,
  };
}