import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, People, PersonAdd, Logout, AccountCircle } from '@mui/icons-material';
import { useAppStore } from '../store/appStore';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAppStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isActive = (path: string) => location.pathname === path;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleClose();
  };

  return (
    <AppBar position="static" sx={{ marginBottom: 0 }}>
      <Toolbar sx={{ paddingX: { xs: 1, sm: 2 } }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BookSmart - Panel de Administración
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
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
          
          {/* User Menu */}
          <Box sx={{ ml: 2 }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32, backgroundColor: '#2e5131' }}>
                {currentUser?.name?.charAt(0) || 'U'}
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem disabled>
                <Typography variant="body2" color="text.secondary">
                  {currentUser?.email}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Logout sx={{ mr: 1 }} />
                Cerrar Sesión
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
