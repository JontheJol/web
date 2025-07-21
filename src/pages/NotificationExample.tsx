import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Alert,
} from '@mui/material';
import { useNotification } from '../hooks/useNotification';
import NotificationDialog from '../components/NotificationDialog';

// Simulación de respuestas de API
const mockApiResponses = {
  success: {
    status: "Registro exitoso",
    msg: "Biblioteca registrada exitosamente",
    data: {
      id: 45,
      nombre: "Biblioteca Central",
      ubicación: "Calle 123",
    }
  },
  conflict: {
    status: "Conflicto al registrar biblioteca",
    msg: "BLT_01 - Ya existe una biblioteca con esos datos",
    data: null
  },
  validationError: {
    status: "Error en los datos",
    msg: "BLT_02 - El formato de los datos proporcionados es incorrecto",
    data: {
      nombre: "Este campo es obligatorio",
      ubicación: "La ubicación debe tener al menos 5 caracteres"
    }
  }
};

const NotificationExample: React.FC = () => {
  const [libraryName, setLibraryName] = useState('');
  const [libraryLocation, setLibraryLocation] = useState('');
  const {
    notification,
    isNotificationOpen,
    showSuccessNotification,
    showErrorNotification,
    showWarningNotification,
    showInfoNotification,
    handleApiResponse,
    closeNotification,
  } = useNotification();

  // Simulación de llamadas a la API
  const handleSubmit = async (responseType: 'success' | 'conflict' | 'validationError') => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response = mockApiResponses[responseType];
    handleApiResponse(response, 'Biblioteca registrada');
  };

  // Ejemplos de notificaciones manuales
  const showManualNotifications = () => {
    showSuccessNotification(
      'Operación completada',
      'La acción se realizó exitosamente'
    );
  };

  const showManualError = () => {
    showErrorNotification(
      'Error de validación',
      'Los datos ingresados no son válidos',
      {
        email: 'Formato de correo inválido',
        telefono: 'El número debe tener 10 dígitos'
      }
    );
  };

  const showManualWarning = () => {
    showWarningNotification(
      'Advertencia',
      'Esta acción no se puede deshacer'
    );
  };

  const showManualInfo = () => {
    showInfoNotification(
      'Información',
      'El sistema se actualizará en 5 minutos'
    );
  };

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          background: '#fff9ec',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 3,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            padding: 4,
            borderRadius: '15px',
            maxWidth: 600,
            width: '100%',
            backgroundColor: '#ffffff',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'League Spartan', sans-serif",
              fontWeight: 600,
              fontSize: '28px',
              color: '#453726',
              textAlign: 'center',
              mb: 4,
            }}
          >
            Sistema de Notificaciones
          </Typography>

          <Alert severity="info" sx={{ mb: 3 }}>
            Este ejemplo demuestra cómo usar el sistema de notificaciones reutilizable
            con diferentes tipos de respuestas de API.
          </Alert>

          {/* Form Example */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#453726' }}>
              Ejemplo de formulario:
            </Typography>
            
            <TextField
              label="Nombre de la biblioteca"
              value={libraryName}
              onChange={(e) => setLibraryName(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            
            <TextField
              label="Ubicación"
              value={libraryLocation}
              onChange={(e) => setLibraryLocation(e.target.value)}
              fullWidth
              sx={{ mb: 3 }}
            />

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
              <Button
                variant="contained"
                onClick={() => handleSubmit('success')}
                sx={{ backgroundColor: '#2f5233' }}
              >
                Enviar (Éxito)
              </Button>
              
              <Button
                variant="contained"
                onClick={() => handleSubmit('conflict')}
                sx={{ backgroundColor: '#ff9800' }}
              >
                Enviar (Conflicto)
              </Button>
              
              <Button
                variant="contained"
                onClick={() => handleSubmit('validationError')}
                sx={{ backgroundColor: '#d32f2f' }}
              >
                Enviar (Error)
              </Button>
            </Box>
          </Box>

          {/* Manual Notifications */}
          <Typography variant="h6" sx={{ mb: 2, color: '#453726' }}>
            Notificaciones manuales:
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              onClick={showManualNotifications}
              sx={{ color: '#2f5233', borderColor: '#2f5233' }}
            >
              Mostrar Éxito
            </Button>
            
            <Button
              variant="outlined"
              onClick={showManualError}
              sx={{ color: '#d32f2f', borderColor: '#d32f2f' }}
            >
              Mostrar Error
            </Button>
            
            <Button
              variant="outlined"
              onClick={showManualWarning}
              sx={{ color: '#ff9800', borderColor: '#ff9800' }}
            >
              Mostrar Advertencia
            </Button>
            
            <Button
              variant="outlined"
              onClick={showManualInfo}
              sx={{ color: '#2196f3', borderColor: '#2196f3' }}
            >
              Mostrar Info
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Notification Dialog */}
      <NotificationDialog
        open={isNotificationOpen}
        notification={notification}
        onClose={closeNotification}
      />
    </>
  );
};

export default NotificationExample;
