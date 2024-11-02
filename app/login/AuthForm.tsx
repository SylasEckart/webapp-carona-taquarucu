import React from 'react';
import { Box, TextField, Alert } from '@mui/material';
import { LocationButton } from './LocationButton';
import { SubmitButton } from './SubmitButton';
import { ToggleAuthModeButton } from './ToggleAuthModeButton';

interface AuthFormProps {
  isLogin: boolean;
  formData: {
    name?: string;
    email: string;
    password: string;
    phone?: string;
  };
  error: string;
  locationVerified: boolean;
  loading: boolean
  handleInputChange: (field: "name"  | "email" | "password" | "phone", value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  verifyLocation: () => void;
  toggleLoginMode: () => void;
}

export function AuthForm({
  isLogin,
  formData,
  error,
  locationVerified,
  loading,
  handleInputChange,
  handleSubmit,
  verifyLocation,
  toggleLoginMode,
}: AuthFormProps) {
  return (
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
          sx={{ mb: 2 }}
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
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        sx={{ mb: 2 }}
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
        sx={{ mb: 2 }}
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
          sx={{ mb: 2 }}
        />
      )}
      {
        !locationVerified && <LocationButton
        locationVerified={locationVerified}
        loading={loading}
        verifyLocation={verifyLocation}
      />
      }
      
      {error && <Alert severity="error" sx={{ mt: 2, mb: 2, borderRadius: 2 }}>{error}</Alert>}
      {locationVerified && (
        <SubmitButton isLogin={isLogin} loading={loading} />
      )}
      <ToggleAuthModeButton isLogin={isLogin} toggleLoginMode={toggleLoginMode} />
    </Box>
  );
}