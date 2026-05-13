import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type PendingHouse = {
  id: string;
  title?: string;
  price?: string;
  location?: string;
  type?: string;
};

type Props = {
  houses: PendingHouse[];
  onDelete: (id: string) => void;
};

export default function ProfileRequestsCard({ houses, onDelete }: Props) {
  if (houses.length === 0) {
    return (
      <View style={styles.emptyBox}>
        <Text style={styles.emptyTitle}>No pending requests</Text>
        <Text style={styles.emptyText}>
          Your house requests will appear here.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      {houses.map((house) => (
        <View key={house.id} style={styles.item}>
          <View style={styles.top}>
            <Text style={styles.houseTitle}>{house.title || 'No title'}</Text>
            <Text style={styles.pending}>Pending</Text>
          </View>

          <Text style={styles.text}>{house.location || '-'}</Text>
          <Text style={styles.text}>{house.price || '-'}</Text>
          <Text style={styles.type}>{house.type || 'No type'}</Text>

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => onDelete(house.id)}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
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
  emptyBox: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 45,
    paddingHorizontal: 18,
    alignItems: 'center',
    elevation: 2,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  emptyText: {
    color: '#64748B',
    fontSize: 14,
    textAlign: 'center',
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
  deleteBtn: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
  },
  deleteText: {
    color: '#DC2626',
    fontWeight: '800',
    fontSize: 13,
  },
});