"use client"

import React, { useState } from 'react'
import { useLocationContext } from '../context/LocationContext'
import {
  Box,
  Card,
  CardContent,
  CssBaseline,
  Fade,
  ThemeProvider,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/header'
import useDarkMode from '@/hooks/useDarkMode'

export default function AddVehiclePage() {
  const { user } = useLocationContext()
  const router = useRouter()
  const { theme, toggleTheme } = useDarkMode()

  const [vehicleData, setVehicleData] = useState({
    make: '',
    model: '',
    year: '',
    color: '',
    licensePlate: '',
    type: '',
  })

  if (!user || !user.email) return null

  const firstName = user.name.split(" ")[0]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target
    setVehicleData(prev => ({ ...prev, [name as string]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Vehicle data submitted:', vehicleData)
    // After submission, you might want to redirect the user or show a success message
    alert('Vehicle added successfully!')
    router.push('/') // Redirect to home page
  }

  return (
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Fade in={true} timeout={1000}>
            <Card elevation={0} sx={{ mb: 2, borderRadius: 4 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Olá {firstName}, adicione seu veículo aqui!
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Marca"
                    name="make"
                    value={vehicleData.make}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                  <TextField
                    label="Modelo"
                    name="model"
                    value={vehicleData.model}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                  <TextField
                    label="Ano"
                    name="year"
                    value={vehicleData.year}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    type="number"
                  />
                  <TextField
                    label="Cor"
                    name="color"
                    value={vehicleData.color}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                  <TextField
                    label="Placa"
                    name="licensePlate"
                    value={vehicleData.licensePlate}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                  <FormControl fullWidth required>
                    <InputLabel id="vehicle-type-label">Tipo de Veículo</InputLabel>
                    <Select
                      labelId="vehicle-type-label"
                      name="type"
                      value={vehicleData.type}
                      onChange={handleInputChange}
                      label="Tipo de Veículo"
                    >
                      <MenuItem value="car">Carro</MenuItem>
                      <MenuItem value="motorcycle">Moto</MenuItem>
                      <MenuItem value="van">Van</MenuItem>
                    </Select>
                  </FormControl>
                  <Button type="submit" variant="contained" color="primary">
                    Adicionar Veículo
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Box>
  )
}

