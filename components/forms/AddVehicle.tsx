'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Camera,  X } from 'lucide-react'
import { Button, Card, CardContent, CardHeader, Input } from '@mui/material'

export default function AddVehicleForm() {
  const [photos, setPhotos] = useState<string[]>([])
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

  const photoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    }
  }

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
                <h1 className="text-lg font-semibold">Add Your Vehicle</h1>
                <Button
                  variant="outlined"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {/* <CardDescription> */}
              <p className="text-sm text-muted-foreground">
                Add your vehicle details to start sharing rides
                </p>
              {/* </CardDescription> */}
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Vehicle Photos</label>
                  <motion.div
                    className="grid grid-cols-3 gap-2"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    {photos.map((photo, index) => (
                      <motion.div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden"
                        variants={photoVariants}
                      >
                        <img
                          src={photo}
                          alt={`Vehicle photo ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          className="absolute top-1 right-1 h-6 w-6"
                          onClick={() => {
                            const newPhotos = [...photos]
                            newPhotos.splice(index, 1)
                            setPhotos(newPhotos)
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </motion.div>
                    ))}
                    {photos.length < 3 && (
                      <motion.button
                        variants={photoVariants}
                        className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center"
                        onClick={() => {
                          // In a real app, this would open a file picker
                          setPhotos([...photos, '/placeholder.svg'])
                        }}
                      >
                        <Camera className="h-6 w-6 text-muted-foreground" />
                      </motion.button>
                    )}
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <Input placeholder="Vehicle Make" />
                </div>

                <div className="space-y-2">
                  <Input placeholder="Vehicle Model" />
                </div>

                <div className="space-y-2">
                  <Input placeholder="License Plate" />
                </div>

                <div className="space-y-2">
                  <Input placeholder="Year" type="number" />
                </div>

                <Button className="w-full" type="submit">
                  Add Vehicle
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}