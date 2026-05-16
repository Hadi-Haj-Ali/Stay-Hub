import axios from 'axios';

export async function getHousingTip() {
  await axios.get('https://jsonplaceholder.typicode.com/posts/1');

  return 'Check the location, price, and contact information before booking a house.';
}