"use client";

import { getAllUsersButMe } from '@/services/supabase/client/User';
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';


export type ListUsers = {
  name?: string;
  friendships?: string[];
  user_id?: string;
  isSender?: boolean;
  isFriend?: boolean;
  isPending?: boolean;
  friendshipId?: string;
}
interface AppContextProps {
  isOnline: boolean;
  setIsOnline: Dispatch<SetStateAction<boolean>>;
  theme: 'light' | 'dark';
  setTheme: Dispatch<SetStateAction<'light' | 'dark'>>;
  pwaStatus: 'installed' | 'not-installed' | 'installing';
  setPwaStatus: Dispatch<SetStateAction<'installed' | 'not-installed' | 'installing'>>;
  listUsers: ListUsers[];
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
  const [listUsers,setListUsers] = useState<ListUsers[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
 

 useEffect(() => {
        let isMounted = true;
    
        const fetchData = async () => {
          try {
            const { data } = await getAllUsersButMe(userEmail);
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
