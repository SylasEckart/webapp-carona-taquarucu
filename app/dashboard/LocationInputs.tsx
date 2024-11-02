import React from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Search as SearchIcon, Place as PlaceIcon } from '@mui/icons-material';

interface LocationInputsProps {
  pickup: string;
  setPickup: (value: string) => void;
  destination: string;
  setDestination: (value: string) => void;
}

export function LocationInputs({ pickup, setPickup, destination, setDestination }: LocationInputsProps) {
  return (
    <>
      <Paper
        component="form"
        elevation={0}
        sx={(theme) => ({
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          borderRadius: 8
        })}
      >
        <IconButton sx={{ p: '10px' }} aria-label="pickup">
          <PlaceIcon color="primary" />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Lugar de Partida"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
        />
      </Paper>
      <Paper
        component="form"
        elevation={0}
        sx={(theme) => ({
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          borderRadius: 8
        })}
      >
        <IconButton sx={{ p: '10px' }} aria-label="destination">
          <SearchIcon color="primary" />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Qual o Destino ?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </Paper>
    </>
  );
}