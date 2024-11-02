import React from 'react';
import { Button, CircularProgress } from '@mui/material';

interface SubmitButtonProps {
  isLogin: boolean;
  loading: boolean;
}

export function SubmitButton({ isLogin, loading }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant="outlined"
      fullWidth
      sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2 }}
      disabled={loading}
    >
      {loading ? <CircularProgress size={24} /> : isLogin ? 'Login' : 'Criar Conta'}
    </Button>
  );
}