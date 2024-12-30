import { fetchUserData } from '@/services/supabase/client/User';
import { User } from '@/types/Interfaces';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface UserContextProps {
    isLoading: boolean;
    user: User | null;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
    userEmail?: string;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children, userEmail }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        let isMounted = true;
    
        const fetchData = async () => {
          try {
            const {data} = await fetchUserData(userEmail as string);
            if (isMounted) setUser(data);
          } catch (error) {
            console.error('Fetch user data failed:', error);
          } finally {
            if (isMounted) setLoading(false);
          }
        };
    
        if (typeof window !== 'undefined' && userEmail && !user) {
          fetchData();
        } else {
          setLoading(false);
        }
    
        return () => {
          isMounted = false;
        };
      }, [userEmail, user]);

    return (
        <UserContext.Provider value={{ user, isLoading: loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = (): UserContextProps => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};