import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  step: number;
  loading: boolean;
  canGoNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onSaveDraft: () => void;
};

export default function AddBottomButtons({
  step,
  loading,
  canGoNext,
  onPrev,
  onNext,
  onSubmit,
  onSaveDraft,
}: Props) {
  return (
    <View style={styles.bottom}>
      <TouchableOpacity style={styles.draftBtn} onPress={onSaveDraft}>
        <Text style={styles.draftText}>Save Draft Offline</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        {step > 1 && (
          <TouchableOpacity style={styles.prevBtn} onPress={onPrev}>
            <Text style={styles.prevText}>Previous</Text>
          </TouchableOpacity>
        )}

        {step < 3 ? (
          <TouchableOpacity
            style={[styles.nextBtn, !canGoNext && styles.disabled]}
            onPress={onNext}
            disabled={!canGoNext}
          >
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.nextBtn, loading && styles.disabled]}
            onPress={onSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.nextText}>Publish</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottom: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  draftBtn: {
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2F4CB3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  draftText: {
    color: '#2F4CB3',
    fontWeight: '800',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  prevBtn: {
    flex: 1,
    height: 52,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prevText: {
    color: '#111827',
    fontWeight: '800',
    fontSize: 15,
  },
  nextBtn: {
    flex: 1,
    height: 52,
    borderRadius: 15,
    backgroundColor: '#2F4CB3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 15,
  },
  disabled: {
    opacity: 0.5,
  },
});