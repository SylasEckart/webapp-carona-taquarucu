'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, Tab, Box } from '@mui/material'


interface SocialTabsProps {
  ListUsersComponent: React.FC;
  ListFriendsComponent: React.FC;
  ListPendingsComponent: React.FC;
  retrieveTabValue: (newValue: number) => void;
}

export default function SocialTabs({ ListUsersComponent,ListFriendsComponent,ListPendingsComponent,retrieveTabValue }: SocialTabsProps) {
  
  const [tabValue, setTabValue] = useState<number>(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    retrieveTabValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          mb: 2,
          '& .MuiTabs-indicator': {
            height: 3,
            borderRadius: 1.5,
          },
        }}
      >
        <Tab label="Todos" />
        <Tab label="Amigos" />
        <Tab label="Pendentes" />
      </Tabs>
        
      <AnimatePresence mode="wait">
      {tabValue === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Box sx={{ mt: 2 }}>
              <ListUsersComponent />
            </Box>
          </motion.div>
        )}
        {
        tabValue === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Box sx={{ mt: 2 }}>
              <ListFriendsComponent />
            </Box>
          </motion.div>
        )}
             {
        tabValue === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Box sx={{ mt: 2 }}>
              <ListPendingsComponent />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}