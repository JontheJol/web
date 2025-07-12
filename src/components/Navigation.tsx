import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Home, People, PersonAdd } from '@mui/icons-material';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar position="static" sx={{ marginBottom: 0 }}>
      <Toolbar sx={{ paddingX: { xs: 1, sm: 2 } }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          React TypeScript App
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            startIcon={<Home />}
            size="small"
            sx={{
              backgroundColor: isActive('/') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
            }}
          >
            Inicio
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/users"
            startIcon={<People />}
            size="small"
            sx={{
              backgroundColor: isActive('/users') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
            }}
          >
            Usuarios
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/add-user"
            startIcon={<PersonAdd />}
            size="small"
            sx={{
              backgroundColor: isActive('/add-user') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
            }}
          >
            Agregar Usuario
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
