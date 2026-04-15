import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';

type Props = {
  house: any;
};

export default function ReviewsSection({ house }: Props) {
  return (
    <>
      <Text style={styles.section}>Reviews</Text>

      {house.reviews?.comments?.length ? (
        house.reviews.comments.map((review: any, index: number) => (
          <View key={index} style={styles.reviewCard}>
            
            <View style={styles.reviewTop}>
              
              
              <View style={styles.reviewAvatar}>
                <Text style={styles.reviewAvatarText}>
                  {review.user?.charAt(0) || 'M'}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <View style={styles.reviewHeaderRow}>
                  
                  <Text style={styles.reviewUser}>{review.user}</Text>

                  <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        color={star <= (review.rating || 0) ? '#FACC15' : '#D1D5DB'}
                        fill={star <= (review.rating || 0) ? '#FACC15' : 'transparent'}
                      />
                    ))}
                  </View>

                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>

                <Text style={styles.reviewComment}>
                  {review.comment}
                </Text>
              </View>

            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noReviews}>No reviews yet</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 15,
    fontWeight: '700',
    fontSize: 16,
  },

  reviewCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    padding: 14,
    marginTop: 10,
  },

  reviewTop: {
    flexDirection: 'row',
  },

  reviewAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  reviewAvatarText: {
    color: '#6B7280',
    fontWeight: '600',
  },

  reviewHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  reviewUser: {
    fontWeight: '600',
    color: '#111827',
    marginRight: 6,
  },

  starsRow: {
    flexDirection: 'row',
    marginRight: 6,
  },

  reviewDate: {
    fontSize: 12,
    color: '#6B7280',
  },

  reviewComment: {
    color: '#374151',
    marginTop: 2,
  },

  noReviews: {
    color: '#666',
    marginTop: 5,
  },
});