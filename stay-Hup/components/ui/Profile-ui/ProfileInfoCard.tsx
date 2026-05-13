import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type UserData = {
  name: string;
  email: string;
  phone: string;
  role: string;
};

type Props = {
  userData: UserData;
};

export default function ProfileInfoCard({ userData }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Account Information</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Full Name</Text>
        <Text style={styles.value}>{userData.name || '-'}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{userData.email || '-'}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{userData.phone || '-'}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Account Type</Text>
        <Text style={styles.value}>{userData.role || 'student'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 18,
    elevation: 3,
    marginBottom: 24,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
  },
  row: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F7',
  },
  label: {
    color: '#64748B',
    fontSize: 13,
    marginBottom: 3,
  },
  value: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
  },
});