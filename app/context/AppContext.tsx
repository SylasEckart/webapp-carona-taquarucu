"use client";

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface AppContextProps {
  isOnline: boolean;
  setIsOnline: Dispatch<SetStateAction<boolean>>;
  theme: 'light' | 'dark';
  setTheme: Dispatch<SetStateAction<'light' | 'dark'>>;
  pwaStatus: 'installed' | 'not-installed' | 'installing';
  setPwaStatus: Dispatch<SetStateAction<'installed' | 'not-installed' | 'installing'>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [pwaStatus, setPwaStatus] = useState<'installed' | 'not-installed' | 'installing'>('not-installed');

  return (
    <AppContext.Provider value={{ isOnline, setIsOnline, theme, setTheme, pwaStatus, setPwaStatus }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within an AppProvider");
  return context;
};
