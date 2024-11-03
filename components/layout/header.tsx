/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Header.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography,  Menu, MenuItem } from '@mui/material';
import {  Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon } from '@mui/icons-material';
import CustomAvatar from './CustomAvatar';
import { useLocationContext } from '@/app/context/LocationContext';

import { logout } from '@/services/supabase/client/Auth';
import AppLoader from '../ui/AppLoader';


interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
  router : any;
}

export default function Header({ toggleTheme, isDarkMode, router, }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); 

  const {user,contextLoading} = useLocationContext()

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async() => {
    const {errorMessage} = await logout();
    if(errorMessage) console.error('Logout failed:', errorMessage);
    else{
      router.refresh();
    }
  }
  if(contextLoading) return <AppLoader message="Carregando" />
  if(!user) return null;


  return (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Carona Taquaruçu
        </Typography>

        <IconButton color="inherit" onClick={toggleTheme}>
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        <IconButton color="inherit" onClick={handleAvatarClick}>
          <CustomAvatar stringAvatar={user.name} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleClose}>Meu Perfil</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
