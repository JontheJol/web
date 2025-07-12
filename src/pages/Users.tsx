import React from 'react';
import { Typography, Box } from '@mui/material';
import UsersTable from '../components/UsersTable';

const Users: React.FC = () => {
  return (
    <Box>
      <Box sx={{ padding: { xs: 1, sm: 2 } }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Usuarios
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Administra los usuarios del sistema desde esta pantalla.
        </Typography>
      </Box>
      <UsersTable />
    </Box>
  );
};

export default Users;
