'use client'

import { Button } from '@mui/material'
import { motion } from 'framer-motion'
import { Clock, MapPin, Car } from 'lucide-react'

const actions = [
  { icon: <Clock className="h-6 w-6" />, label: 'Viagens' },
  { icon: <MapPin className="h-6 w-6" />, label: 'Lugares Salvos' },
  { icon: <Car className="h-6 w-6" />, label: 'Editar Veículos' },
]

export  function QuickActions({hasVehicle}: {hasVehicle: boolean}) {
  console.log(hasVehicle)
  if (!hasVehicle) {
   actions[2] = { icon: <Car className="h-6 w-6" />, label: 'Adicionar Veículo' }
  }
  return (
    <div className="grid grid-cols-3 gap-4">
      {actions.map((action, index) => (
        <motion.div
          key={action.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Button
            variant="outlined"
            className="w-full h-full flex flex-col items-center justify-center py-4 space-y-2"
          >
            {action.icon}
            <span className="text-xs">{action.label}</span>
          </Button>
        </motion.div>
      ))}
    </div>
  )
}