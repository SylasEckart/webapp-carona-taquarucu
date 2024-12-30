"use client"

import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Fade,
  Typography,
  TextField,
  Button,
  SelectChangeEvent,
  Grid,
  Snackbar,
  Alert,
  useTheme,
  CircularProgress
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useUserContext } from '../context/UserContext'
import { DirectionsCar, TwoWheeler, AirportShuttle } from '@mui/icons-material'

interface VehicleData {
  make: string;
  model: string;
  year: string;
  color: string;
  licensePlate: string;
  type: string;
}

export default function AddVehiclePage() {
  const router = useRouter()
  const { user } = useUserContext()
  const theme = useTheme()

  const [vehicleData, setVehicleData] = useState<VehicleData>({
    make: '',
    model: '',
    year: '',
    color: '',
    licensePlate: '',
    type: '',
  })
  const [errors, setErrors] = useState<Partial<VehicleData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' })

  if (!user || !user.email) return null

  const firstName = user.name.split(" ")[0]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>) => {
    const { name, value } = e.target as HTMLInputElement | { name?: string; value: unknown }
    setVehicleData(prev => ({ ...prev, [name as string]: value }))
    setErrors(prev => ({ ...prev, [name as string]: '' }))
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<VehicleData> = {}
    let isValid = true

    Object.entries(vehicleData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key as keyof VehicleData] = 'Este campo é obrigatório'
        isValid = false
      }
    })

    if (vehicleData.year && (isNaN(Number(vehicleData.year)) || vehicleData.year.length !== 4)) {
      newErrors.year = 'Ano inválido'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSnackbar({ open: true, message: 'Veículo adicionado com sucesso!', severity: 'success' })
      setTimeout(() => router.push('/'), 1500)
    } catch (error) {
      console.log(error)
      setSnackbar({ open: true, message: 'Erro ao adicionar veículo. Tente novamente.' , severity: 'error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'car': return <DirectionsCar />
      case 'motorcycle': return <TwoWheeler />
      case 'van': return <AirportShuttle />
      default: return null
    }
  }

  return (
    <Box sx={{ flexGrow: 1, overflow: 'auto', p: 3 }}>
      <Fade in={true} timeout={1000}>
        <Card elevation={3} sx={{ maxWidth: 600, mx: 'auto', borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ mb: 3, color: theme.palette.primary.main }}>
              Olá {firstName}, adicione seu veículo aqui!
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Marca"
                    name="make"
                    value={vehicleData.make}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={!!errors.make}
                    helperText={errors.make}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Modelo"
                    name="model"
                    value={vehicleData.model}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={!!errors.model}
                    helperText={errors.model}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Ano"
                    name="year"
                    value={vehicleData.year}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    type="number"
                    inputProps={{ min: 1900, max: new Date().getFullYear() + 1 }}
                    error={!!errors.year}
                    helperText={errors.year}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Cor"
                    name="color"
                    value={vehicleData.color}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={!!errors.color}
                    helperText={errors.color}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Placa"
                    name="licensePlate"
                    value={vehicleData.licensePlate}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={!!errors.licensePlate}
                    helperText={errors.licensePlate}
                  />
                </Grid>
              </Grid>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                size="large"
                disabled={isSubmitting}
                startIcon={vehicleData.type ? getVehicleIcon(vehicleData.type) : null}
                endIcon={isSubmitting ? <CircularProgress size={24} color="inherit" /> : null}
                sx={{ mt: 2 }}
              >
                {isSubmitting ? 'Adicionando...' : 'Adicionar Veículo'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Fade>
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

