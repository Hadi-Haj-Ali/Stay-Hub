import { ArrowLeft, Edit } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  name: string;
  email: string;
  onBack: () => void;
};

export default function ProfileHeader({ name, email, onBack }: Props) {
  const firstLetters = name
    ? name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <ArrowLeft size={24} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.pageTitle}>Profile</Text>
      </View>

      <View style={styles.userRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{firstLetters}</Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.name}>{name || 'User'}</Text>
          <Text style={styles.email}>{email || 'No email'}</Text>
          <Text style={styles.member}>Stay Hub member</Text>
        </View>

        <TouchableOpacity>
          <Edit size={22} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2F4CB3',
    paddingHorizontal: 24,
    paddingTop: 45,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: 22,
    elevation: 5,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  backBtn: {
    marginRight: 18,
  },
  pageTitle: {
    color: '#FFF',
    fontSize: 25,
    fontWeight: '800',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: '#5B73D6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: '700',
  },
  userInfo: {
    flex: 1,
  },
  name: {
    color: '#FFF',
    fontSize: 23,
    fontWeight: '800',
  },
  email: {
    color: '#E6ECFF',
    fontSize: 14,
    marginTop: 4,
  },
  member: {
    color: '#C9D5FF',
    fontSize: 13,
    marginTop: 3,
  },
});