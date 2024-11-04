'use client'

import { Button } from '@mui/material'
import { motion } from 'framer-motion'
import { useLocationContext } from '../context/LocationContext'
import { ModalContentType } from '@/types/Interfaces'
import { DirectionsCar as CarIcon, AccessTime as ClockIcon, WhereToVote as MapPin } from '@mui/icons-material';


const actions : {
  icon: React.ReactNode;
  label: string;
  modal?: string;
}[] = [
  { icon: <ClockIcon className="h-6 w-6" />, label: 'Viagens' },
  { icon: <MapPin className="h-6 w-6" />, label: 'Lugares Salvos' },
  { icon: <CarIcon className="h-6 w-6" />, label: 'Editar Veículos' },
]

export  function QuickActions({hasVehicle}: {hasVehicle: boolean}) {

  const {setModal}  = useLocationContext()
  
  if (!hasVehicle) {
   actions[2] = { icon: <CarIcon className="h-6 w-6" />, label: 'Adicionar Veículo', modal: ModalContentType.addVehicle }
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
            onClick={() => setModal({ isOpen: true, title: action.label, contentType: action.modal as ModalContentType })}
          >
            {action.icon}
            <span className="text-xs">{action.label}</span>
          </Button>
        </motion.div>
      ))}
    </div>
  )
}