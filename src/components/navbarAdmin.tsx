// src/components/FigmaSidebar.jsx
import '@fontsource/league-spartan/500.css';
import '@fontsource/league-spartan/600.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
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
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const NavbarContent = () => (
    <Box
      sx={{
        width: { 
          xs: '250px', 
          sm: isOpen ? '300px' : '80px' 
        },
        height: '100vh',
        bgcolor: '#453726',
        color: '#FFF9EC',
        position: 'relative',
        fontFamily: 'League Spartan, sans-serif',
        overflow: 'hidden',
        transition: 'width 0.3s ease',
      }}
    >
      {/* Toggle button */}
      <IconButton
        onClick={handleDrawerToggle}
        sx={{
          position: 'absolute',
          right: 1,
          top: 10,
          color: '#FFF9EC',
          '&:hover': {
            bgcolor: 'rgba(255, 249, 236, 0.1)',
          }
        }}
      >
        <ChevronLeftIcon sx={{ 
          transform: !isOpen ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.3s ease'
        }} />
      </IconButton>

      {/* Top greeting */}
      <Typography
        sx={{
          fontSize: { xs: '24px', sm: '30px' },
          fontWeight: 500,
          lineHeight: '20px',
          letterSpacing: '0.1px',
          position: 'absolute',
          top: { xs: 61, sm: 71 }, // Adjusted to match Figma design
          left: { xs: 25, sm: 35 },
          maxWidth: '220px',
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.2s ease',
          display: { sm: isOpen ? 'block' : 'none' }
        }}
      >
        Hola, administrador
      </Typography>

      {/* Top divider */}
      <Box
        sx={{
          width: { 
            xs: '225px', 
            sm: isOpen ? '275px' : '60px' 
          },
          borderBottom: '4px solid #3A332A',
          position: 'absolute',
          top: { xs: 113, sm: 133 }, // Slightly lower
          left: { xs: 13, sm: 10 },
          transition: 'width 0.3s ease',
        }}
      />

      {/* Menu items */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 136, sm: 156 },
          left: { xs: 13, sm: 10 },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '28px', sm: '36px' }, // Increased spacing between items
          width: 'calc(100% - 20px)',
          paddingBottom: '120px' // Increased bottom padding
        }}
      >
        {menuItems.map(({ label, icon }, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
              minHeight: '48px', // Increased back
              height: 'auto',
              pl: '12px',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'rgba(255, 249, 236, 0.1)',
                borderRadius: '8px',
              },
              pr: 2,
              width: isOpen ? 'calc(100% - 16px)' : '48px',
              justifyContent: isOpen ? 'flex-start' : 'center',
              transition: 'all 0.3s ease',
              mr: 1,
              py: 1, // Increased vertical padding
            }}
          >
            <Box sx={{ 
              color: '#FFF9EC',
              minWidth: '24px',
              display: 'flex',
              justifyContent: 'center',
              flexShrink: 0,
              mt: '2px',
            }}>{icon}</Box>
            <Typography
              sx={{
                fontSize: { xs: '22px', sm: '26px' },
                fontWeight: 600,
                lineHeight: '26px', // Reduced
                letterSpacing: '0.1px',
                opacity: isOpen ? 1 : 0,
                transition: 'opacity 0.2s ease',
                display: { sm: isOpen ? 'block' : 'none' },
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                maxWidth: '180px',
              }}
            >
              {label.includes('Contraseña') ? 'Cambiar\nContraseña' : label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Bottom divider */}
      <Box
        sx={{
          width: { 
            xs: '225px', 
            sm: isOpen ? '275px' : '60px' 
          },
          borderBottom: '4px solid #3A332A',
          position: 'absolute',
          bottom: { xs: 80, sm: 100 }, // Moved up
          left: { xs: 13, sm: 10 },
          transition: 'width 0.3s ease',
        }}
      />

      {/* Cerrar sesión */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 20, sm: 40 }, // Moved up
          left: { xs: 13, sm: 10 },
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          pl: '12px',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: 'rgba(255, 249, 236, 0.1)',
            borderRadius: '8px',
          },
          pr: 2,
          width: isOpen ? 'calc(100% - 24px)' : '48px', // Adjust width to prevent overflow
          justifyContent: isOpen ? 'flex-start' : 'center',
          transition: 'all 0.3s ease',
          mr: 1,
        }}
      >
        <Box sx={{ 
          color: '#FFF9EC',
          minWidth: '24px',
          display: 'flex',
          justifyContent: 'center',
          flexShrink: 0, // Prevent icon from shrinking
        }}>
          <LogoutIcon />
        </Box>
        <Typography
          sx={{
            fontSize: { xs: '22px', sm: '26px' }, // Slightly reduced font size
            fontWeight: 700,
            lineHeight: '24px', // Increased line height
            opacity: isOpen ? 1 : 0,
            transition: 'opacity 0.2s ease',
            display: { sm: isOpen ? 'block' : 'none' },
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis', // Add ellipsis for long text
            maxWidth: 'calc(100% - 32px)', // Ensure text doesn't overflow
            flexShrink: 1, // Allow text to shrink if needed
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
            keepMounted: true,
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
