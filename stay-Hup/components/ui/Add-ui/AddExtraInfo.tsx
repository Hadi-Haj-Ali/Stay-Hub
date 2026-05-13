import React from 'react';
import { View } from 'react-native';

import AddAmenities from './AddAmenities';

type Props = {
  amenities: string[];
  toggleAmenity: (value: string) => void;
};

export default function AddExtraInfo({
  amenities,
  toggleAmenity,
}: Props) {
  return (
    <View>
      <AddAmenities
        amenities={amenities}
        toggleAmenity={toggleAmenity}
      />
    </View>
  );
}