/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAllUsers } from '@/services/supabase/client/User';
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';


export type ListUsers = {
  name: string;
  friendships: any[];
  user_id: string;
  isFriend?: boolean;
}
interface AppContextProps {
  isOnline: boolean;
  setIsOnline: Dispatch<SetStateAction<boolean>>;
  theme: 'light' | 'dark';
  setTheme: Dispatch<SetStateAction<'light' | 'dark'>>;
  pwaStatus: 'installed' | 'not-installed' | 'installing';
  setPwaStatus: Dispatch<SetStateAction<'installed' | 'not-installed' | 'installing'>>;
  listUsers: any[];
  isLoading: boolean;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  userEmail?: string;
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children,userEmail }) => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [pwaStatus, setPwaStatus] = useState<'installed' | 'not-installed' | 'installing'>('not-installed');
  const [listUsers,setListUsers] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

 useEffect(() => {
        let isMounted = true;
    
        const fetchData = async () => {
          try {
            const { data } = await getAllUsers(userEmail);
            if (isMounted) setListUsers(data);
          } catch (error) {
            console.error('Fetch user data failed:', error);
          } finally {
            if (isMounted) setLoading(false);
          }
        };
    
        if (typeof window !== 'undefined') {
          fetchData();
        } else {
          setLoading(false);
        }
    
        return () => {
          isMounted = false;
        };
      }, []);


  return (
    <AppContext.Provider value={{ isOnline, setIsOnline,isLoading, listUsers, theme, setTheme, pwaStatus, setPwaStatus }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within an AppProvider");
  return context;
};
