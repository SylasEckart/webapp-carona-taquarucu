"use client"

import { useState } from 'react'
import { 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  ListItemSecondaryAction,
  Avatar,
  Button,
  Typography,
  Paper,
  Box
} from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'

interface User {
  id: string
  name: string
  username: string
  isFriend: boolean
}

const initialUsers: User[] = [
    { id: '1', name: 'Alice Johnson', username: '@alice', isFriend: false },
    { id: '2', name: 'Bob Smith', username: '@bob', isFriend: true },
    { id: '3', name: 'Charlie Brown', username: '@charlie', isFriend: false },
    { id: '4', name: 'Diana Prince', username: '@diana', isFriend: true },
    { id: '5', name: 'Ethan Hunt', username: '@ethan', isFriend: false },
    { id: '6', name: 'Fiona Gallagher', username: '@fiona', isFriend: true },
    { id: '7', name: 'George Martin', username: '@george', isFriend: false },
    { id: '8', name: 'Hannah Baker', username: '@hannah', isFriend: true },
    { id: '9', name: 'Ian Somerhalder', username: '@ian', isFriend: false },
    { id: '10', name: 'Jack Sparrow', username: '@jack', isFriend: true },
    { id: '11', name: 'Karen Page', username: '@karen', isFriend: false },
    { id: '12', name: 'Liam Neeson', username: '@liam', isFriend: true },
    { id: '13', name: 'Mia Wallace', username: '@mia', isFriend: false },
    { id: '14', name: 'Noah Centineo', username: '@noah', isFriend: true },
    { id: '15', name: 'Olivia Wilde', username: '@olivia', isFriend: false },
    { id: '16', name: 'Paul Rudd', username: '@paul', isFriend: true },
    { id: '17', name: 'Quentin Tarantino', username: '@quentin', isFriend: false },
    { id: '18', name: 'Rachel Green', username: '@rachel', isFriend: true },
    { id: '19', name: 'Steve Rogers', username: '@steve', isFriend: false },
    { id: '20', name: 'Tony Stark', username: '@tony', isFriend: true },
]

export function SocialFriendsList() {
  const [users, setUsers] = useState<User[]>(initialUsers)

  const toggleFriendship = (id: string) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, isFriend: !user.isFriend } : user
    ))
  }

  return (
    <Paper elevation={0} sx={{ mx: 'auto'}}>
        <Typography variant="h6" sx={{ px: 2 }}>Amigos</Typography>
      <List sx={{ width: '100%', overflow:'scroll', height:'60vh', bgcolor: 'background.paper' }}>
        {users.map((user) => (
          <ListItem key={user.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={user.name} src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} />
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={user.username}
            />
              <Button
                variant="outlined"
                color={user.isFriend ? "secondary" : "primary"}
                startIcon={user.isFriend ? <PersonRemoveIcon /> : <PersonAddIcon />}
                onClick={() => toggleFriendship(user.id)}
              >
              </Button>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

