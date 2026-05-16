import React from 'react';

import AddContactInfo from '../../ui/Add-ui/AddContactInfo';

type Props = {
  location: string;
  landlordName: string;
  landlordPhone: string;
  landlordWhatsapp: string;

  setValue: (name: any, value: any) => void;
};

export default function AddContactStep({
  location,
  landlordName,
  landlordPhone,
  landlordWhatsapp,
  setValue,
}: Props) {
  return (
    <AddContactInfo
      location={location}
      setLocation={(value: string) => setValue('location', value)}
      landlordName={landlordName}
      setLandlordName={(value: string) => setValue('landlordName', value)}
      landlordPhone={landlordPhone}
      setLandlordPhone={(value: string) => setValue('landlordPhone', value)}
      landlordWhatsapp={landlordWhatsapp}
      setLandlordWhatsapp={(value: string) =>
        setValue('landlordWhatsapp', value)
      }
    />
  );
}