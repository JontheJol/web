import '@fontsource/rowdies/400.css';
import { Box } from '@mui/material';
import React from 'react';
import NavbarAdmin from '../components/navbarAdmin';
const Estantes: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <NavbarAdmin />

      <Box sx={{ flex: 1, padding: 2 }}>
        <h1 style={{color: '#453726', fontSize: 64, fontWeight: '400', fontFamily: 'Rowdies, sans-serif', letterSpacing: 0.10}}>Gestión de Estantes</h1>
        <p style={{color: '#4B453D', fontSize: 24, fontFamily: 'League Spartan', fontWeight: '400', letterSpacing: 0.10}}>Administra los estantes del sistema desde esta pantalla.</p>
      </Box>
    </Box>
  );
};

export default Estantes;