import { useState } from 'react';
import { isLocationWithinRange } from '@/services/supabase/client/LocationService';

const useLocationActions = (setLocation: (loc: { lat: number, lng: number }) => void) => {
  const [locationVerified, setLocationVerified] = useState<boolean | undefined>(undefined);
  const [error, setError] = useState<string>('');
  const [myLocation, setmyLocation] = useState<{ lat: number, lng: number }>({ lat: 0, lng: 0 });
  const [destination, setDestination] = useState<[number, number] | undefined>(undefined);

  const verifyLocation = async () => {
    setError('');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          if (!latitude || !longitude) return setError('Não foi possivel obter a localização');

          const locationObj = { lat: latitude, lng: longitude };
          setLocation(locationObj);
          setmyLocation(locationObj);

          const { data, error } = await isLocationWithinRange(latitude, longitude);
          console.log('data',data,error)

          if (error) {
            setError('Erro ao verificar a localização');
          }
           else {
            if(!data) setError('Não está na area de cobertura');
            setLocationVerified(Boolean(data));
          }
        },
        () => setError('Por Favor habilite o serviço de geolocalização')
      );
    } else {
      setError('Geolocalização não suportada');
    }
  };


  interface SearchLocationParams {
    destination: string;
    addMarker: (coords: [number, number], label: string) => void;
    setView: (coords: [number, number], zoom: number) => void;
  }

  const searchLocation = async ({ destination}: SearchLocationParams): Promise<void> => {
    if (!destination) return;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(destination)}&format=json`);
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        const coords: [number, number] = [parseFloat(lat), parseFloat(lon)];
        setDestination(coords);
        
      } else {
        setError("Endereço não encontrado!");
      }
    } catch (error) {
      console.error("Erro ao buscar o endereço:", error);
    }
  };

  return { locationVerified, verifyLocation, error,myLocation,searchLocation, destination, setDestination };
};

export default useLocationActions;