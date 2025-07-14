// src/components/FigmaSidebar.jsx
import { Box, Typography } from '@mui/material';
import BookIcon from '../assets/bookIcon';
import EstanteIcon from '../assets/estantesIcon';
import HomeIcon from '../assets/homeComponent';
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
  return (
    <Box
      sx={{
        width: '300px',
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
          fontSize: '30px',
          fontWeight: 500,
          lineHeight: '20px',
          letterSpacing: '0.1px',
          position: 'absolute',
          top: 70,
          left: 35,
          width: '220px',
        }}
      >
        Hola, administrador
      </Typography>

      {/* Top divider */}
      <Box
        sx={{
          width: '275px',
          borderBottom: '4px solid #3A332A',
          position: 'absolute',
          top: 158,
          left: 18,
        }}
      />

      {/* Menu items */}
      <Box
        sx={{
          position: 'absolute',
          top: 196,
          left: 18,
          display: 'flex',
          flexDirection: 'column',
          gap: '42px',
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
            }}
          >
            <Box sx={{ color: '#FFF9EC' }}>{icon}</Box>
            <Typography
              sx={{
                fontSize: '28px',
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
          width: '275px',
          borderBottom: '4px solid #3A332A',
          position: 'absolute',
          top: 638,
          left: 18,
        }}
      />

      {/* Cerrar sesión */}
      <Box
        sx={{
          position: 'absolute',
          top: 654,
          left: 18,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          pl: '12px',
        }}
      >
        <LogoutIcon />
        <Typography
          sx={{
            fontSize: '28px',
            fontWeight: 700,
            lineHeight: '20px',
          }}
        >
          Cerrar sesión
        </Typography>
      </Box>
    </Box>
  );
};

export default NavbarAdmin;
