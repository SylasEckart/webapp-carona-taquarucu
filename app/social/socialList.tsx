"use client";

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar,
  Button,
  Paper,
  InputAdornment,
  TextField,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SearchIcon from '@mui/icons-material/Search';
import { ListUsers } from '../context/AppContext';
import SocialTabs from './SocialTabs';
import { CheckRounded, Clear, HourglassBottom} from '@mui/icons-material';
import useFriendshipAction from '@/hooks/useFriendshipAction';

interface SocialFriendsListProps {
  initialUsers?: ListUsers[];
  initialFriends?: ListUsers[];
  myUserId: string;
}

type FriendshipAction =  "Add" | "Delete" | "Confirm"


// Extracted reusable user item component
const UserListItem = ({ user, onFriendshipToggle }: { 
  user: ListUsers; 
  onFriendshipToggle: (userId: string,type?: FriendshipAction  ) => void;
}) => (
  <ListItem key={user.user_id} alignItems="flex-start">
    <ListItemAvatar>
      <Avatar
        alt={user.name}
        src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
        sx={{ width: 50, height: 50 }}
      />
    </ListItemAvatar>
    <ListItemText primary={user.name} sx={{ my: 'auto' }} />
    <Button
      variant="outlined"
      color={user.isFriend ? "secondary" : user.isPending ? "success" : "primary"}
      startIcon={
        user.isFriend ? <PersonRemoveIcon /> : 
        user.isPending && !user.isSender ? <HourglassBottom/> : 
        user.isPending ?  <CheckRounded/> :  
        <PersonAddIcon />
      }
      onClick={() => 
          user.isFriend ? onFriendshipToggle(user?.friendshipId || "","Delete") : 
          user.isPending && !user.isSender ? ()=> {} :
          user.isPending ? onFriendshipToggle(user?.friendshipId || "","Confirm") : 
          onFriendshipToggle(user.user_id || "") 
        }
      sx={{
        minWidth: 40,
        width: 40,
        height: 40,
        borderRadius: '50%',
        p: 0,
        '& .MuiButton-startIcon': {
          margin: 0,
        },
      }}
    />
    {
      user.isPending && 
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<Clear />}
        onClick={() => onFriendshipToggle(user?.friendshipId || "", "Delete")}
        sx={{
          minWidth: 40,
          width: 40,
          height: 40,
          borderRadius: '50%',
          p: 0,
          margin: '0 0 0 10px',
          '& .MuiButton-startIcon': {
            margin: 0,
          },
        }}
      />
    }
  </ListItem>
);

const UserList = ({ users, onFriendshipToggle }: {
  users: ListUsers[];
  onFriendshipToggle: (userId: string) => void;
}) => (
  <List sx={{ width: '100%', maxHeight: '60vh', overflow: 'auto' }}>
    {users.map((user) => (
      <UserListItem 
        key={user.user_id}
        user={user} 
        onFriendshipToggle={onFriendshipToggle} 
      />
    ))}
  </List>
);


export function SocialFriendsList({ 
  initialUsers = [],
  myUserId 
}: SocialFriendsListProps) {

  const { sendFriendship,toggleFriendship } = useFriendshipAction()

  const [users, setUsers] = useState<ListUsers[]>([...initialUsers]);
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();

  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    setUsers([...initialUsers]);
  }, [initialUsers]);


  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleFriendshipToggle = useCallback((targetUserId: string,type: FriendshipAction = "Add") => {
    if(type === "Add") {
      sendFriendship(myUserId, targetUserId);
    }
    if(type === "Delete"){ 
      toggleFriendship(targetUserId,"Delete")
    }
    if(type === "Confirm"){
      toggleFriendship(targetUserId, 'Confirm');
    } 
    
  }, [myUserId, sendFriendship]);

  const filteredUsers = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return users.filter(user => 
      user?.name?.toLowerCase().includes(searchLower) && !user.isFriend
    );
  }, [users, searchTerm]);

  const filteredFriends = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return users.filter(user => 
      user?.name?.toLowerCase().includes(searchLower) && user.isFriend
    );
  }, [users, searchTerm]);

  const filteredPendings = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return users.filter(user => 
      user?.name?.toLowerCase().includes(searchLower) && !user.isFriend && user.isPending
    );
  }, [users, searchTerm]);

  const UsersList = useCallback(() => (
    <UserList users={filteredUsers} onFriendshipToggle={handleFriendshipToggle} />
  ), [filteredUsers, handleFriendshipToggle]);

  const FriendsList = useCallback(() => (
    <UserList users={filteredFriends} onFriendshipToggle={handleFriendshipToggle} />
  ), [filteredFriends, handleFriendshipToggle]);

  const PendingsList = useCallback(() => (
    <UserList users={filteredPendings} onFriendshipToggle={handleFriendshipToggle} />
  ), [filteredPendings, handleFriendshipToggle]);

  const searchTitle = selectedTab === 0 ? 'usuários' : selectedTab === 1 ? 'amigos' : 'pendentes';

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
        placeholder={`Buscar ${searchTitle}...`}
        value={searchTerm}
        onChange={handleSearch}
        sx={{ p: '13px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <SocialTabs 
        ListUsersComponent={UsersList} 
        ListFriendsComponent={FriendsList} 
        ListPendingsComponent={PendingsList}
        retrieveTabValue={setSelectedTab}

      />
    </Paper>
  );
}