"use client"

import React from 'react'
import {
  Box,
  Card,
  Fade,
} from '@mui/material'
import { SocialFriendsList } from './socialList'
import { useAppContext } from '../context/AppContext'

// Mock friend data

export default function SocialPage() {

  const {isLoading,listUsers} = useAppContext();

  if(isLoading) return <div>Loading...</div>

  const newListUsers = listUsers.map((user) => {
    return {
      ...user,
      isFriend: false
    }
  })
  

  return (
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          <Fade in={true} timeout={1000}>
            <Card elevation={0} sx={{ my: 2, borderRadius: 4 }}>
              <SocialFriendsList initialUsers={newListUsers} />
            </Card>
          </Fade>
        </Box>
  )
}

