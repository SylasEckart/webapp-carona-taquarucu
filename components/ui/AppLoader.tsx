'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface LoaderProps {
  message?: string
}

export default function AppLoader({ message = 'Loading...' }: LoaderProps = {}) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="inline-block"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        >
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full" />
        </motion.div>
        <motion.p
          className="mt-4 text-lg font-medium text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {message}
        </motion.p>
      </div>
    </div>
  )
}