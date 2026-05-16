import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useProfileData } from '@/hooks/useProfileData';
import { useHousingTip } from '@/hooks/useHousingTip';
import ProfileTipCard from '../ui/Profile-ui/ProfileTipCard';
import ProfileFavoritesCard from '../ui/Profile-ui/ProfileFavoritesCard';
import ProfileHeader from '../ui/Profile-ui/ProfileHeader';
import ProfileInfoCard from '../ui/Profile-ui/ProfileInfo';
import ProfileRequestsCard from '../ui/Profile-ui/ProfileRequestsCard';
import ProfileSettingsCard from '../ui/Profile-ui/ProfileSettingsCard';
import ProfileTabs, { ProfileTab } from '../ui/Profile-ui/ProfileTabs';

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<ProfileTab>('favorites');
  const { tip, loading: tipLoading } = useHousingTip();
  const {
    loading,
    userData,
    pendingHouses,
    favoriteIds,
    favoriteHouses,
    logout,
    removePendingHouse,
  } = useProfileData();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2F4CB3" />
      </View>
    );
  }

  if (!userData.email) {
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
        
        <ProfileTipCard tip={tip} loading={tipLoading} />

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
            onDelete={removePendingHouse}
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