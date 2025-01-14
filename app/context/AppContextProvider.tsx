/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from "react";
import { LocationProvider } from "./LocationContext";
import { AppProvider } from "./AppContext";
import { UserProvider } from "./UserContext";
import { ModalProvider } from "./ModalContext";
import { User } from "@supabase/supabase-js";
import { NotificationProvider } from "./NotificationContext";
import { FriendshipProvider } from "./FriendshipContext";

interface AppContextProviderProps {
  children: ReactNode;
  user?: User;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children, user }) => {
  return (
    <CombinedProviders
      providers={[
        LocationProvider,
        ModalProvider,
        AppProvider,
        UserProvider,
        FriendshipProvider,
        NotificationProvider,
      ]}
      contextProps={[
        null, // LocationProvider props
        null, // ModalProvider props
        { userEmail: user?.email }, // AppProvider props
        { userEmail: user?.email, userId: user?.id }, // UserProvider props
        { userId: user?.id},
        { userId: user?.id},
      ]}
    >
      {children}
    </CombinedProviders>
  );
};


const CombinedProviders: React.FC<{
  providers: React.ComponentType<any>[];
  contextProps: any[];
  children: ReactNode;
}> = ({ providers, contextProps, children }) => {
  return providers.reduceRight((acc, Provider, index) => {
    const props = contextProps[index];
    return <Provider {...props}>{acc}</Provider>;
  }, children as ReactNode);
};
