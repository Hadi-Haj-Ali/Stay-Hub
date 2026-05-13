import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type LoginMode = 'signin' | 'signup';

type Props = {
  mode: LoginMode;
  setMode: (value: LoginMode) => void;
};

export default function LoginTabs({ mode, setMode }: Props) {
  return (
    <View style={styles.tabs}>
      <TouchableOpacity
        style={[styles.tab, mode === 'signin' && styles.activeTab]}
        onPress={() => setMode('signin')}
      >
        <Text
          style={[
            styles.tabText,
            mode === 'signin' && styles.activeText,
          ]}
        >
          Sign In
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, mode === 'signup' && styles.activeTab]}
        onPress={() => setMode('signup')}
      >
        <Text
          style={[
            styles.tabText,
            mode === 'signup' && styles.activeText,
          ]}
        >
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    marginBottom: 22,
    padding: 4,
    borderRadius: 16,
    backgroundColor: '#EEF2F7',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 13,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  activeText: {
    color: '#2F4CB3',
  },
});