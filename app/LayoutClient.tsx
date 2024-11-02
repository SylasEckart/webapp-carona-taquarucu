/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import { LocationProvider } from "./context/LocationContext";
import { fetchUser } from "@/services/supabase/client/Auth";
import { Backdrop, CircularProgress } from "@mui/material";



interface LayoutClientProps {
  children: React.ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const { data:{user}, error } = await fetchUser();
      if (!error && user) {
        setUser({});
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  if (loading) {
    return <Backdrop
    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
    open={loading}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
  }
  return (
       
        <LocationProvider user={user || undefined}>
          <main className="min-h-screen flex flex-col items-center">
                {children}
          </main>
          </LocationProvider>
  )
  
  
}
