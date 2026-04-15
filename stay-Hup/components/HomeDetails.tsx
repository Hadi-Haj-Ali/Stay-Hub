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

type HomeDetailsProps = {
  house: any;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export default function HomeDetails({
  house,
  onBack,
  isFavorite,
  onToggleFavorite,
}: HomeDetailsProps) {
  if (!house) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.emptyText}>No details available</Text>
      </SafeAreaView>
    );
  }

 const handleCall = async () => {
  const phone = house.phone;

  if (!phone) {
    console.log('No phone number');
    return;
  }

  const url = `tel:${phone}`;
  const ok = await Linking.canOpenURL(url);
  if (ok) Linking.openURL(url);
};

  const handleWhatsApp = async () => {
  const phone = String(house.phone).replace(/\D/g, '');

  if (!phone) {
    console.log('No phone number');
    return;
  }

  const url = `https://wa.me/${phone}`;

  try {
    await Linking.openURL(url);
  } catch (e) {
    console.log('WhatsApp error:', e);
  }
};
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 110 }}>
        <View style={styles.imageBox}>
          <Image
            source={
              typeof house.image === 'string'
                ? { uri: house.image }
                : house.image
            }
            style={styles.image}
          />

          <View style={styles.topBtns}>
            <TouchableOpacity style={styles.circleBtn} onPress={onBack}>
              <ArrowLeft size={20} color="#111" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.circleBtn} onPress={onToggleFavorite}>
              <Heart
                size={20}
                color={isFavorite ? 'red' : '#111'}
                fill={isFavorite ? 'red' : 'transparent'}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{house.type || 'Room'}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.rowBetween}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{house.title}</Text>

              <View style={styles.row}>
                <MapPin size={14} color="#666" />
                <Text style={styles.smallText}>
                  {house.distance || ''}{house.distance ? ' • ' : ''}{house.location}
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
      </ScrollView>

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.callBtn} onPress={handleCall}>
          <Phone size={18} color="#2563EB" />
          <Text style={styles.callText}>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.whatsappBtn} onPress={handleWhatsApp}>
          <MessageCircle size={18} color="#fff" />
          <Text style={styles.whatsappText}>WhatsApp</Text>
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
  imageBox: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 260,
  },
  topBtns: {
    position: 'absolute',
    top: 15,
    left: 15,
    right: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circleBtn: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
  },
  badge: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    backgroundColor: '#2563EB',
    padding: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '600',
  },
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
  bottom: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
  },
  callBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#2563EB',
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  callText: {
    color: '#2563EB',
  },
  whatsappBtn: {
    flex: 1,
    backgroundColor: '#16A34A',
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 8,
    gap: 5,
  },
  whatsappText: {
    color: '#fff',
  },
});