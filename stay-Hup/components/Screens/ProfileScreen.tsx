import { auth, db } from '@/firebaseConfig';
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
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

import ProfileHeader from '../ui/ProfileHeader';
import ProfileSettingRow from '../ui/ProfileSettingRow';
import ProfileStatCard from '../ui/ProfileStatCard';

type UserData = {
  name: string;
  email: string;
  phone: string;
  role: string;
};

export default function ProfileScreen() {
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    role: '',
  });

  useEffect(() => {
    loadUser();
  }, []);

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

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Account Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Full Name</Text>
            <Text style={styles.infoValue}>{userData.name || '-'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{userData.email || '-'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{userData.phone || '-'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Account Type</Text>
            <Text style={styles.infoValue}>{userData.role || 'student'}</Text>
          </View>
        </View>

        <Text style={styles.settingsTitle}>Settings</Text>

        <View style={styles.settingsCard}>
          <ProfileSettingRow title="Edit Profile" type="edit" />
          <ProfileSettingRow title="Notifications" type="notifications" />
          <ProfileSettingRow title="Privacy & Security" type="privacy" />
          <ProfileSettingRow title="Help & Support" type="help" />
          <ProfileSettingRow title="Sign Out" type="logout" onPress={logout} />
        </View>
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
  infoCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 18,
    elevation: 3,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
  },
  infoRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F7',
  },
  infoLabel: {
    color: '#64748B',
    fontSize: 13,
    marginBottom: 3,
  },
  infoValue: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
  },
  settingsTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#111827',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  settingsCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
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