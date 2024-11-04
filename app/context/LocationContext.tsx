"use client";

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { User, Ride, ModalContentType } from '@/types/Interfaces';
import { fetchUserData, setCurrentUserLocation } from '@/services/supabase/client/User';

type LocationType = { lat: number; lng: number } | undefined;

type modal = {
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  contentType?: ModalContentType;
};
interface LocationContextProps {
  modal: modal;
  setModal: Dispatch<SetStateAction<modal>>;
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
  const [modal,setModal] = useState<modal>({isOpen:false,onClose:()=>{},title:''});

  useEffect(() => {
    if (typeof window !== 'undefined' && userEmail && !user) {
      const fetchData = async () => {
        try {
          const { data, error } = await fetchUserData(userEmail);
          console.log('data', data, error);
          if (error) {
            throw new Error(`Error fetching user data: ${error.message}`);
          }
          if (!data) {
            throw new Error('User not found');
          }
          console.log('data', data,location);
          setUser(data);
        } catch (error) {
          console.error('Fetch user data failed:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, [userEmail, user]);

  useEffect(() => {
    if (location && user) {
      setCurrentUserLocation(user.email, location);
    }
  }, [location]);

  return (
    <LocationContext.Provider value={{ contextLoading: loading, location, setLocation, user, setUser, ride, setRide,modal,setModal }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = (): LocationContextProps => {
  const context = useContext(LocationContext);
  if (!context) throw new Error("useLocationContext must be used within a LocationProvider");
  return context;
};
