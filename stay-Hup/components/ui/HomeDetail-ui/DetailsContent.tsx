import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapPin, Star, Wifi, Car, Utensils, Snowflake, Dumbbell } from 'lucide-react-native';
import ReviewsSection from './ReviewsSection';
type Props = {
  house: any;
};

const amenityIcons: Record<string, React.ReactNode> = {
  Wifi: <Wifi size={16} color="#2563EB" />,
  Parking: <Car size={16} color="#2563EB" />,
  Kitchen: <Utensils size={16} color="#2563EB" />,
  AC: <Snowflake size={16} color="#2563EB" />,
  Gym: <Dumbbell size={16} color="#2563EB" />,
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
      <View style={styles.amenitiesGrid}>
        {house.amenities?.length ? (
          house.amenities.map((item: string, index: number) => (
            <View key={`${item}-${index}`} style={styles.amenityCard}>
              <View style={styles.iconWrap}>
                {amenityIcons[item] || <Text style={styles.iconFallback}>•</Text>}
              </View>
              <Text style={styles.amenityText}>{item}</Text>
            </View>
          ))
        ) : house.beds ? (
          <View style={styles.amenityCard}>
            <View style={styles.iconWrap}>
              <Text style={styles.iconFallback}>•</Text>
            </View>
            <Text style={styles.amenityText}>{house.beds} Beds</Text>
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

   <ReviewsSection house={house} />

    
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
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  amenityCard: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  iconWrap: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconFallback: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '700',
  },
  amenityText: {
    color: '#111827',
    fontSize: 14,
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
});