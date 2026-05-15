import { auth, db } from '@/firebaseConfig';
import { router } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import AddBasicInfo from '../ui/Add-ui/AddBasicInfo';
import AddBottomButtons from '../ui/Add-ui/AddBottomButtons';
import AddContactInfo from '../ui/Add-ui/AddContactInfo';
import AddExtraInfo from '../ui/Add-ui/AddExtraInfo';
import AddHeader from '../ui/Add-ui/AddHeader';

type AddFormData = {
  title: string;
  description: string;
  price: string;
  type: string;
  location: string;
  landlordName: string;
  landlordPhone: string;
  landlordWhatsapp: string;
  amenities: string[];
};

export default function AddScreen() {
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

  const clearForm = () => {
    reset();
    setStep(1);
  };

  const publishHouse = async (data: AddFormData) => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Login Required', 'Please login first');
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, 'pending_housing'), {
        title: data.title.trim(),
        description: data.description.trim(),
        price: data.price.trim(),
        type: data.type,
        location: data.location.trim(),
        distance: data.location.trim(),
        amenities: data.amenities,
        ownerId: user.uid,
        landlord: {
          name: data.landlordName.trim(),
          phone: data.landlordPhone.trim(),
          whatsapp:
            data.landlordWhatsapp.trim() || data.landlordPhone.trim(),
        },
        createdAt: serverTimestamp(),
      });

      Alert.alert('Done', 'Request sent');
      clearForm();
      router.replace('/(tabs)' as any);
    } catch (error) {
      Alert.alert('Error', 'Request not sent');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.page}>
      <KeyboardAvoidingView
        style={styles.page}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <AddHeader
          step={step}
          onBack={() => router.replace('/(tabs)' as any)}
        />

        <ScrollView contentContainerStyle={styles.content}>
          {step === 1 && (
            <AddBasicInfo
              title={title}
              setTitle={(value: string) => setValue('title', value)}
              description={description}
              setDescription={(value: string) =>
                setValue('description', value)
              }
              price={price}
              setPrice={(value: string) => setValue('price', value)}
              type={type}
              setType={(value: string) => setValue('type', value)}
            />
          )}
          {step === 2 && (
            <AddContactInfo
              location={location}
              setLocation={(value: string) =>
                setValue('location', value)
              }
              landlordName={landlordName}
              setLandlordName={(value: string) =>
                setValue('landlordName', value)
              }
              landlordPhone={landlordPhone}
              setLandlordPhone={(value: string) =>
                setValue('landlordPhone', value)
              }
              landlordWhatsapp={landlordWhatsapp}
              setLandlordWhatsapp={(value: string) =>
                setValue('landlordWhatsapp', value)
              }
            />
          )}

          {step === 3 && (
            <AddExtraInfo
              amenities={amenities}
              toggleAmenity={toggleAmenity}
            />
          )}
        </ScrollView>

        <AddBottomButtons
          step={step}
          loading={loading}
          canGoNext={!!canGoNext}
          onPrev={() => setStep(step - 1)}
          onNext={() => setStep(step + 1)}
          onSubmit={handleSubmit(publishHouse)}
        />
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 20,
    paddingBottom: 30,
  },
});