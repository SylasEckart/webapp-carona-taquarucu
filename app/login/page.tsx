'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import IconButton from '@mui/material/IconButton'
import { isLocationWithinRange} from '@/services/supabase/client/MapsService'
import dynamic from 'next/dynamic'
import { login, signUp } from '@/services/supabase/client/Auth'
import { useLocationContext } from '../context/LocationContext'

const LoginMap = dynamic(() => import('@/components/maps/LoginMap'), { ssr: false });


export default function LoginPage() {
  const {setLocation, setUser} = useLocationContext()
  const [isLogin, setIsLogin] = React.useState(true)
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [locationVerified, setLocationVerified] = React.useState(false)
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [darkMode, setDarkMode] = React.useState(false)
  const [mapCenter, setMapCenter] = React.useState<[number, number]>([-10.313573823214446, -48.15836083561156])
  const [mapMarkerPosition, setMapMarkerPosition] = React.useState<[number, number] | null>(null)
  const [mapMarkerPopupText, setMapMarkerPopupText] = React.useState('Área de cobertura do App')

  const router = useRouter()

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: darkMode ? '#90caf9' : '#1976d2',
          },
          secondary: {
            main: darkMode ? '#f48fb1' : '#dc004e',
          },
          background: {
            default: darkMode ? '#303030' : '#f5f5f5',
            paper: darkMode ? '#424242' : '#ffffff',
          },
          text: {
            primary: darkMode ? '#ffffff' : '#000000',
            secondary: darkMode ? '#b0bec5' : '#757575',
          },
        },
        components: {
          MuiPopover: {
            defaultProps: {
              container: () => document.body,
            },
          },
          MuiPopper: {
            defaultProps: {
              container: () => document.body,
            },
          },
          MuiModal: {
            defaultProps: {
              container: () => document.body,
            },
          },
        },
      }),
    [darkMode]
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    if (!locationVerified) {
        setError('Por favor, verifique sua localização.')
        setLoading(false)
        return
      }

    if (isLogin) {
      const { data:{user},error } = await login(email, password)

      if (error) {
        setError(error)
      } else {
        setUser(user)
        router.push('/dashboard')
      }
    } else {
        const { error:signUpError } = await signUp(email, password, name, phone )

      if (signUpError) {
        setError(signUpError)
      } else {
        setError('Por favor, verifique seu email para confirmar sua conta.')
      }
    }

    setLoading(false)
  }

  const verifyLocation = async () => {
    setLoading(true)
    setError('')

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          if (!position.coords.latitude || !position.coords.longitude) return setError('Não foi possível obter sua localização. Por favor, habilite sua localização e tente novamente.')
          
          const { data, error } = await isLocationWithinRange(position.coords.latitude, position.coords.longitude)

          setMapCenter([position.coords.latitude, position.coords.longitude])
          setMapMarkerPosition([position.coords.latitude, position.coords.longitude])
          setLocation({lat:position.coords.latitude ,lng:position.coords.longitude})
          setMapMarkerPopupText('Você está aqui')

          if (error) {
            setError('Error ao consultar a localização. Por favor, tente novamente.')
          } else if (data) {
            setLocationVerified(true)
            
          } else {
            setLocationVerified(true)
            setError('Você precisa estar na nossa área de cobertura para usar os serviços')
          }
          setLoading(false)
        },
        () => {
          setError('Unable to retrieve your location. Please enable location services.')
          setLoading(false)
        }
      )
    } else {
      setError('Geolocation is not supported by your browser.')
      setLoading(false)
    }
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            position: 'relative',
          }}
        >
          <IconButton
            onClick={toggleTheme}
            color="inherit"
            sx={{ position: 'absolute', top: 16, right: 16 }}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Card sx={{ width: '100%', mt: 3 }}>
            <CardContent>
              <Typography component="h1" variant="h5" align="center" gutterBottom>
                {isLogin ? 'Login' : 'Sign Up'}
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary" gutterBottom>
                {isLogin ? 'Olá Novamente!' : 'Crie uma conta para começar'}
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                {!isLogin && (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nome"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus={isLogin}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isLogin && (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="phone"
                    label="Numero de Telefone"
                    type="tel"
                    id="phone"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                )}
                {
                  //   <InteractiveMap
                  //   initialCenter={mapCenter}
                  //   initialZoom={15}
                  //   markerPopupText="Você está aqui"
                  //   height="250px"
                  //   width="100%"
                  // />
                  <LoginMap
                    center={mapCenter}
                    markerPosition={mapMarkerPosition ? mapMarkerPosition : undefined}
                    markerPopupText={mapMarkerPopupText}
                    height="250px"
                    width="100%"
                  />
                  // <CoverageMap />
                }
                {(
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={verifyLocation}
                    disabled={locationVerified || loading}
                    startIcon={<LocationOnIcon />}
                  >
                    {locationVerified ? 'Localização Verificada' : 'Verificar Localização'}
                  </Button>
                )}
                {error && (
                  <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                    {error}
                  </Alert>
                )}
                <Button
                  type="submit"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : (isLogin ? 'Login' : 'Criar Conta')}
                </Button>
                <Button
                  fullWidth
                  onClick={() => setIsLogin(!isLogin)}
                  sx={{ mt: 1 }}
                >
                  {isLogin ? "Não tem uma conta? Crie uma" : "Já tem uma conta? Login"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  )
}