import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Button, Fade } from '@mui/material';
import { RideOptions } from './RideOptions';


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

const RideTabs: React.FC<RideOptionsProps> = ({ options, onSelectRide }: RideOptionsProps) => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <>
            <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                variant="fullWidth" 
                sx={{ 
                    mb: 2,
                    '& .MuiTabs-indicator': {
                        height: 3,
                        borderRadius: 1.5,
                    },
                }}
            >
                <Tab label="Escolher Corrida" />
                <Tab label="Criar Corrida" />
            </Tabs>

            {tabValue === 0 && (
                <Fade in={true} timeout={500}>
                    <Box>
                        <RideOptions options={options} onSelectRide={onSelectRide} />
                    
                        <Button variant="outlined" fullWidth size="large" sx={{ borderRadius: 8 }}>
                            Escolher Corrida
                        </Button>
                    </Box>
                </Fade>
            )}

            {tabValue === 1 && (
                <Fade in={true} timeout={500}>
                    <Box>
                        <Typography sx={{ mb: 2 }} variant="subtitle1" color="text.secondary">Criar Corrida e permitir que amigos embarquem</Typography>
                        <Button variant="outlined" fullWidth size="large" sx={{ borderRadius: 8 }}>
                            Agendar Viagem
                        </Button>
                    </Box>
                </Fade>
            )}
        </>
    );
};

export default RideTabs;