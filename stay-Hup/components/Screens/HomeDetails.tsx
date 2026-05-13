import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import DetailsBottomBar from '../ui/HomeDetail-ui/DetailsBottomBar';
import DetailsContent from '../ui/HomeDetail-ui/DetailsContent';
import DetailsHeader from '../ui/HomeDetail-ui/DetailsHeader';

type HomeDetailsProps = {
  house: any;
  onBack: () => void;
  
};

export default function HomeDetails({
  house,
  onBack,
}: HomeDetailsProps) {
  if (!house) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.emptyText}>No details available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <DetailsHeader
          house={house}
          onBack={onBack}
        />

        <DetailsContent house={house} />
      </ScrollView>

      <DetailsBottomBar house={house} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 110,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});