import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { DirectionsCar as CarIcon, AccessTime as ClockIcon, Person,  } from '@mui/icons-material';

interface RideOption {
  id: string;
  type: string;
  time: string;
  remainingSeats: number;
}

interface RideOptionsProps {
  options: RideOption[];
  onSelectRide: (ride: RideOption) => void;
}

export function RideOptions({ options, onSelectRide }: RideOptionsProps) {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Próximas Caronas</Typography>
      {options.map((option) => (
        <Card key={option.id} sx={{ mb: 2, borderRadius: 2 }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CarIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Box>
                <Typography variant="subtitle1">{option.type}</Typography>
                <Typography variant="body2" color="text.secondary">
                  <ClockIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
                  {option.time}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
                {
                    option.remainingSeats > 0 && (
                        Array.from({ length: option.remainingSeats }).map((_, index) => (
                            <Person key={index} sx={{ fontSize: 16, color: 'primary.main' }} />
                        ))
                    )
                }
              <Button variant="outlined" size="small" onClick={() => onSelectRide(option)}>
                Select
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}