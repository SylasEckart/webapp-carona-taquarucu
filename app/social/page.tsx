"use client"

import React, { useState } from 'react'
import { useLocationContext } from '../context/LocationContext'
import {
  Box,
  Card,
  CardContent,
  CssBaseline,
  Fade,
  ThemeProvider,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/header'
import useDarkMode from '@/hooks/useDarkMode'
import AddFriend from '@/components/forms/AddFriend'
import Modal from '@/components/ui/Modal'
import ModalDefault from '@/components/ui/Modal'
import { SocialFriendsList } from './socialList'

// Mock friend data
const initialFriends = [
  { id: 1, name: 'Alice Johnson', avatar: '/avatars/alice.jpg' },
  { id: 2, name: 'Bob Smith', avatar: '/avatars/bob.jpg' },
  { id: 3, name: 'Carol Williams', avatar: '/avatars/carol.jpg' },
]

export default function SocialPage() {
  const { user } = useLocationContext()
  const router = useRouter()
  const { theme, toggleTheme } = useDarkMode()
  const [friends, setFriends] = useState(initialFriends)
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false)

  if (!user || !user.email) return null

  const firstName = user.name.split(" ")[0]

  const handleAddFriend = (newFriend) => {
    setFriends([...friends, { id: friends.length + 1, name: newFriend.name, avatar: '/avatars/default.jpg' }])
    setIsAddFriendModalOpen(false)
  }

  return (
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          <Fade in={true} timeout={1000}>
            <Card elevation={0} sx={{ my: 2, borderRadius: 4 }}>
              <SocialFriendsList  />
            </Card>
          </Fade>
        </Box>
  )
}

