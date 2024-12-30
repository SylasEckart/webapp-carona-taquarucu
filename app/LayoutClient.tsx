"use client"


import { Box, CssBaseline, ThemeProvider } from "@mui/material"
import { LocationProvider } from "./context/LocationContext"
import { AnimatePresence, motion } from "framer-motion"
import useDarkMode from "@/hooks/useDarkMode"
import Header from "@/components/layout/header"
import { useRouter } from "next/navigation"
import ModalDefault from "@/components/ui/Modal"
import { QuickActions } from "@/components/layout/QuickActions"
import InstallPWA from "@/components/pwa/InstallPWA"
import { ModalProvider } from "./context/ModalContext"
import { AppProvider } from "./context/AppContext"
import { UserProvider } from "./context/UserContext"


interface LayoutClientProps {
  children: React.ReactNode
  email?: string
}

export default function LayoutClient({ children, email }: LayoutClientProps) {

  const { theme, toggleTheme } = useDarkMode()
  const router = useRouter();

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  console.log('pathname', pathname);

  return (

    <LocationProvider>
      <InstallPWA/>
      <AnimatePresence>
      <ThemeProvider theme={theme}>
      <AppProvider>
      <UserProvider userEmail={email}>

      <CssBaseline />
      <ModalProvider>         


      <motion.main
          style={{
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            flexGrow: 1,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            

          }}
          className="min-h-screen flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
      <Box sx={{ flexGrow: 1, overflow: 'auto', width: '100%' }}>
          {email && <Header toggleTheme={toggleTheme} isDarkMode={theme.palette.mode === 'dark'} router={router} />}

          {children}

          {email && <QuickActions key={pathname} pathname={pathname} router={router} /> }
          {
            email && <ModalDefault 
            open={false} 
            onClose={() => {}} 
            onConfirm={() => Promise.resolve()} 
            ride={null} 
            isLoading={false} 
            error={null} />
          }
          

          </Box>

        </motion.main>
      </ModalProvider>
      </UserProvider>
      </AppProvider>
      </ThemeProvider>
      </AnimatePresence>
    </LocationProvider>
  )
}