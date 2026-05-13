import { auth, db } from '@/firebaseConfig';
import { router } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
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

export default function AddScreen() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');

  const [location, setLocation] = useState('');
  const [landlordName, setLandlordName] = useState('');
  const [landlordPhone, setLandlordPhone] = useState('');
  const [landlordWhatsapp, setLandlordWhatsapp] = useState('');

  const [amenities, setAmenities] = useState<string[]>([]);

  const canGoNext =
    step === 1
      ? title.trim() && description.trim() && price.trim() && type.trim()
      : step === 2
      ? location.trim() && landlordName.trim() && landlordPhone.trim()
      : true;

  const toggleAmenity = (item: string) => {
    if (amenities.includes(item)) {
      setAmenities(amenities.filter((a) => a !== item));
      return;
    }

    setAmenities([...amenities, item]);
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setType('');
    setLocation('');
    setLandlordName('');
    setLandlordPhone('');
    setLandlordWhatsapp('');
    setAmenities([]);
    setStep(1);
  };

  const publishHouse = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Login Required', 'Please login first');
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, 'pending_housing'), {
        title: title.trim(),
        description: description.trim(),
        price: price.trim(),
        type,
        location: location.trim(),
        distance: location.trim(),
        amenities,
        ownerId: user.uid,
        landlord: {
          name: landlordName.trim(),
          phone: landlordPhone.trim(),
          whatsapp: landlordWhatsapp.trim() || landlordPhone.trim(),
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
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              price={price}
              setPrice={setPrice}
              type={type}
              setType={setType}
            />
          )}

          {step === 2 && (
            <AddContactInfo
              location={location}
              setLocation={setLocation}
              landlordName={landlordName}
              setLandlordName={setLandlordName}
              landlordPhone={landlordPhone}
              setLandlordPhone={setLandlordPhone}
              landlordWhatsapp={landlordWhatsapp}
              setLandlordWhatsapp={setLandlordWhatsapp}
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
          onSubmit={publishHouse}
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