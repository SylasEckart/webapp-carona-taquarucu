'use client'

import { Input } from '@mui/material'
import { motion } from 'framer-motion'
// import { Input } from '@/components/ui/input'
import {  PersonPinCircleRounded as MapPin , SearchRounded as Search } from '@mui/icons-material';


interface LocationInputsProps {

  pickup: { lat: number; lng: number } | undefined

  setPickup: (value: { lat: number; lng: number } | undefined) => void

  destination: string

  setDestination: (value: string) => void

}


export default function LocationInputs({
  pickup,
  setPickup,
  destination,
  setDestination,
}: LocationInputsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="relative">
        <MapPin className="absolute left-3 top-2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-9 w-full"
          placeholder="Lugar de Partida"
          value={pickup}
          onChange={() => setPickup({ lat: 0, lng: 0 })}
        />
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-9 w-full"
          placeholder="Qual o Destino ?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
    </motion.div>
  )
}