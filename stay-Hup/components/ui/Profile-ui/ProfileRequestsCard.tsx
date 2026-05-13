import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type PendingHouse = {
  id: string;
  title?: string;
  price?: string;
  location?: string;
  type?: string;
};

type Props = {
  houses: PendingHouse[];
};

export default function ProfileRequestsCard({ houses }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>My Requests</Text>

      {houses.length === 0 ? (
        <Text style={styles.emptyText}>No house requests yet.</Text>
      ) : (
        houses.map((house) => (
          <View key={house.id} style={styles.item}>
            <View style={styles.top}>
              <Text style={styles.houseTitle}>{house.title || 'No title'}</Text>
              <Text style={styles.pending}>Pending</Text>
            </View>

            <Text style={styles.text}>{house.location || '-'}</Text>
            <Text style={styles.text}>{house.price || '-'}</Text>
            <Text style={styles.type}>{house.type || 'No type'}</Text>
          </View>
        ))
      )}
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
  emptyText: {
    color: '#64748B',
    fontSize: 14,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F7',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  houseTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  text: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },
  type: {
    fontSize: 13,
    color: '#2F4CB3',
    fontWeight: '700',
    marginTop: 5,
  },
  pending: {
    color: '#D97706',
    fontWeight: '800',
    fontSize: 12,
    marginLeft: 8,
  },
});