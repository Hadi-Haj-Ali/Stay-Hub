import React from 'react';

import AddExtraInfo from '../../ui/Add-ui/AddExtraInfo';

type Props = {
  amenities: string[];
  toggleAmenity: (value: string) => void;
};

export default function AddExtraStep({
  amenities,
  toggleAmenity,
}: Props) {
  return (
    <AddExtraInfo
      amenities={amenities}
      toggleAmenity={toggleAmenity}
    />
  );
}