// File: pages/unsupported-device.tsx

import React from 'react';
import { Container, Typography, Box } from '@mui/material';

export default function UnsupportedDevice() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          padding: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Dispositivo não suportado
        </Typography>
        <Typography variant="body1">
          Nosso webapp só é acessível via dispositivos móveis. Por favor, tente novamente usando um dispositivo móvel.
        </Typography>
      </Box>
    </Container>
  );
}
