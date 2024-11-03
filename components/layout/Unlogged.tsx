'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface LoggedOutLayoutProps {
  children: React.ReactNode
}

export default function Unlogged({ children }: LoggedOutLayoutProps) {

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md"> */}
        {/* <h1 className="text-2xl font-bold mb-4 text-center">Bem Vindo a Carona Taquaruçu</h1> */}
        {children}

      {/* </div> */}
    </motion.div>
  )
}