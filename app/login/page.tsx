'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ThemeProvider, CssBaseline, Container, Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import { Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon } from '@mui/icons-material';
import dynamic from 'next/dynamic';
import { login, signUp } from '@/services/supabase/client/Auth';
import { useLocationContext } from '../context/LocationContext';
import useAuthForm from '@/hooks/useAuthForm';
import useDarkMode from '@/hooks/useDarkMode';
import useLocationVerification from '@/hooks/useLocationVerification';
import { AuthForm } from './AuthForm';

const LoginMap = dynamic(() => import('@/components/maps/LoginMap'), { ssr: false });

export default function LoginPage() {
  const { setLocation, setUser } = useLocationContext();
  const router = useRouter();

  const { theme, toggleTheme } = useDarkMode();
  const { isLogin, formData, error, handleInputChange, validateFields, toggleLoginMode, setError,setMessage,message } = useAuthForm({ isLogin: true });
  const { locationVerified, verifyLocation, locationData } = useLocationVerification(setLocation);

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
      else setMessage('Verifique seu email para ativar sua conta.');
    }

    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs" sx={{ p: 0 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            position: 'relative',
            backgroundColor: theme.palette.background.default,
          }}
        >
          <IconButton
            onClick={toggleTheme}
            color="inherit"
            sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1 }}
          >
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          <Card sx={{ width: '100%', maxWidth: '100%', borderRadius: 0, boxShadow: 'none', height: '100vh', overflowY: 'auto' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography component="h1" variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                {isLogin ? 'Login' : 'Sign Up'}
              </Typography>
              <Typography variant="body1" align="center" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
                {isLogin ? 'Bem vindo de volta!' : 'Crie uma conta para começar'}
              </Typography>

              <AuthForm
                isLogin={isLogin}
                formData={formData}
                error={error}
                message={message}
                locationVerified={locationVerified ? locationVerified : false}
                loading={loading}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                verifyLocation={verifyLocation}
                toggleLoginMode={toggleLoginMode}
              />

              <Box sx={{ mt: 3, mb: 3, borderRadius: 2, overflow: 'hidden' }}>
                <LoginMap
                  center={locationData.lat ? [locationData.lat, locationData.lng] : [-10.313573823214446, -48.15836083561156]}
                  markerPosition={locationData.lat ? [locationData.lat, locationData.lng] : undefined}
                  height="200px"
                  width="100%"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}