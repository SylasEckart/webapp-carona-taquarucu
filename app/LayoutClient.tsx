"use client"


import { Box, CssBaseline, ThemeProvider } from "@mui/material"
import { AnimatePresence, motion } from "framer-motion"
import useDarkMode from "@/hooks/useDarkMode"
import Header from "@/components/layout/header"
import { useRouter } from "next/navigation"
import ModalDefault from "@/components/ui/Modal"
import { QuickActions } from "@/components/layout/QuickActions"
import InstallPWA from "@/components/pwa/InstallPWA"
import { AppContextProvider } from "./context/AppContextProvider"
import { User } from "@supabase/supabase-js"


interface LayoutClientProps {
  children: React.ReactNode
  user?: User
}

export default function LayoutClient({ children, user }: LayoutClientProps) {

  const { theme, toggleTheme } = useDarkMode()
  const router = useRouter();

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  console.log('pathname', pathname);

  return (

    <AppContextProvider user={user}>
      <InstallPWA/>
      <AnimatePresence>
      <ThemeProvider theme={theme}>
      <CssBaseline />    
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
          {user && <Header toggleTheme={toggleTheme} isDarkMode={theme.palette.mode === 'dark'} router={router} />}

          {children}

          {user && <QuickActions key={pathname} pathname={pathname} router={router} /> }
          {
            user && <ModalDefault 
            open={false} 
            onClose={() => {}} 
            onConfirm={() => Promise.resolve()} 
            ride={null} 
            isLoading={false} 
            error={null} />
          }
          

          </Box>

        </motion.main>
      </ThemeProvider>
      </AnimatePresence>
      </AppContextProvider>
  )
}