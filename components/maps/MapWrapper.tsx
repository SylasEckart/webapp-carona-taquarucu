'use client'

import React from 'react';
import { Paper } from '@mui/material';
import { alpha } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { User } from '@/types/Interfaces';

const UserMap = dynamic(() => import('./UserMap'), { ssr: false });
const LoginMap = dynamic(() => import('./LoginMap'), { ssr: false });

interface UserMapProps {
  user: User;
  location: [number, number];
}

interface LoginMapProps {
  markerPosition?: [number, number];
  center: [number, number];
  zoom: number;
}

export const UserMapComponent = React.memo(({ user, location }: UserMapProps) =>{
  return (
    <Paper
      elevation={0}
      sx={{
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <UserMap key={location.toString()} user={user} location={location} />
    </Paper>
  );
});

export const LoginMapComponent = React.memo(({markerPosition, center, zoom }: LoginMapProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <LoginMap zoom={zoom} center={center} key="dont-repeat" markerPosition={markerPosition} height="200px"
          width="100%"/>
     </Paper>
  );
});