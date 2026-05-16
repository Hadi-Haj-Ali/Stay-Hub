import { router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';

import { AddFormData, addPendingHouse } from '@/services/addHouseService';

export function useAddHouseForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const { watch, setValue, handleSubmit, reset } = useForm<AddFormData>({
    defaultValues: {
      title: '',
      description: '',
      price: '',
      type: '',
      location: '',
      landlordName: '',
      landlordPhone: '',
      landlordWhatsapp: '',
      amenities: [],
    },
  });

  const title = watch('title');
  const description = watch('description');
  const price = watch('price');
  const type = watch('type');

  const location = watch('location');
  const landlordName = watch('landlordName');
  const landlordPhone = watch('landlordPhone');
  const landlordWhatsapp = watch('landlordWhatsapp');

  const amenities = watch('amenities');

  const canGoNext =
    step === 1
      ? title.trim() && description.trim() && price.trim() && type.trim()
      : step === 2
      ? location.trim() && landlordName.trim() && landlordPhone.trim()
      : true;

  const toggleAmenity = (item: string) => {
    if (amenities.includes(item)) {
      setValue(
        'amenities',
        amenities.filter((value) => value !== item)
      );
      return;
    }

    setValue('amenities', [...amenities, item]);
  };

  const submitHouse = async (data: AddFormData) => {
    try {
      setLoading(true);

      await addPendingHouse(data);

      Alert.alert('Done', 'Request sent');
      reset();
      setStep(1);
      router.replace('/(tabs)' as any);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Request not sent');
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    setStep,
    loading,
    setValue,
    handleSubmit,
    submitHouse,
    canGoNext,
    toggleAmenity,

    title,
    description,
    price,
    type,
    location,
    landlordName,
    landlordPhone,
    landlordWhatsapp,
    amenities,
  };
}