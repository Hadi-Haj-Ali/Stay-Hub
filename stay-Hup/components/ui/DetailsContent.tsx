import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';

type Props = {
  house: any;
};

export default function DetailsContent({ house }: Props) {
  return (
    <View style={styles.content}>
      <View style={styles.rowBetween}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{house.title}</Text>

          <View style={styles.row}>
            <MapPin size={14} color="#666" />
            <Text style={styles.smallText}>
              {house.distance || ''}
              {house.distance ? ' • ' : ''}
              {house.location}
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.price}>{house.price}</Text>
          <Text style={styles.smallText}>per month</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Star size={14} color="#F59E0B" fill="#F59E0B" />
        <Text style={styles.smallText}>
          {house.reviews?.rating ?? house.rating ?? 0} ({house.reviews?.count ?? 0})
        </Text>
      </View>

      <Text style={styles.section}>Description</Text>
      <Text style={styles.desc}>{house.description || 'No description'}</Text>

      <Text style={styles.section}>Amenities</Text>
      <View style={styles.wrap}>
        {house.amenities?.length ? (
          house.amenities.map((item: string) => (
            <View key={item} style={styles.tag}>
              <Text>{item}</Text>
            </View>
          ))
        ) : house.beds ? (
          <View style={styles.tag}>
            <Text>{house.beds} Beds</Text>
          </View>

        ) : (
          <Text style={styles.smallText}>No amenities</Text>
        )}
      </View>

      <Text style={styles.section}>Owner</Text>
      <View style={styles.ownerBox}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {(house.landlord?.name || house.ownerName || 'O').charAt(0)}
          </Text>
        </View>

        <View>
          <Text style={styles.ownerName}>
            {house.landlord?.name || house.ownerName || 'Owner'}
          </Text>
          <Text style={styles.smallText}>Owner</Text>
        </View>
      </View>

      <Text style={styles.section}>Reviews</Text>
      {house.reviews?.comments?.length ? (
        house.reviews.comments.map((r: any, i: number) => (
          <View key={i} style={styles.review}>
            <Text style={styles.reviewUser}>{r.user}</Text>
            <Text style={styles.smallText}>{r.comment}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.smallText}>No reviews yet</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  price: {
    color: '#2563EB',
    fontSize: 18,
    fontWeight: '700',
  },
  section: {
    marginTop: 15,
    fontWeight: '700',
    fontSize: 16,
  },
  desc: {
    color: '#444',
    marginTop: 4,
  },
  smallText: {
    color: '#666',
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  tag: {
    backgroundColor: '#eee',
    padding: 6,
    borderRadius: 8,
    margin: 4,
  },
  ownerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
  },
  ownerName: {
    fontWeight: '700',
  },
  review: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  reviewUser: {
    fontWeight: '600',
  },
});