import * as SecureStore from 'expo-secure-store';

const USER_ID_KEY = 'userUid';

export async function saveUserId(uid: string) {
  await SecureStore.setItemAsync(USER_ID_KEY, uid);
}

export async function getUserId() {
  return SecureStore.getItemAsync(USER_ID_KEY);
}

export async function removeUserId() {
  await SecureStore.deleteItemAsync(USER_ID_KEY);
}