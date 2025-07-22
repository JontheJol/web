import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import AddIcon from '../assets/addIcon';

// Simulación de datos (luego esto será un fetch al API)
const estantes = [
  { id: 1, nombre: 'Estante A', libros: 32, espacios: 3 },
  { id: 2, nombre: 'Estante B', libros: 18, espacios: 5 },
  { id: 3, nombre: 'Estante C', libros: 10, espacios: 8 },
];

const EstanteList: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#E2CBB4',
        padding: 3,
        borderRadius: 4,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 3,
      }}
    >
      {estantes.map((estante) => (
        <Box
          key={estante.id}
          sx={{
            backgroundColor: '#F8F4F2',
            borderRadius: 3,
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.15)',
          }}
        >
          {/* Imagen o ícono del estante */}
          <Box
            sx={{
              width: '100%',
              height: '100px',
              backgroundColor: '#ddd',
              borderRadius: 2,
              marginBottom: 2,
            }}
          />

          {/* Texto */}
          <Typography sx={{ fontWeight: 700, fontSize: 16, marginBottom: 1 }}>
            {estante.nombre}
          </Typography>
          <Typography>Libros: {estante.libros}</Typography>
          <Typography>Espacios disponibles: {estante.espacios}</Typography>

          {/* Botones */}
          <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#A86E44',
                '&:hover': { backgroundColor: '#8B5733' },
                textTransform: 'none',
              }}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: '#2F5233',
                '&:hover': { backgroundColor: '#234026' },
                textTransform: 'none',
              }}
            >
              Añadir
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default EstanteList;
