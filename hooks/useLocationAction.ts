import { useState } from 'react';
import { isLocationWithinRange } from '@/services/supabase/client/LocationService';

const useLocationActions = (
  setLocation?: (loc: { locationName?: string; location: { lat: number; lng: number } }) => void
) => {
  const [locationVerified, setLocationVerified] = useState<boolean | undefined>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [destination, setDestination] = useState<[number, number] | undefined>(undefined);

  const verifyLocation = async () => {
    setError('');
    setLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          if (!latitude || !longitude) {
            setError('Não foi possível obter a localização');
            setLoading(false);
            return;
          }

          const locationObj = { lat: latitude, lng: longitude };
          setLocation?.({ location: locationObj });

          try {
            const { data, error } = await isLocationWithinRange(latitude, longitude);
            if (error) {
              setError('Erro ao verificar a localização');
            } else if (!data) {
              setError('Não está na área de cobertura');
            } else {
              setLocationVerified(true);
            }

            const locationName = await getLocationFromCoords({ lat: latitude, lng: longitude });
            if (locationName) setLocation?.({ locationName, location: locationObj });
          } catch (err) {
            setError('Erro ao processar a verificação de localização, err:' + err);
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError('Por favor, habilite o serviço de geolocalização');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocalização não suportada');
      setLoading(false);
    }
  };

  interface SearchLocationParams {
    destination: string;
  }

  const searchLocation = async ({ destination }: SearchLocationParams): Promise<void> => {
    if (!destination) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(destination)}&format=json`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        const coords: [number, number] = [parseFloat(lat), parseFloat(lon)];
        setDestination(coords);
      } else {
        setError('Endereço não encontrado!');
      }
    } catch (error) {
      setError('Erro ao buscar o endereço!');
      console.error('Erro ao buscar o endereço:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLocationFromCoords = async ({ lat, lng }: { lat: number; lng: number }): Promise<string | undefined> => {
    if (!lat || !lng) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      );
      const data = await response.json();

      if (data && data.display_name) {
        return data.display_name;
      } else {
        setError('Endereço não encontrado!');
      }
    } catch (error) {
      setError('Erro ao buscar o endereço!');
      console.error('Erro ao buscar o endereço:', error);
    }
  };

  return {
    locationVerified,
    verifyLocation,
    error,
    loading,
    searchLocation,
    destination,
    setDestination,
    getLocationFromCoords,
  };
};

export default useLocationActions;
