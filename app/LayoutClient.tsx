/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import { LocationProvider } from "./context/LocationContext";
import { fetchUser } from "@/services/supabase/client/Auth";



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
    return <div>Loading...</div>;
  }

  return (
       
        <LocationProvider user={user || undefined}>
          <main className="min-h-screen flex flex-col items-center">
            {/* <div className="flex-1 w-full flex flex-col gap-20 items-center"> */}
              {/* <div className="flex flex-col gap-20 max-w-5xl p-5"> */}
                {children}
              {/* </div> */}
            {/* <Footer /> */}
            {/* </div> */}
          </main>
          </LocationProvider>
  )
  
  
}
