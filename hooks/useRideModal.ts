import { useState, useCallback } from 'react';

interface RideDriver {
  name: string;
  rating: number;
  image?: string;
}

interface RideDetails {
  id: string;
  type: string;
  time: string;
  remainingSeats: number;
  driver?: RideDriver;
  price?: number;
  pickup?: { lat: number; lng: number };
  destination?: { lat: number; lng: number };
}

interface UseRideModalReturn {
  isModalOpen: boolean;
  selectedRide: RideDetails | null;
  openModal: (ride: Partial<RideDetails>) => void;
  closeModal: () => void;
  confirmRide: () => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

export const useRideModal = (
  onRideConfirm?: (ride: RideDetails) => Promise<void>
): UseRideModalReturn => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState<RideDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const openModal = useCallback((ride: Partial<RideDetails>) => {
    // Enrich ride data with default values if needed
    const enrichedRide = {
      ...ride,
      driver: ride.driver || {
        name: 'Motorista',
        rating: 4.8,
      },
      price: ride.price || calculateRidePrice(ride),
    } as RideDetails;

    setSelectedRide(enrichedRide);
    setIsModalOpen(true);
    setError(null);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedRide(null);
    setError(null);
  }, []);

  const calculateRidePrice = (ride: Partial<RideDetails>): number => {
    // Implement your price calculation logic here
    // This is just a placeholder implementation
    const basePrice = 15;
    const pricePerSeat = 5;
    return basePrice + (ride.remainingSeats || 0) * pricePerSeat;
  };

  const confirmRide = async (): Promise<void> => {
    if (!selectedRide) return;

    try {
      setIsLoading(true);
      setError(null);

      if (onRideConfirm) {
        await onRideConfirm(selectedRide);
      } else {
        // Default confirmation logic
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
        console.log('Ride confirmed:', selectedRide);
      }

      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to confirm ride'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isModalOpen,
    selectedRide,
    openModal,
    closeModal,
    confirmRide,
    isLoading,
    error,
  };
};

export type { RideDetails, RideDriver };