import { Eye, EyeOff } from 'lucide-react-native';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = TextInputProps & {
  label: string;
  icon: React.ReactNode;
  showToggle?: boolean;
  secure?: boolean;
  onToggleSecure?: () => void;
};

export default function LoginInput({
  label,
  icon,
  showToggle = false,
  secure = false,
  onToggleSecure,
  ...props
}: Props) {
  return (
    <View style={styles.inputBox}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.field}>
        <View style={styles.icon}>{icon}</View>

        <TextInput
          style={styles.input}
          placeholderTextColor="#94A3B8"
          secureTextEntry={secure}
          {...props}
        />

        {showToggle && (
          <TouchableOpacity style={styles.eyeBtn} onPress={onToggleSecure}>
            {secure ? (
              <Eye size={20} color="#64748B" />
            ) : (
              <EyeOff size={20} color="#64748B" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },
  field: {
    height: 52,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },
  eyeBtn: {
    position: 'absolute',
    right: 14,
  },
});