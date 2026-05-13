import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  step: number;
  onBack: () => void;
};

export default function AddHeader({ step, onBack }: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <ArrowLeft size={24} color="#FFF" />
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>Add New House</Text>
          <Text style={styles.subTitle}>Step {step} of 3</Text>
        </View>
      </View>

      <View style={styles.progressBg}>
        <View style={[styles.progress, { width: `${(step / 3) * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2F4CB3',
    paddingHorizontal: 22,
    paddingTop: 45,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: 22,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  backBtn: {
    marginRight: 16,
  },
  title: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '800',
  },
  subTitle: {
    color: '#DCE6FF',
    marginTop: 3,
    fontSize: 13,
  },
  progressBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 20,
    overflow: 'hidden',
  },
  progress: {
    height: 8,
    backgroundColor: '#FACC15',
    borderRadius: 20,
  },
});