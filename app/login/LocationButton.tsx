import React from 'react';
import { Button } from '@mui/material';
import { LocationOn as LocationOnIcon } from '@mui/icons-material';

interface LocationButtonProps {
  locationVerified: boolean;
  loading: boolean;
  verifyLocation: () => void;
}

export function LocationButton({ locationVerified, loading, verifyLocation }: LocationButtonProps) {
  return (
    <Button
      fullWidth
      variant='outlined'
      sx={{ mt: 2, mb: 2, py: 1.5, borderRadius: 2 }}
      onClick={verifyLocation}
      disabled={locationVerified || loading}
      startIcon={<LocationOnIcon />}
    >
      {locationVerified ? 'Localização Verificada' : 'Verificar Localização'}
    </Button>
  );
}