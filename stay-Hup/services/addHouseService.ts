import { auth, db } from '@/firebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export type AddFormData = {
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

export async function addPendingHouse(data: AddFormData) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('Please login first');
  }

  await addDoc(collection(db, 'housing'), {
    title: data.title.trim(),
    description: data.description.trim(),
    price: data.price.trim(),
    type: data.type.trim(),
    location: data.location.trim(),
    distance: data.location.trim(),
    amenities: data.amenities || [],
    ownerId: user.uid,
    landlord: {
      name: data.landlordName.trim(),
      phone: data.landlordPhone.trim(),
      whatsapp:
        data.landlordWhatsapp.trim() || data.landlordPhone.trim(),
    },
    createdAt: serverTimestamp(),
  });
}