"use client"

import React from 'react'
import {
  Box,
  Card,
  Fade,
} from '@mui/material'
import { SocialFriendsList } from './socialList'

// Mock friend data

export default function SocialPage() {

  return (
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          <Fade in={true} timeout={1000}>
            <Card elevation={0} sx={{ my: 2, borderRadius: 4 }}>
              <SocialFriendsList />
            </Card>
          </Fade>
        </Box>
  )
}

