import React, { ReactNode } from 'react';
import { LocationProvider } from './LocationContext';
import { AppProvider } from './AppContext';
import { UserProvider } from './UserContext';
import { ModalProvider } from './ModalContext';
import { User } from '@supabase/supabase-js';
import { FriendshipProvider } from './FriendshipContext';

interface AppContextProviderProps {
  children: ReactNode;
  user?: User
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children, user }) => {

  return (
    <LocationProvider>
      <AppProvider userEmail={user?.email}>
        <UserProvider userEmail={user?.email}>
          <FriendshipProvider userId={user?.id || ""}>
          <ModalProvider>
            {children}
          </ModalProvider>
          </FriendshipProvider>
        </UserProvider>
      </AppProvider>
    </LocationProvider>
  );
};
