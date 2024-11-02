
"use client";

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { User, Ride } from '@/types/Interfaces';
// import { fetchUserData } from '@/services/supabase/client/User';

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


  console.log('userEmail',userEmail)
  const [loading] = useState(true);
  const [location, setLocation] = useState<LocationType>(undefined);
  const [ride, setRide] = useState<Ride | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);

  // useEffect(() => {
  //   if (userEmail && !user) {
  //     const fetchData = async () => {
  //       try {
  //         const { data, error } = await fetchUserData(userEmail);
  //         console.log('data',data,error)
  //         if (error) {
  //           throw new Error(`Error fetching user data: ${error.message}`);
  //         }
  //         if (!data) {
  //           throw new Error('User not found');
  //         }
  //         if(!error){
  //           console.log('data',data)
  //           setUser(data);

  //         }
  //       } catch (error) {
  //         console.error('Fetch user data failed:', error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  
  //     fetchData();
  //   } else {
  //     setLoading(false);
  //   }
  // }, [userEmail, user]);

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
