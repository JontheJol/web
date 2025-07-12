import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from '@mui/material';
import { People, PersonAdd, Dashboard } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { users } = useAppStore();

  const stats = [
    {
      title: 'Total de Usuarios',
      value: users.length,
      icon: <People fontSize="large" />,
      color: '#1976d2',
    },
    {
      title: 'Edad Promedio',
      value: users.length > 0 ? Math.round(users.reduce((sum, user) => sum + user.age, 0) / users.length) : 0,
      icon: <Dashboard fontSize="large" />,
      color: '#388e3c',
    },
  ];

  return (
    <Box sx={{ padding: { xs: 1, sm: 2 } }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Bienvenido a React TypeScript App
      </Typography>
      
      <Typography variant="h6" color="text.secondary" paragraph>
        Esta es una aplicación de ejemplo que utiliza React, TypeScript, Material-UI, 
        Zustand, React Hook Form, Yup, Material React Table y React Router DOM.
      </Typography>

      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        {stats.map((stat, index) => (
          <Grid key={index} size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ color: stat.color }}>
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" component="div">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<People />}
          onClick={() => navigate('/users')}
        >
          Ver Usuarios
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<PersonAdd />}
          onClick={() => navigate('/add-user')}
        >
          Agregar Usuario
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
