import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  SafeAreaView,
} from 'react-native';
import {
  ArrowLeft,
  Heart,
  Phone,
  MessageCircle,
  MapPin,
  Star,
} from 'lucide-react-native';

interface ReviewComment {
  user: string;
  comment: string;
  rating?: number;
  date?: string;
}

interface Landlord {
  name: string;
  phone: string;
  whatsapp: string;
}

interface Reviews {
  rating: number;
  count: number;
  comments: ReviewComment[];
}

interface House {
  id: string;
  title: string;
  price: string;
  type: string;
  distance: string;
  location: string;
  image: any;
  amenities: string[];
  description: string;
  landlord: Landlord;
  reviews: Reviews;
}

interface HouseDetailScreenProps {
  house: House | null;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function HouseDetailScreen({
  house,
  onBack,
  isFavorite,
  onToggleFavorite,
}: HouseDetailScreenProps) {
  if (!house) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No house selected</Text>
      </SafeAreaView>
    );
  }

  const handleCall = async () => {
    const url = `tel:${house.landlord.phone}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  const handleWhatsApp = async () => {
    const phone = house.landlord.whatsapp.replace('+', '');
    const url = `https://wa.me/${phone}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageWrapper}>
          <Image source={house.image} style={{ width: '100%', height: 250 }} />

          <View style={styles.topButtons}>
            <TouchableOpacity style={styles.iconButton} onPress={onBack}>
              <ArrowLeft size={22} color="#111827" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton} onPress={onToggleFavorite}>
              <Heart
                size={22}
                color={isFavorite ? '#EF4444' : '#111827'}
                fill={isFavorite ? '#EF4444' : 'transparent'}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.typeBadge}>
            <Text style={styles.typeBadgeText}>{house.type}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={styles.titleBox}>
              <Text style={styles.title}>{house.title}</Text>
              <View style={styles.locationRow}>
                <MapPin size={14} color="#6B7280" />
                <Text style={styles.locationText}>
                  {house.distance} • {house.location}
                </Text>
              </View>
            </View>

            <View>
              <Text style={styles.price}>{house.price}</Text>
              <Text style={styles.perMonth}>per month</Text>
            </View>
          </View>

          <View style={styles.ratingRow}>
            <Star size={15} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>
              {house.reviews.rating} ({house.reviews.count} reviews)
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{house.description}</Text>

          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesContainer}>
            {house.amenities.slice(0, 6).map((item) => (
              <View key={item} style={styles.amenityBadge}>
                <Text style={styles.amenityText}>{item}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Owner</Text>
          <View style={styles.ownerCard}>
            <View style={styles.ownerAvatar}>
              <Text style={styles.ownerAvatarText}>
                {house.landlord.name.charAt(0).toUpperCase()}
              </Text>
            </View>

            <View style={styles.ownerInfo}>
              <Text style={styles.ownerName}>{house.landlord.name}</Text>
              <Text style={styles.ownerRole}>Property Owner</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Reviews</Text>
          {house.reviews.comments.length === 0 ? (
            <Text style={styles.noReviews}>No reviews yet</Text>
          ) : (
            house.reviews.comments.slice(0, 2).map((review, index) => (
              <View key={index} style={styles.reviewCard}>
                <Text style={styles.reviewUser}>{review.user}</Text>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
          <Phone size={18} color="#2563EB" />
          <Text style={styles.callButtonText}>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsApp}>
          <MessageCircle size={18} color="#FFFFFF" />
          <Text style={styles.whatsappButtonText}>WhatsApp</Text>
        </TouchableOpacity>
      </View>
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#6B7280',
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 280,
  },
  topButtons: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeBadge: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    backgroundColor: '#2563EB',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  typeBadgeText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  content: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    gap: 12,
  },
  titleBox: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 5,
    color: '#6B7280',
    fontSize: 13,
    flexShrink: 1,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2563EB',
    textAlign: 'right',
  },
  perMonth: {
    color: '#6B7280',
    fontSize: 12,
    textAlign: 'right',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  ratingText: {
    marginLeft: 6,
    color: '#374151',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginTop: 12,
    marginBottom: 8,
  },
  description: {
    color: '#4B5563',
    lineHeight: 22,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityBadge: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  amenityText: {
    color: '#374151',
    fontSize: 13,
  },
  ownerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginTop: 4,
  },
  ownerAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  ownerAvatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
  },
  ownerInfo: {
    flex: 1,
  },
  ownerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  ownerRole: {
    color: '#6B7280',
    marginTop: 2,
    fontSize: 13,
  },
  noReviews: {
    color: '#6B7280',
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  reviewUser: {
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  reviewComment: {
    color: '#4B5563',
    lineHeight: 20,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 10,
  },
  callButton: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#2563EB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    backgroundColor: '#EFF6FF',
  },
  callButtonText: {
    color: '#2563EB',
    fontWeight: '600',
  },
  whatsappButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#16A34A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  whatsappButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});