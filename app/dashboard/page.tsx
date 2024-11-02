"use client"

import React, {  useEffect, useState } from 'react'
import { useLocationContext } from '../context/LocationContext';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Paper,
    InputBase,
    Tabs,
    Tab,
    Button,
    Card,
    CardContent,
    Grid,
    Avatar,
    Box,
    Fade,
    Slide,
    useScrollTrigger,
    Fab,
    Zoom,
  } from '@mui/material'
  import { alpha } from '@mui/material/styles'
  import {
    Menu as MenuIcon,
    Search as SearchIcon,
    DirectionsCar as CarIcon,
    AccessTime as ClockIcon,
    Place as PlaceIcon,
  } from '@mui/icons-material'
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic'

const UserMap = dynamic(() => import('@/components/maps/UserMap'), { ssr: false });


const HideOnScroll = (props: { children: React.ReactElement })=>{

  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

export default function Dashboard() {

  const [tabValue, setTabValue] = useState(0)
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')

  const router = useRouter()

  const {user,location} = useLocationContext()

  useEffect(() => {
    if (!user || !user.email) {
      router.replace('/login');
    }
  }, [ router]);


  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }



  return (
      <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
        <HideOnScroll>
          <AppBar position="sticky" color="primary" elevation={0}>
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Carona Taquaruçu
              </Typography>
              <IconButton color="inherit">
                <Avatar src="/placeholder.svg?height=32&width=32" alt="User" />
              </IconButton>
            </Toolbar>
          </AppBar>
        </HideOnScroll>

        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          <Fade in={true} timeout={1000}>
            <Paper
              elevation={0}
              sx={{
                m:2,
                height: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: alpha('#6200EE', 0.1),
                borderRadius: 4,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
           {location && user && <UserMap user={user} location={[location.lat,location.lng]} key={user.email} onRequest={(console.log)}  />}

            </Paper>
          </Fade>

          <Card elevation={0} sx={{ mb: 2 }}>
            <CardContent>
              <Paper
                component="form"
                elevation={0}
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mb: 2, bgcolor: alpha('#6200EE', 0.05), borderRadius: 8 }}
              >
                <IconButton sx={{ p: '10px' }} aria-label="pickup">
                  <PlaceIcon color="primary" />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Lugar de Partida"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                />
              </Paper>
              <Paper
                component="form"
                elevation={0}
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mb: 2, bgcolor: alpha('#6200EE', 0.05), borderRadius: 8 }}
              >
                <IconButton sx={{ p: '10px' }} aria-label="destination">
                  <SearchIcon color="primary" />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Qual o Destino ?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </Paper>

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

              {tabValue === 0 && (
                <Fade in={true} timeout={500}>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, p: 2, bgcolor: alpha('#03DAC6', 0.1), borderRadius: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CarIcon sx={{ mr: 1, color: 'secondary.main' }} />
                        <Typography variant="subtitle1" color="secondary.main">Amigo</Typography>
                      </Box>
                      <Typography variant="subtitle1" color="secondary.main">19:30 <ClockIcon sx={{ mr: 1, color: 'text.secondary' }} /></Typography>
                      
                    </Box>
                    {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ClockIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">5 min away</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">10:30 AM arrival</Typography>
                    </Box> */}
                    <Button variant="contained" fullWidth size="large" sx={{ borderRadius: 8 }}>
                      Escolher Corrida
                    </Button>
                  </Box>
                </Fade>
              )}

              {tabValue === 1 && (
                <Fade in={true} timeout={500}>
                  <Box>
                    <Typography sx={{ mb: 2 }} variant="subtitle1" color="text.secondary">Criar Corrida e permitir que amigos embarquem</Typography>
                    <Button variant="outlined" fullWidth size="large" sx={{ borderRadius: 8 }}>
                    Agendar Viagem
                    </Button>
                  </Box>
                </Fade>
              )}
            </CardContent>
          </Card>

          <Grid container spacing={2}>
            {[
              { icon: <ClockIcon />, label: 'Viagens' },
              { icon: <PlaceIcon />, label: 'Lugares Salvos' },
              { icon: <PlaceIcon />, label: 'Lugares Salvos' },
            ].map((action, index) => (
              <Grid item xs={4} key={index}>
                <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ 
                      flexDirection: 'column', 
                      py: 2, 
                      bgcolor: 'background.paper',
                      '&:hover': {
                        bgcolor: alpha('#6200EE', 0.05),
                      }
                    }}
                  >
                    {React.cloneElement(action.icon, { color: "primary", sx: { fontSize: 32, mb: 1 } })}
                    <Typography variant="button" color="text.primary">{action.label}</Typography>
                  </Button>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Zoom in={true} style={{ transitionDelay: '500ms' }}>
          <Fab 
            color="secondary" 
            aria-label="search" 
            sx={{ 
              position: 'fixed', 
              bottom: 16, 
              right: 16,
              boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
            }}
          >
            <SearchIcon />
          </Fab>
        </Zoom>
      </Box>
  )
}