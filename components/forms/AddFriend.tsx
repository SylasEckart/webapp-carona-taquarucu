'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Avatar, Button, Card, CardContent, CardHeader, Input } from '@mui/material'
import { CheckRounded, PersonAddAltRounded, SearchRounded } from '@mui/icons-material'

interface FriendSuggestion {
  id: string
  name: string
  avatar: string
  mutualFriends: number
}

export default function AddFriend() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sentRequests, setSentRequests] = useState<Set<string>>(new Set())

  // Mock suggestions - in a real app, this would come from an API
  const suggestions: FriendSuggestion[] = [
    {
      id: '1',
      name: 'Alex Silva',
      avatar: '/placeholder.svg',
      mutualFriends: 3,
    },
    {
      id: '2',
      name: 'Maria Santos',
      avatar: '/placeholder.svg',
      mutualFriends: 5,
    },
    {
      id: '3',
      name: 'João Lima',
      avatar: '/placeholder.svg',
      mutualFriends: 2,
    },
  ]

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    }
  }

  const handleSendRequest = (friendId: string) => {
    setSentRequests(prev => new Set(prev).add(friendId))
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        {/* <CardTitle>Add Friends</CardTitle> */}
        <h1 className="text-lg font-semibold">Add Friends</h1> 
        {/* <CardDescription> */}
        <p className="text-sm text-muted-foreground">Find friends to share rides with</p>
        {/* </CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            {/* <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /> */}
            <SearchRounded className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search for friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <motion.div
            className="space-y-2"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {suggestions.map((friend) => (
              <motion.div
                key={friend.id}
                variants={itemVariants}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-accent"
              >
                <div className="flex items-center space-x-3">
                  <Avatar src={friend.avatar}>
                    {friend.name.slice(0, 2)}
                  </Avatar>
                  <div>
                    <p className="font-medium">{friend.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {friend.mutualFriends} mutual friends
                    </p>
                  </div>
                </div>
                <AnimatePresence mode="wait">
                  {sentRequests.has(friend.id) ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Button variant='outlined'  disabled>
                        {/* <Check className="h-4 w-4 text-green-500" /> */}
                        <CheckRounded className='h-4 w-4 text-green-500'/>
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Button
                      variant="outlined"
                        onClick={() => handleSendRequest(friend.id)}
                      >
                        <PersonAddAltRounded className='h-4 w-4'/>
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}