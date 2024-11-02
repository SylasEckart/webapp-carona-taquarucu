import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar } from '@mui/material';
import { Menu as MenuIcon, Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon } from '@mui/icons-material';

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export function Header({ toggleTheme, isDarkMode }: HeaderProps) {
  return (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Carona Taquaruçu
        </Typography>
        <IconButton color="inherit" onClick={toggleTheme}>
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <IconButton color="inherit">
          <Avatar src="/placeholder.svg?height=32&width=32" alt="User" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}