'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import Header from './Header'
import useDarkMode from '@/hooks/useDarkMode'
import useLocationActions from '@/hooks/useLocationAction'
import { useLocationContext } from '@/app/context/LocationContext'
import AppLoader from '../ui/AppLoader'
import { LocationButton } from '../button/LocationButton'
import { useRouter } from 'next/navigation'

// import Header from './header'

interface LoggedInLayoutProps {
  children: React.ReactNode
}

export default function Logged({ children }: LoggedInLayoutProps) {

  const router = useRouter()
  const { setLocation, location,contextLoading,user } = useLocationContext()
    const { theme, toggleTheme } = useDarkMode()
    const { locationVerified, verifyLocation } = useLocationActions(setLocation)

    if(!contextLoading && !user) return <AppLoader message='Carregando' />

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* <Header  /> */}
      <main className="flex-grow">
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
        <Header toggleTheme={toggleTheme} isDarkMode={theme.palette.mode === 'dark'} router={router} />
        {
          !contextLoading && !locationVerified && !location && (
          <LocationButton locationVerified={!!locationVerified} loading={contextLoading} verifyLocation={verifyLocation} />
          )
        }
        {children}
      </Box>
    </ThemeProvider>
        
      </main>
    </motion.div>
  )

 
}