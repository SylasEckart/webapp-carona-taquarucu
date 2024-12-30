"use client"

import React, {  useState } from 'react'
import { useLocationContext } from '../context/LocationContext';
import { useUserContext } from '../context/UserContext';
import {
  Box,
  Card,
  CardContent,
  Fade,
  
  Typography,
} from '@mui/material'
import { UserMapComponent } from '../../components/maps/MapWrapper';
import LocationInputs  from './LocationInputs';
import RideTabs from './RideTabs';
import { taquarucuSquarelocation } from '@/types/constants';
import { useRideModal } from '@/hooks/useRideModal';
// import { Add } from '@mui/icons-material';
// import { LocationButton } from '@/components/button/LocationButton';
// import useLocationActions from '@/hooks/useLocationAction';

export default function Dashboard() {
  const { location: locationObj } = useLocationContext();
  const {user} = useUserContext();
  const location = locationObj?.location;
  const [pickup, setPickup] = useState(location);
  const [destination, setDestination] = useState('');
  const [rideOptions] = useState([
    { id: '1', type: 'Amigo 1', time: '35 min', remainingSeats: 1 },
    { id: '2', type: 'Amigo 2', time: '45 min', remainingSeats: 2 },
    { id: '3', type: 'Amigo 3', time: '50 min', remainingSeats: 3 },
  ]);

  // Use the custom hook
  const {
    openModal  } = useRideModal(async (ride) => {
    console.log('Ride confirmed:', ride);
  });

  const handleSelectRide = (ride: { id: string; type: string; time: string; remainingSeats: number }) => {
    openModal({
      ...ride,
      pickup: pickup ? { lat: pickup.lat, lng: pickup.lng } : undefined,
      destination: destination ? { lat: 0, lng: 0 } : undefined, // Replace with actual coordinates
    });
  };

  if (!user || !user.email) return null;

  const firstName = user.name.split(" ")[0];


  return (
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        <Fade in={true} timeout={1000}>
          <Box sx={{ mb: 2 }}>
            <UserMapComponent 
              user={user} 
              location={location ? [location.lat, location.lng] : taquarucuSquarelocation} 
            />
          </Box>
        </Fade>

        <Card elevation={0} sx={{ mb: 2, borderRadius: 4 }}>
          <CardContent>
            <Typography gutterBottom className='mb-2'>
              Olá {firstName}, para onde você quer ir hoje?
            </Typography>
            <LocationInputs
              pickup={pickup}
              setPickup={setPickup}
              destination={destination}
              setDestination={setDestination}
            />
            <RideTabs options={rideOptions} onSelectRide={handleSelectRide} />
          </CardContent>
        </Card>
      </Box>
  );
}