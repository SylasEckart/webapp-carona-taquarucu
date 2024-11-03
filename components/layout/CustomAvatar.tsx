import * as React from 'react';
import Avatar from '@mui/material/Avatar';

function stringToColor(string : string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export default function CustomAvatar({ stringAvatar  , ...props } : {stringAvatar?: string}) {
  const initials = stringAvatar
    ? `${stringAvatar.split(' ')[0][0]}${stringAvatar.split(' ')[1][0]}`
    : '';
  const bgColor = stringAvatar ? stringToColor(stringAvatar) : '#000';

  return (
    <Avatar
      sx={{ bgcolor: bgColor }}
      {...props}
    >
      {initials}
    </Avatar>
  );
}