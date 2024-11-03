'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, Tab, Box, Typography, Button, Card, CardContent } from '@mui/material'
import { AccessTime as ClockIcon, DirectionsCar as CarIcon, Person } from '@mui/icons-material'

interface RideOption {
  id: string
  type: string
  time: string
  remainingSeats: number
}

interface RideTabsProps {
  options: RideOption[]
  onSelectRide: (ride: RideOption) => void
}

export default function RideTabs({ options, onSelectRide }: RideTabsProps) {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
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
        <Tab label="Escolher Corrida" />
        <Tab label="Criar Corrida" />
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
              {options.map((option) => (
                <Card key={option.id} sx={{ mb: 2, borderRadius: 2 }}>
                  <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CarIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="subtitle1">{option.type}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          <ClockIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
                          {option.time}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      {option.remainingSeats > 0 &&
                        Array.from({ length: option.remainingSeats }).map((_, index) => (
                          <Person key={index} sx={{ fontSize: 16, color: 'primary.main' }} />
                        ))}
                      <Button variant="outlined" size="small" onClick={() => onSelectRide(option)}>
                        Select
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outlined" fullWidth size="large" sx={{ borderRadius: 8 }}>
                Escolher Corrida
              </Button>
            </Box>
          </motion.div>
        )}

        {tabValue === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ mb: 2 }} variant="subtitle1" color="text.secondary">
                Criar Corrida e permitir que amigos embarquem
              </Typography>
              <Button variant="outlined" fullWidth size="large" sx={{ borderRadius: 8 }}>
                Agendar Viagem
              </Button>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}