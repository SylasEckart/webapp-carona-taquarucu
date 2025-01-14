/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Header.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography,  Menu, MenuItem, useScrollTrigger, Badge } from '@mui/material';
import {  Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon,  } from '@mui/icons-material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement | SVGSVGElement>(null); 

  const { user, isLoading} = useUserContext();
  
  const [menuType, setMenuType] = useState<string | null>(null);

  interface HandleOpenMenuEvent {
    currentTarget: HTMLElement | SVGSVGElement;
  }

  interface HandleOpenMenu {
    (event: HandleOpenMenuEvent, type: string): void;
  }

  const handleOpenMenu: HandleOpenMenu = (event, type) => {
    setAnchorEl(event.currentTarget);
    setMenuType(type);
  };

  const handleCloseMenu = () => {
    // if(menuType === 'notifications') dispatch({type: NotificationActionType.CLEAN_NOTIFICATIONS});
    setAnchorEl(null);
    setMenuType(null);
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

  console.log('user:', user);


  // const {isOpen,title,onClose,contentType} = modal;
  return (
    <ElevationScroll>
    <AppBar position="sticky" color="primary" elevation={0}>
      {/* <Modal isOpen={isOpen} onClose={onClose} title={title} content={contentType}  /> */}
      <Toolbar>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          Carona Taquaruçu
        </Typography>

       
        <Badge badgeContent={user.notifications?.length} color="error">
          <NotificationsIcon color="inherit" onClick={(event) => handleOpenMenu(event, 'notifications')} />
        </Badge>

        <IconButton className='ml-2' color="inherit" onClick={toggleTheme}>
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

       
        <IconButton color="inherit" onClick={(event) => handleOpenMenu(event, 'avatar')}>
          <CustomAvatar stringAvatar={user.name} />
        </IconButton>
        <Menu
          key={menuType}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {menuType === 'notifications' && (
              user.notifications.length > 0 ? user.notifications.map((notification, index) => (
               <>
                <MenuItem key={index} onClick={handleCloseMenu}>{notification}</MenuItem>
                </>
              )) : <MenuItem key={'nenhuma'} onClick={handleCloseMenu}>Nenhuma notificação</MenuItem>
          )}
          {menuType === 'avatar' && (
           <>
            <MenuItem onClick={handleCloseMenu}>Meu Perfil</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
           </>
          )}
        </Menu>
        
      </Toolbar>
    </AppBar>
    </ElevationScroll>
  );
}
