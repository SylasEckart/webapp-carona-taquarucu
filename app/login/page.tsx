// File: src/app/LoginPage.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ThemeProvider, CssBaseline, Container, Box, Card, CardContent, Typography, TextField, Button, Alert, CircularProgress, IconButton } from '@mui/material';
import { LocationOn as LocationOnIcon, Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon } from '@mui/icons-material';
import dynamic from 'next/dynamic';
import { login, signUp } from '@/services/supabase/client/Auth';
import { useLocationContext } from '../context/LocationContext';
import useAuthForm from '@/hooks/useAuthForm';
import useDarkMode from '@/hooks/useDarkMode';
import useLocationVerification from '@/hooks/useLocationVerification';

const LoginMap = dynamic(() => import('@/components/maps/LoginMap'), { ssr: false });

export default function LoginPage() {
  const { setLocation, setUser } = useLocationContext();
  const router = useRouter();

  const { theme, toggleTheme } = useDarkMode();
  const { isLogin, formData, error, handleInputChange, validateFields, toggleLoginMode, setError } = useAuthForm({ isLogin: true });
  const { locationVerified, verifyLocation, error: locationError,locationData } = useLocationVerification(setLocation);

  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    if (!locationVerified) {
      setError('Please verify your location.');
      setLoading(false);
      return;
    }

    if (isLogin) {
      const { data: { user }, errorMessage } = await login(formData.email, formData.password);
      if (errorMessage) setError(errorMessage);
      else {
        setUser(user);
        router.push('/dashboard');
      }
    } else {
      const { errorMessage } = await signUp(formData.email, formData.password, formData.name, formData.phone);
      if (errorMessage) setError(errorMessage);
      else setError('Check your email to confirm your account.');
    }

    setLoading(false);
  };

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
            justifyContent: 'center',
            minHeight: '100vh',
            paddingBottom: 4,  // Adds padding at the bottom
            position: 'relative',
          }}
        >
          {/* Theme Toggle Button */}
          <IconButton
            onClick={toggleTheme}
            color="inherit"
            sx={{ position: 'absolute', top: 16, right: 16 }}
          >
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* Main Card for Form */}
          <Card sx={{ width: '100%', maxWidth: 400, mt: 3 }}>
            <CardContent>
              <Typography component="h1" variant="h5" align="center" gutterBottom>
                {isLogin ? 'Login' : 'Sign Up'}
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary" gutterBottom>
                {isLogin ? 'Bem vindo' : 'Crie uma conta para começar'}
              </Typography>

              {/* Form Fields */}
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
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
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                )}
                {/* Email Field */}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus={isLogin}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
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
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                />

                {!isLogin && (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="phone"
                    label="Celular"
                    type="tel"
                    id="phone"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                )}

                <Box sx={{ mt: 2, mb: 2 }}>
                  <LoginMap
                    center={locationData.lat ? [locationData.lat,locationData.lng] : [-10.313573823214446, -48.15836083561156]}
                    markerPosition={locationData.lat ? [locationData.lat,locationData.lng]  :  undefined}
                    height="250px"
                    width="100%"
                  />
                </Box>

                {/* Location Verification Button */}
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

                {/* Error & Success Messages */}
                {error && <Alert severity="error" sx={{ mt: 2, mb: 2 }}>{error}</Alert>}
                {locationError && <Alert severity="error" sx={{ mt: 2, mb: 2 }}>{locationError}</Alert>}
                {/* Submit Button */}
                {
                  locationVerified &&
                   <Button
                   type="submit"
                   fullWidth
                   variant="text"
                   sx={{ mt: 3, mb: 2 }}
                   disabled={loading}
                 >
                   {loading ? <CircularProgress size={24} /> : isLogin ? 'Login' : 'Criar Conta'}
                 </Button>

                }
               

                {/* Toggle Between Login and Sign Up */}
                <Button
                  fullWidth
                  onClick={toggleLoginMode}
                  sx={{ mt: 1 }}
                >
                  {isLogin ? "Não tem uma conta ? se cadastre" : "Já tem uma conta ? Faça login"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
