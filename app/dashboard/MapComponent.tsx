import React from 'react';
import { Paper } from '@mui/material';
import { alpha } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { User } from '@/types/Interfaces';

const UserMap = dynamic(() => import('@/components/maps/UserMap'), { ssr: false });

interface MapComponentProps {
  user: User;
  location: [number, number];
}

export function MapComponent({ user, location }: MapComponentProps) {
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
      <UserMap user={user} location={location} onRequest={console.log} />
    </Paper>
  );
}