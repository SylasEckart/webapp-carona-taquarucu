"use client";

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { Ride } from '@/types/Interfaces';

type LocationType = {
  locationName?: string | null;
  location: { lat: number; lng: number };
} | undefined;



interface LocationContextProps {
  location: LocationType;
  setLocation: Dispatch<SetStateAction<LocationType>>;
  ride?: Ride;
  setRide: Dispatch<SetStateAction<Ride | undefined>>;
}

const LocationContext = createContext<LocationContextProps | undefined>(undefined);

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [location, setLocation] = useState<LocationType>(undefined);
  const [ride, setRide] = useState<Ride | undefined>(undefined);
 

  return (
    <LocationContext.Provider value={{ location, setLocation, ride, setRide}}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = (): LocationContextProps => {
  const context = useContext(LocationContext);
  if (!context) throw new Error("useLocationContext must be used within a LocationProvider");
  return context;
};
