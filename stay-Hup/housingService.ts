import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export async function getHouses() {
  const snapshot = await getDocs(collection(db, 'housing'));

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}