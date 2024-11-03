"use client"

import React, {  useEffect, useState } from 'react'
import { useLocationContext } from '../context/LocationContext';
import {
  Box,
  Card,
  CardContent,
  CssBaseline,
  Fade,
  ThemeProvider,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation';
import { UserMapComponent } from '../../components/maps/MapWrapper';
import LocationInputs  from './LocationInputs';
import { QuickActions } from './QuickActions';
import RideTabs from './RideTabs';
import { taquarucuSquarelocation } from '@/types/constants';
import Header from '@/components/layout/header';
import useDarkMode from '@/hooks/useDarkMode';
// import { LocationButton } from '@/components/button/LocationButton';
// import useLocationActions from '@/hooks/useLocationAction';

export default function Dashboard() {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [rideOptions] = useState([
    { id: '1', type: 'Amigo 1', time: '35 min', remainingSeats: 1 },
    { id: '2', type: 'Amigo 2', time: '45 min', remainingSeats: 2 },
    { id: '3', type: 'Amigo 3', time: '50 min', remainingSeats: 3 },
  ])

  const router = useRouter()
  const { user, location,contextLoading, } = useLocationContext()
  // const {verifyLocation,locationVerified} = useLocationActions(setLocation)
  const { theme, toggleTheme } = useDarkMode()

 

  useEffect(() => {
    if(contextLoading) return;

    console.log('location',location, user)
    
  }, [router,user]);

  const handleSelectRide = (ride: { id: string, type: string, time: string, remainingSeats: number }) => {
    console.log('Selected ride:', ride);
  }

  if(!user || !user.email) return null

  const firstName = user.name.split(" ")[0]
  const hasVehicle = user.has_vehicle;

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Header toggleTheme={toggleTheme} isDarkMode={theme.palette.mode === 'dark'} router={router} />
    
      {/* {
          !contextLoading && !locationVerified && !location && (
          <LocationButton locationVerified={!!locationVerified} loading={contextLoading} verifyLocation={verifyLocation} />
          )
        } */}
    <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          <Fade in={true} timeout={1000}>
            <Box sx={{ mb: 2 }}>
              <UserMapComponent user={user} location={location ? [location.lat, location.lng] : taquarucuSquarelocation} />
            </Box>
          </Fade>

          <Card elevation={0} sx={{ mb: 2, borderRadius: 4 }}>
            <CardContent>
              <Typography  gutterBottom className='mb-2'>
                Olá {firstName}, para onde você quer ir hoje?
              </Typography>
              <LocationInputs
                pickup={pickup}
                setPickup={setPickup}
                destination={destination}
                setDestination={setDestination}
              />
              <RideTabs options={rideOptions} onSelectRide={handleSelectRide} />
            </CardContent>
          </Card>

          <QuickActions hasVehicle={hasVehicle} />
        </Box>
      </Box>
      </ThemeProvider>
  )
}