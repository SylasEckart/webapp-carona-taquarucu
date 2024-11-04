'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Button, Card, CardContent, CardHeader, Input } from '@mui/material'
import {  CloseRounded } from '@mui/icons-material'

export default function AddVehicleForm() {
  // const [photos, setPhotos] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(true)

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  }

  // const photoVariants = {
  //   hidden: { scale: 0.8, opacity: 0 },
  //   visible: {
  //     scale: 1,
  //     opacity: 1,
  //     transition: {
  //       type: "spring",
  //       damping: 20,
  //       stiffness: 300
  //     }
  //   }
  // }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 p-4 overflow-y-auto"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
        >
          <Card className="max-w-md mx-auto mt-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                {/* /* <CardTitle>Add Your Vehicle</CardTitle> */ }
                <h1 className="text-lg font-semibold">Adicione seu Veículo</h1>
                <Button
                  variant="outlined"
                  onClick={() => setIsOpen(false)}
                >
                  <CloseRounded className="h-4 w-4" />
                </Button>
              </div>
              {/* <CardDescription> */}
              <p className="text-sm text-muted-foreground">
                Adicione os detalhes do seu veículo para criar viagens 
                </p>
              {/* </CardDescription> */}
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Vehicle Photos</label>
                 
                </div>

                <div className="space-y-2">
                  <Input placeholder="Fabricante" />
                </div>

                <div className="space-y-2">
                  <Input placeholder="Modelo" />
                </div>

                <div className="space-y-2">
                  <Input placeholder="Placa" />
                </div>

                <Button className="w-full" type="submit">
                  Adicionar Veículo
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}