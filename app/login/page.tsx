'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ThemeProvider, CssBaseline, Container, Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import { Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon } from '@mui/icons-material';
import { useLocationContext } from '../context/LocationContext';
import useAuthForm from '@/hooks/useAuthForm';
import useDarkMode from '@/hooks/useDarkMode';
import useLocationVerification from '@/hooks/useLocationAction';
import { AuthForm } from './AuthForm';
import {motion} from 'framer-motion';
import { LoginMapComponent } from '@/components/maps/MapWrapper';
import { taquarucuSquarelocation } from '@/types/constants';
import { login, signUp } from '@/services/supabase/client/Auth';


export default function LoginPage() {
  const router = useRouter();
  const { setLocation,location} = useLocationContext();
  const myLocation = location?.location;

  // if(!contextLoading && !myLocation) return null;

  const { theme, toggleTheme } = useDarkMode();
  const { isLogin, formData, error, handleInputChange, validateFields, toggleLoginMode, setError,setMessage,message } = useAuthForm({ isLogin: true });
  const { locationVerified, verifyLocation } = useLocationVerification(setLocation);

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
      setError('Por favor, verifique sua localização.');
      setLoading(false);
      return;
    }

    if (isLogin) {
      const { data: { user }, errorMessage } = await login(formData.email, formData.password);
      if (errorMessage) setError(errorMessage);
      else if(user) {
        setMessage('Logado com sucesso, redirecionando...');
        router.push('/dashboard');
        router.refresh();
      }
    } else {
      const { errorMessage } = await signUp(formData.email, formData.password, formData.name, formData.phone);
      if (errorMessage) setError(errorMessage);
      else setMessage('Verifique seu email para ativar sua conta.');
    }

    setLoading(false);
  };
  
  const center: [number, number] = myLocation?.lat ? [myLocation?.lat, myLocation?.lng] : taquarucuSquarelocation; 
  const markerPosition: [number, number] | undefined = myLocation?.lat ? [myLocation?.lat, myLocation?.lng] : undefined;
  const zoom = myLocation?.lat ? 15 : 13;

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
                {isLogin ? 'Login' : 'Cadastro'}
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
              <Box  sx={{ mt: 3, mb: 3, borderRadius: 2, overflow: 'hidden' }}>                

              <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
                <LoginMapComponent zoom={zoom} center={center} markerPosition={markerPosition} />
                </motion.div>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}