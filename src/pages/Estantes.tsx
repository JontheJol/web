import { Box } from '@mui/material';
import React from 'react';
import NavbarAdmin from '../components/navbarAdmin';

const Estantes: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <NavbarAdmin />

      <Box sx={{ flex: 1, padding: 2 }}>
        <h1>Gestión de Estantes</h1>
        <p>Administra los estantes del sistema desde esta pantalla.</p>
      </Box>
    </Box>
  );
};

export default Estantes;