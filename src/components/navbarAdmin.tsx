// src/components/FigmaSidebar.jsx
import '@fontsource/league-spartan/500.css';
import '@fontsource/league-spartan/600.css';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Drawer, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import BookIcon from '../assets/bookIcon';
import EstanteIcon from '../assets/estantesIcon';
import HomeIcon from '../assets/homeIcon';
import LogoutIcon from '../assets/logoutIcon';
import SettingsIcon from '../assets/settingsIcon';
import UserIcon from '../assets/userIcon';

const menuItems = [
  { label: 'Inicio', icon: <HomeIcon /> },
  { label: 'Libros', icon: <BookIcon /> },
  { label: 'Estantes', icon: <EstanteIcon /> },
  { label: 'Bibliotecarios', icon: <UserIcon /> },
  { label: 'Cambiar Contraseña', icon: <SettingsIcon /> },
];

const NavbarAdmin = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const NavbarContent = () => (
    <Box
      sx={{
        width: { xs: '250px', sm: '300px' },
        height: '100vh',
        bgcolor: '#453726',
        color: '#FFF9EC',
        position: 'relative',
        fontFamily: 'League Spartan, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Top greeting */}
      <Typography
        sx={{
          fontSize: { xs: '24px', sm: '30px' },
          fontWeight: 500,
          lineHeight: '20px',
          letterSpacing: '0.1px',
          position: 'absolute',
          top: { xs: 50, sm: 70 },
          left: { xs: 25, sm: 35 },
          width: '220px',
        }}
      >
        Hola, administrador
      </Typography>

      {/* Top divider */}
      <Box
        sx={{
          width: { xs: '225px', sm: '275px' },
          borderBottom: '4px solid #3A332A',
          position: 'absolute',
          top: { xs: 138, sm: 158 },
          left: { xs: 13, sm: 18 },
        }}
      />

      {/* Menu items */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 176, sm: 196 },
          left: { xs: 13, sm: 18 },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '32px', sm: '42px' },
        }}
      >
        {menuItems.map(({ label, icon }, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              height: '48px',
              pl: '12px',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'rgba(255, 249, 236, 0.1)',
                borderRadius: '8px',
              },
            }}
          >
            <Box sx={{ color: '#FFF9EC' }}>{icon}</Box>
            <Typography
              sx={{
                fontSize: { xs: '24px', sm: '28px' },
                fontWeight: 600,
                lineHeight: '20px',
                letterSpacing: '0.1px',
              }}
            >
              {label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Bottom divider */}
      <Box
        sx={{
          width: { xs: '225px', sm: '275px' },
          borderBottom: '4px solid #3A332A',
          position: 'absolute',
          bottom: { xs: 100, sm: 120 },
          left: { xs: 13, sm: 18 },
        }}
      />

      {/* Cerrar sesión */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 40, sm: 60 },
          left: { xs: 13, sm: 18 },
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          pl: '12px',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: 'rgba(255, 249, 236, 0.1)',
            borderRadius: '8px',
          },
        }}
      >
        <LogoutIcon />
        <Typography
          sx={{
            fontSize: { xs: '24px', sm: '28px' },
            fontWeight: 700,
            lineHeight: '20px',
          }}
        >
          Cerrar sesión
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ 
            m: 2, 
            display: { sm: 'none' },
            position: 'fixed',
            zIndex: 1100,
            bgcolor: '#453726',
            '&:hover': {
              bgcolor: '#3A332A',
            }
          }}
        >
          <MenuIcon sx={{ color: '#FFF9EC' }} />
        </IconButton>
      )}

      {isMobile ? (
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              backgroundColor: 'transparent',
              border: 'none',
            },
          }}
        >
          <NavbarContent />
        </Drawer>
      ) : (
        <NavbarContent />
      )}
    </>
  );
};

export default NavbarAdmin;
