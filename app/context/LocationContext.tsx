
"use client";

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { User, Ride } from '@/types/Interfaces';
import { fetchUserData } from '@/services/supabase/client/User';

type LocationType = { lat: number; lng: number } | undefined;

interface LocationContextProps {
  contextLoading: boolean;
  location: LocationType;
  setLocation: Dispatch<SetStateAction<LocationType>>;
  user?: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  ride?: Ride | undefined;
  setRide: Dispatch<SetStateAction<Ride | undefined>>;
}

const LocationContext = createContext<LocationContextProps | undefined>(undefined);

interface LocationProviderProps {
  children: ReactNode;
  userEmail?: string;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children, userEmail }) => {

  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<LocationType>(undefined);
  const [ride, setRide] = useState<Ride | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (userEmail && !user) {
      const fetchData = async () => {
        try {
          const {data} = await fetchUserData(userEmail);
          setUser(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
        } else {
      setLoading(false);
    }
  }, [userEmail,user]);

  return (
    <LocationContext.Provider value={{ contextLoading:loading, location, setLocation, user,setUser, ride, setRide }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = (): LocationContextProps => {
  const context = useContext(LocationContext);
  if (!context) throw new Error("useLocationContext must be used within a LocationProvider");
  return context;
};
