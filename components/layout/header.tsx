/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Header.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Menu, MenuItem } from '@mui/material';
import {  Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon } from '@mui/icons-material';
import { logout } from '@/services/supabase/client/Auth';

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
  router : any;
}

export default function Header({ toggleTheme, isDarkMode, router }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async() => {
    const {errorMessage} = await logout();
    if(errorMessage) console.error('Logout failed:', errorMessage);
    else router.refresh();
  }


  return (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Carona Taquaruçu
        </Typography>

        <IconButton color="inherit" onClick={toggleTheme}>
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        {/* User avatar with dropdown */}
        <IconButton color="inherit" onClick={handleAvatarClick}>
          <Avatar  />
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
