import { useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: { main: darkMode ? '#90caf9' : '#1976d2' },
          secondary: { main: darkMode ? '#f48fb1' : '#dc004e' },
        },
      }),
    [darkMode]
  );

  const toggleTheme = () => setDarkMode(!darkMode);

  return { theme, toggleTheme };
};

export default useDarkMode;