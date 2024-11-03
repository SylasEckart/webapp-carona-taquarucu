"use client"

import Logged from "@/components/layout/Logged"
import { LocationProvider } from "./context/LocationContext"
import { AnimatePresence } from "framer-motion"
import Unlogged from "@/components/layout/Unlogged"

interface LayoutClientProps {
  children: React.ReactNode
  email?: string
}

export default function LayoutClient({ children, email }: LayoutClientProps) {
  const isLoggedIn = !!email
  
  return (
    <LocationProvider userEmail={email || undefined}>
      <AnimatePresence>
      {isLoggedIn ? (
          <Logged key="logged-in">
            {children}
          </Logged>
        ) : (
          <Unlogged key="logged-out">
            {children}
          </Unlogged>
        )}
      </AnimatePresence>
    </LocationProvider>
  )
}