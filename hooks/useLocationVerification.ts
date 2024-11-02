import { useState } from 'react';
import { isLocationWithinRange } from '@/services/supabase/client/MapsService';

const useLocationVerification = (setLocation: (loc: { lat: number, lng: number }) => void) => {
  const [locationVerified, setLocationVerified] = useState<boolean | undefined>(undefined);
  const [error, setError] = useState<string>('');
  const [locationData, setLocationData] = useState<{ lat: number, lng: number }>({ lat: 0, lng: 0 });

  const verifyLocation = async () => {
    setError('');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          if (!latitude || !longitude) return setError('Unable to retrieve location.');

          const locationObj = { lat: latitude, lng: longitude };
          setLocation(locationObj);
          setLocationData(locationObj);

          const { data, error } = await isLocationWithinRange(latitude, longitude);
          console.log('data',data,error)

          if (error) {
            setError('Location verification failed.');
          }
           else {
            if(!data) setError('Não está na area de cobertura');
            setLocationVerified(Boolean(data));
          }
        },
        () => setError('Please enable location services.')
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  return { locationVerified, verifyLocation, error,locationData };
};

export default useLocationVerification;