import { auth, db } from '@/firebaseConfig';
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import ProfileHeader from '../ui/Profile-ui/ProfileHeader';
import ProfileInfoCard from '../ui/Profile-ui/ProfileInfoCard';
import ProfileRequestsCard, { PendingHouse } from '../ui/Profile-ui/ProfileRequestsCard';
import ProfileSettingsCard from '../ui/Profile-ui/ProfileSettingsCard';
import ProfileStatCard from '../ui/Profile-ui/ProfileStatCard';

type UserData = {
  name: string;
  email: string;
  phone: string;
  role: string;
};

export default function ProfileScreen() {
  const [loading, setLoading] = useState(true);
  const [pendingHouses, setPendingHouses] = useState<PendingHouse[]>([]);

  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    role: '',
  });

  useEffect(() => {
    loadUser();
  }, []);

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

  const logout = async () => {
    try {
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

        <View style={styles.statsRow}>
          <ProfileStatCard number="0" label="Saved" />
          <ProfileStatCard number="4.8★" label="Rating" />
        </View>

        <ProfileInfoCard userData={userData} />

        <ProfileRequestsCard houses={pendingHouses} />

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
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 22,
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