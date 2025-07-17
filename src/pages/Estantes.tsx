import '@fontsource/league-spartan/400.css';
import '@fontsource/league-spartan/700.css';
import '@fontsource/rowdies/400.css';
import { Box, Typography } from '@mui/material';
import React from 'react';
import AddIcon from '../assets/addIcon';
import NavbarAdmin from '../components/navbarAdmin';

const Estantes: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <NavbarAdmin />

      <Box
        sx={{
          flex: 1,
          padding: { xs: 3, sm: 4 },
          backgroundColor: '#fff9ec',
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden'
        }}
      >
        {/* Add Shelf Button */}
        <Box
          sx={{
            position: 'absolute',
            right: '48px',
            top: '74px',
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              background: '#2F5233',
              boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
              overflow: 'hidden',
              borderRadius: 2,
              justifyContent: 'space-between',
              alignItems: 'center',
              display: 'inline-flex',
              cursor: 'pointer',
              '&:hover': {
                background: '#234026',
              }
            }}
          >
            <Box
              sx={{
                height: 32,
                padding: '6px 16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Typography
                sx={{
                  color: '#FFF9EC',
                  fontSize: 15,
                  fontFamily: 'League Spartan',
                  fontWeight: 500,
                  lineHeight: '20px',
                  letterSpacing: 0.1
                }}
              >
                Añadir estante
              </Typography>
              <AddIcon />
            </Box>
          </Box>
        </Box>

        {/* Page Title */}
        <Typography
          variant="h1"
          sx={{
            fontSize: '64px',
            fontWeight: 400,
            color: '#453726',
            fontFamily: 'Rowdies, sans-serif',
            marginBottom: '35px',
            width: '859px',
            lineHeight: '20px',
            letterSpacing: '0.1px'
          }}
        >
          Gestión de Estantes
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: '24px',
            color: '#4B453D',
            fontWeight: 400,
            fontFamily: 'League Spartan, sans-serif',
            marginBottom: '16px',
            width: '743px',
            lineHeight: '20px',
            letterSpacing: '0.1px'
          }}
        >
          Administra los Estantes de la biblioteca en este espacio.
        </Typography>

        {/* Divider Line */}
        <Box
          sx={{
            width: '1144px',
            height: 0,
            borderTop: '3px solid #3A332A',
            marginBottom: '14px'
          }}
        />

      </Box>
    </Box>
  );
};

export default Estantes;
