"use client"

import { useState, useMemo } from 'react'
import { useTheme } from '@mui/material/styles'
import { 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar,
  Button,
  Paper,
  InputAdornment,
  TextField
} from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import SearchIcon from '@mui/icons-material/Search'
import { ListUsers } from '../context/AppContext'

export function SocialFriendsList({ initialUsers = [] }: { initialUsers?: ListUsers[] }) {
  const [users, setUsers] = useState<ListUsers[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const theme = useTheme()

  const toggleFriendship = (id: string) => {
    setUsers(users.map(user => 
      user.user_id === id ? { ...user, isFriend: !user.isFriend } : user
    ))
  }

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      // user.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [users, searchTerm])

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        maxWidth: '100%', 
        mx: 'auto', 
        bgcolor: theme.palette.background.paper,
        borderRadius: 2,
        overflow: 'hidden',
        height: '60%'
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscar amigos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ p: '13px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <List sx={{ width: '100%', maxHeight: '60vh', overflow: 'auto' }}>
        {filteredUsers.map((user) => (
          <ListItem
            key={user.user_id}
            alignItems="flex-start"
          >
            <ListItemAvatar>
              <Avatar 
                alt={user.name} 
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
                sx={{ width: 50, height: 50 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              // secondary={`@${user.username}`}
              sx={{ my: 'auto' }}
            />
            <Button
              variant="outlined"
              color={user.isFriend ? "secondary" : "primary"}
              startIcon={user.isFriend ? <PersonRemoveIcon /> : <PersonAddIcon />}
              onClick={() => toggleFriendship(user.user_id)}
              sx={{ 
                minWidth: 40, 
                width: 40, 
                height: 40, 
                borderRadius: '50%', 
                p: 0,
                '& .MuiButton-startIcon': {
                  margin: 0
                }
              }}
            >
            </Button>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

