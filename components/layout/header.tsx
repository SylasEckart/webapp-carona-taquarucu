/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Header.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography,  Menu, MenuItem, useScrollTrigger } from '@mui/material';
import {  Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon,  Notifications as NotificationsIcon } from '@mui/icons-material';
import CustomAvatar from './CustomAvatar';
import { logout } from '@/services/supabase/client/Auth';
import AppLoader from '../ui/AppLoader';
import { useUserContext } from '@/app/context/UserContext';


interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
  router : any;
}

interface Props {
  window?: () => Window;
  children?: React.ReactElement<{ elevation?: number }>;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return children
    ? React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
      })
    : null;
}


export default function Header({ toggleTheme, isDarkMode, router, }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); 

  const { user, isLoading} = useUserContext();

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
  if(isLoading) return <AppLoader message="Carregando" />
  if(!user) return null;

  // const {isOpen,title,onClose,contentType} = modal;
  return (
    <ElevationScroll>
    <AppBar position="sticky" color="primary" elevation={0}>
      {/* <Modal isOpen={isOpen} onClose={onClose} title={title} content={contentType}  /> */}
      <Toolbar>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          Carona Taquaruçu
        </Typography>

        <IconButton color="inherit" onClick={() => console.log('Notificações')}>
          <NotificationsIcon />
        </IconButton>

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
    </ElevationScroll>
  );
}
