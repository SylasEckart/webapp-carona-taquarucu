import React from 'react';
import { Button } from '@mui/material';

interface ToggleAuthModeButtonProps {
  isLogin: boolean;
  toggleLoginMode: () => void;
}

export function ToggleAuthModeButton({ isLogin, toggleLoginMode }: ToggleAuthModeButtonProps) {
  return (
    <Button
      fullWidth
      onClick={toggleLoginMode}
      sx={{ mt: 1, textTransform: 'none', fontWeight: 'normal' }}
    >
      {isLogin ? "Não tem uma conta? Se cadastre" : "Já tem uma conta? Faça login"}
    </Button>
  );
}