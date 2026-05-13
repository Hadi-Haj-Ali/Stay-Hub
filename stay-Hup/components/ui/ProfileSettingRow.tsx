import {
  Bell,
  Edit,
  HelpCircle,
  LogOut,
  Shield,
} from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  title: string;
  type: 'edit' | 'notifications' | 'privacy' | 'help' | 'logout';
  onPress?: () => void;
};

export default function ProfileSettingRow({ title, type, onPress }: Props) {
  const color = type === 'logout' ? '#EF4444' : '#64748B';

  const getIcon = () => {
    if (type === 'edit') return <Edit size={22} color={color} />;
    if (type === 'notifications') return <Bell size={22} color={color} />;
    if (type === 'privacy') return <Shield size={22} color={color} />;
    if (type === 'help') return <HelpCircle size={22} color={color} />;
    return <LogOut size={22} color={color} />;
  };

  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={styles.icon}>{getIcon()}</View>
      <Text style={[styles.text, type === 'logout' && styles.logoutText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F7',
  },
  icon: {
    width: 35,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  logoutText: {
    color: '#EF4444',
  },
});