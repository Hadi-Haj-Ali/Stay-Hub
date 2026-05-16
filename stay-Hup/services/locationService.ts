import * as Location from 'expo-location';

export async function getCurrentLocationText() {
  const permission = await Location.requestForegroundPermissionsAsync();

  if (permission.status !== 'granted') {
    throw new Error('Location permission denied');
  }

  const currentLocation = await Location.getCurrentPositionAsync({});

  const latitude = currentLocation.coords.latitude;
  const longitude = currentLocation.coords.longitude;

  return `${latitude}, ${longitude}`;
}