import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ProfileSettingRow from './ProfileSettingRow';

type Props = {
  onLogout: () => void;
};

export default function ProfileSettingsCard({ onLogout }: Props) {
  return (
    <>
      <Text style={styles.settingsTitle}>Settings</Text>

      <View style={styles.card}>
        <ProfileSettingRow title="Edit Profile" type="edit" />
        <ProfileSettingRow title="Notifications" type="notifications" />
        <ProfileSettingRow title="Privacy & Security" type="privacy" />
        <ProfileSettingRow title="Help & Support" type="help" />
        <ProfileSettingRow title="Sign Out" type="logout" onPress={onLogout} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  settingsTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#111827',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
  },
});