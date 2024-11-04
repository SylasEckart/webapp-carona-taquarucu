'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface ModalProps {
  isOpen: boolean
  onClose?: () => void
  title: string
  children?: React.ReactNode
}

export default function Modal({ isOpen, onClose, title,children }: ModalProps) {
  console.log('modal',isOpen,onClose,title,children)

  const [modalOpen, setModal] = useState<boolean>(isOpen)

  if(!onClose) onClose = () => setModal(false)

  return (
    <AnimatePresence>
      {isOpen && modalOpen && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          aria-labelledby="modal-title"
          PaperComponent={AnimatePresence}
          PaperProps={{
            initial: { opacity: 0, y: -50 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -50 },
            transition: { type: 'spring', stiffness: 300, damping: 30 },
          }}
        >
          <DialogTitle id="modal-title" sx={{ m: 0, p: 2 }}>
            {title}
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {children}
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}