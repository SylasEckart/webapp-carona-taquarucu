import React from 'react';
import { Grid, Button, Typography, Zoom } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { AccessTime as ClockIcon, Place as PlaceIcon, DirectionsCar as CarIcon } from '@mui/icons-material';

const actions = [
  { icon: <ClockIcon />, label: 'Viagens' },
  { icon: <PlaceIcon />, label: 'Lugares Salvos' },
  { icon: <CarIcon />, label: 'Meus Veículos' },
];

export function QuickActions() {
  return (
    <Grid container spacing={2}>
      {actions.map((action, index) => (
        <Grid item xs={4} key={index}>
          <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
            <Button
              variant="outlined"
              fullWidth
              sx={(theme) => ({ 
                flexDirection: 'column', 
                py: 2, 
                bgcolor: 'background.paper',
                borderRadius: 4,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                }
              })}
            >
              {React.cloneElement(action.icon, { color: "primary", sx: { fontSize: 32, mb: 1 } })}
              <Typography variant="button" color="text.primary">{action.label}</Typography>
            </Button>
          </Zoom>
        </Grid>
      ))}
    </Grid>
  );
}