import { router } from 'expo-router';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useAddHouseForm } from '@/hooks/useAddHouseForm';
import AddBottomButtons from '../ui/Add-ui/AddBottomButtons';
import AddHeader from '../ui/Add-ui/AddHeader';
import AddBasicStep from './AddSteps/AddBasicStep';
import AddContactStep from './AddSteps/AddContactStep';
import AddExtraStep from './AddSteps/AddExtraStep';

export default function AddScreen() {
  const form = useAddHouseForm();

  return (
    <View style={styles.page}>
      <KeyboardAvoidingView
        style={styles.page}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <AddHeader
          step={form.step}
          onBack={() => router.replace('/(tabs)' as any)}
        />

        <ScrollView contentContainerStyle={styles.content}>
          {form.step === 1 && (
            <AddBasicStep
              title={form.title}
              description={form.description}
              price={form.price}
              type={form.type}
              setValue={form.setValue}
            />
          )}

          {form.step === 2 && (
            <AddContactStep
             location={form.location}
             landlordName={form.landlordName}
            landlordPhone={form.landlordPhone}
            landlordWhatsapp={form.landlordWhatsapp}
            setValue={form.setValue}
            onUseLocation={form.useCurrentLocation}
            />
)}

          {form.step === 3 && (
            <AddExtraStep
              amenities={form.amenities}
              toggleAmenity={form.toggleAmenity}
            />
          )}
        </ScrollView>

        <AddBottomButtons
          step={form.step}
          loading={form.loading}
          canGoNext={!!form.canGoNext}
          onPrev={() => form.setStep(form.step - 1)}
          onNext={() => form.setStep(form.step + 1)}
          onSubmit={form.handleSubmit(form.submitHouse)}
          onSaveDraft={form.saveOfflineDraft}
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