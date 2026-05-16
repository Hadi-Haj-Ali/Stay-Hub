import { auth, db } from '@/firebaseConfig';
import { removeUserId } from '@/services/secureStore';
import { signOut } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

export type UserData = {
  name: string;
  email: string;
  phone: string;
  role: string;
};

export type PendingHouse = {
  id: string;
  title?: string;
  price?: string;
  location?: string;
  type?: string;
};

export type FavoriteHouse = {
  id: string;
  title?: string;
  price?: string;
  location?: string;
  distance?: string;
  image?: string;
};

export async function getUserProfile(uid: string, email: string | null) {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    return {
      name: 'User',
      email: email || '',
      phone: '',
      role: 'student',
    };
  }

  const data = userSnap.data();

  return {
    name: String(data.name || ''),
    email: String(data.email || email || ''),
    phone: String(data.phone || ''),
    role: String(data.role || 'student'),
  };
}

export async function getPendingHouses(uid: string) {
  const q = query(
    collection(db, 'pending_housing'),
    where('ownerId', '==', uid)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as PendingHouse[];
}

export async function deletePendingHouse(id: string) {
  await deleteDoc(doc(db, 'pending_housing', id));
}

export async function getFavoriteHousesByIds(ids: string[]) {
  if (ids.length === 0) {
    return [];
  }

  const q = query(
    collection(db, 'housing'),
    where(documentId(), 'in', ids)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as FavoriteHouse[];
}

export async function logoutUser() {
  await removeUserId();
  await signOut(auth);
}