"use client"


import { LocationProvider } from "./context/LocationContext"
import { AnimatePresence, motion } from "framer-motion"


interface LayoutClientProps {
  children: React.ReactNode
  email?: string
}

export default function LayoutClient({ children, email }: LayoutClientProps) {
   

  return (
    <LocationProvider userEmail={email || undefined}>
      <AnimatePresence>
     
      <motion.main
          className="min-h-screen flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </LocationProvider>
  )
}