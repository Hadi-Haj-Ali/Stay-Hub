import React from 'react';
import HomeScreen from '../../components/HomeScreen';

export default function Index() {
  const houses = [
    {
      id: '1',
      title: 'Single Student Room ',
      price: '8000',
      distance: '0.5 km',
      location: 'Near University Gate',
      image:  require('../../assets/images/1.jpg'),
      amenities: ['WiFi', 'Water'],
      description: 'Nice place for students',
      landlord: {
        name: 'Ameer',
        phone: '0590000000',
        whatsapp: '0590000000',
      },
      reviews: {
        rating: 4.5,
        count: 10,
        comments: [],
      },
    },
    {
      id: '2',
      title: 'shared Studant Room ',
      price: '7000',
      distance: '1.2 km',
      location: 'City Center',
     image: require('../../assets/images/2.jpg'),
      amenities: ['Kitchen', 'Parking'],
      description: 'Affordable shared place',
      landlord: {
        name: 'Hadi',
        phone: '0591111111',
        whatsapp: '0591111111',
      },
      reviews: {
        rating: 4.2,
        count: 8,
        comments: [],
      },
    },
  ];

  return (
    <HomeScreen
      houses={houses}
      favorites={['1']}
      onToggleFavorite={(id: string) => console.log('Fav:', id)}
    />
  );
}