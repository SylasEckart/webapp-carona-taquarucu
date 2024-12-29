'use client'

import { Button } from '@mui/material'
import { motion } from 'framer-motion'
import { DirectionsCar as CarIcon,  WhereToVote as MapPin, People as PeopleIcon, AddLocationAlt as LocationPlusIcon } from '@mui/icons-material';

import { useState } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';


export function QuickActions({pathname, router}: {pathname: string, router: AppRouterInstance}) {

  const [pathnameState, setPathname] = useState(pathname);

  const returnActions = (pathname: string, hasVehicle?: boolean) => {
    const actions = [
      { icon: <PeopleIcon className='h-6 w-6'/>, label: 'Adicionar Amigos', link: '/social' },
      { icon: <LocationPlusIcon className='h-6 w-6'/>, label: 'Viagens', link: '/dashboard'  },
      { icon: <CarIcon className="h-6 w-6" />, label: hasVehicle ? 'Editar veículo' : "Adicionar veículo", link: '/vehicle' },
      { icon: <MapPin className="h-6 w-6" />, label: 'Lugares Salvos', link: '/saved-locations' }
    ].filter(action => action.link !== pathname) 
  
    if(actions.length === 3) return actions;
    else return actions.filter(action => action.link !== '/dashboard');
  }


  const actions = returnActions(pathnameState);


  return (
    <div className="grid grid-cols-3 gap-4 pb-5 px-6">
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
            onClick={() => {
              router.push(action.link)
              setTimeout( () => setPathname(action.link), 500)
            }}
          >
            {action.icon}
            <span className="text-xs">{action.label}</span>
          </Button>
        </motion.div>
      ))}
    </div>
  )
}