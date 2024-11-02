/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { User, Ride } from '@/types/Interfaces';

type LocationType = { lat: number; lng: number } | undefined;

interface LocationContextProps {
  location: LocationType;
  setLocation: Dispatch<SetStateAction<LocationType>>;
  user?: User | null;
  setUser: Dispatch<SetStateAction<any | null>>;
  ride?: Ride | null;
  setRide: Dispatch<SetStateAction<Ride | null>>;
}

const LocationContext = createContext<LocationContextProps | undefined>(undefined);

interface LocationProviderProps {
  children: ReactNode;
  user?: User;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children, user }) => {
  const [location, setLocation] = useState<LocationType>(undefined);
  const [ride, setRide] = useState<Ride | null>(null);
  const [userState, setUser] = useState<User | null>(user ?? null);

  return (
    <LocationContext.Provider value={{ location, setLocation, user: userState, setUser, ride, setRide }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = (): LocationContextProps => {
  const context = useContext(LocationContext);
  if (!context) throw new Error("useLocationContext must be used within a LocationProvider");
  return context;
};
