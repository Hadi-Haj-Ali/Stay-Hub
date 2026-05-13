import { Clock, Heart } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type ProfileTab = 'favorites' | 'pending';

type Props = {
  activeTab: ProfileTab;
  setActiveTab: (value: ProfileTab) => void;
  pendingCount: number;
  favoritesCount: number;
};

export default function ProfileTabs({
  activeTab,
  setActiveTab,
  pendingCount,
  favoritesCount,
}: Props) {
  return (
    <View style={styles.tabs}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'favorites' && styles.activeTab]}
        onPress={() => setActiveTab('favorites')}
      >
        <Heart
          size={18}
          color={activeTab === 'favorites' ? '#FFF' : '#111827'}
        />

        <Text
          style={[
            styles.tabText,
            activeTab === 'favorites' && styles.activeText,
          ]}
        >
          Favorites ({favoritesCount})
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
        onPress={() => setActiveTab('pending')}
      >
        <Clock
          size={18}
          color={activeTab === 'pending' ? '#FFF' : '#111827'}
        />

        <Text
          style={[
            styles.tabText,
            activeTab === 'pending' && styles.activeText,
          ]}
        >
          Pending ({pendingCount})
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 4,
    elevation: 2,
  },
  tab: {
    flex: 1,
    height: 52,
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#2F4CB3',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
  },
  activeText: {
    color: '#FFF',
  },
});