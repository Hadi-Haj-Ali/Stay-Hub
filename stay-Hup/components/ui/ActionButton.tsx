import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface ActionButtonProps {
  label: string;
  onPress: () => void;
  icon?: React.ReactNode;
  variant?: 'primary' | 'outline' | 'success';
}

export function ActionButton({
  label,
  onPress,
  icon,
  variant = 'primary',
}: ActionButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        variant === 'primary' && styles.primary,
        variant === 'outline' && styles.outline,
        variant === 'success' && styles.success,
      ]}
      activeOpacity={0.9}
    >
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <Text
        style={[
          styles.text,
          variant === 'outline' && styles.outlineText,
          variant !== 'outline' && styles.filledText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  primary: {
    backgroundColor: '#2563EB',
  },
  outline: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  success: {
    backgroundColor: '#16A34A',
  },
  icon: {
    marginRight: 6,
  },
  text: {
    fontWeight: '600',
  },
  filledText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: '#2563EB',
  },
});