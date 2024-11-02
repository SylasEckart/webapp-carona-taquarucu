
"use client";

import { LocationProvider} from "./context/LocationContext";


interface LayoutClientProps {
  children: React.ReactNode;
  email?: string;
}

export default function LayoutClient({ children,email }: LayoutClientProps) {
  
  return (
    <LocationProvider userEmail={email || undefined}>
        <main className="min-h-screen flex flex-col items-center">
            {children}
        </main>
    </LocationProvider>
  )
  
  
}
