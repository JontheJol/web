import React from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Alert,
  MenuItem,
  Divider,
} from '@mui/material';
import { useFieldValidation, usePasswordValidation, useDocumentValidation, useLocationValidation, useSelectOptions } from '../hooks/useValidation';

/**
 * Componente de ejemplo para mostrar el uso de las validaciones centralizadas
 */
const ValidationExamplePage: React.FC = () => {
  const nombreValidation = useFieldValidation('NOMBRE_APELLIDO');
  const emailValidation = useFieldValidation('CORREO');
  const celularValidation = useFieldValidation('CELULAR');
  const passwordValidation = usePasswordValidation();
  const documentValidation = useDocumentValidation();
  const locationValidation = useLocationValidation();
  
  const generoOptions = useSelectOptions('GENEROS');
  const estadoLibrosOptions = useSelectOptions('ESTADOS_LIBROS');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario enviado con validaciones exitosas');
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        🔧 Sistema de Validaciones Centralizadas
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        Este es un ejemplo de cómo usar las expresiones regulares centralizadas en la aplicación.
        Todas las validaciones están basadas en el archivo <code>expreciones.txt</code>.
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {/* Validaciones Básicas */}
        <Box sx={{ flex: '1 1 500px', minWidth: '400px' }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
              📝 Validaciones Básicas
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Nombre */}
              <TextField
                label="Nombre"
                value={nombreValidation.value}
                onChange={(e) => nombreValidation.handleChange(e.target.value)}
                onBlur={nombreValidation.handleBlur}
                error={nombreValidation.touched && !!nombreValidation.error}
                helperText={nombreValidation.touched ? nombreValidation.error : 'Debe iniciar con mayúscula, solo letras y espacios'}
                fullWidth
              />

              {/* Email */}
              <TextField
                label="Correo Electrónico"
                value={emailValidation.value}
                onChange={(e) => emailValidation.handleChange(e.target.value)}
                onBlur={emailValidation.handleBlur}
                error={emailValidation.touched && !!emailValidation.error}
                helperText={emailValidation.touched ? emailValidation.error : 'Formato válido de correo electrónico'}
                fullWidth
              />

              {/* Celular */}
              <TextField
                label="Celular"
                value={celularValidation.value}
                onChange={(e) => celularValidation.handleChange(e.target.value)}
                onBlur={celularValidation.handleBlur}
                error={celularValidation.touched && !!celularValidation.error}
                helperText={celularValidation.touched ? celularValidation.error : 'Exactamente 10 dígitos numéricos'}
                fullWidth
              />

              {/* Género */}
              <TextField
                select
                label="Género"
                fullWidth
                helperText="Solo se acepta Masculino o Femenino"
              >
                {generoOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              {/* Estado de validación */}
              {nombreValidation.value && emailValidation.value && celularValidation.value && (
                <Alert 
                  severity={nombreValidation.isValid && emailValidation.isValid && celularValidation.isValid ? "success" : "warning"}
                >
                  {nombreValidation.isValid && emailValidation.isValid && celularValidation.isValid 
                    ? "✅ Todos los campos básicos son válidos" 
                    : "⚠️ Algunos campos necesitan corrección"}
                </Alert>
              )}
            </Box>
          </Paper>
        </Box>

        {/* Validaciones de Contraseña */}
        <Box sx={{ flex: '1 1 500px', minWidth: '400px' }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
              🔐 Validación de Contraseñas
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Contraseña"
                type="password"
                value={passwordValidation.password}
                onChange={(e) => passwordValidation.handlePasswordChange(e.target.value)}
                error={!!passwordValidation.passwordError}
                helperText={passwordValidation.passwordError || 'Mínimo 8 caracteres, una mayúscula, un número y un carácter especial'}
                fullWidth
              />

              <TextField
                label="Confirmar Contraseña"
                type="password"
                value={passwordValidation.confirmPassword}
                onChange={(e) => passwordValidation.handleConfirmPasswordChange(e.target.value)}
                error={!!passwordValidation.confirmError}
                helperText={passwordValidation.confirmError || 'Debe coincidir con la contraseña anterior'}
                fullWidth
              />

              {passwordValidation.password && passwordValidation.confirmPassword && (
                <Alert severity={passwordValidation.isValid ? "success" : "error"}>
                  {passwordValidation.isValid 
                    ? "✅ Contraseñas válidas y coinciden" 
                    : "❌ Las contraseñas no cumplen los requisitos o no coinciden"}
                </Alert>
              )}
            </Box>
          </Paper>
        </Box>

        {/* Documentos Mexicanos */}
        <Box sx={{ flex: '1 1 500px', minWidth: '400px' }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
              🇲🇽 Documentos Mexicanos
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="CURP"
                value={documentValidation.curp.value}
                onChange={(e) => documentValidation.curp.handleChange(e.target.value.toUpperCase())}
                onBlur={documentValidation.curp.handleBlur}
                error={documentValidation.curp.touched && !!documentValidation.curp.error}
                helperText={documentValidation.curp.touched ? documentValidation.curp.error : 'Formato CURP oficial mexicana'}
                fullWidth
                inputProps={{ style: { textTransform: 'uppercase' } }}
              />

              <TextField
                label="RFC"
                value={documentValidation.rfc.value}
                onChange={(e) => documentValidation.rfc.handleChange(e.target.value.toUpperCase())}
                onBlur={documentValidation.rfc.handleBlur}
                error={documentValidation.rfc.touched && !!documentValidation.rfc.error}
                helperText={documentValidation.rfc.touched ? documentValidation.rfc.error : 'Formato RFC con homoclave'}
                fullWidth
                inputProps={{ style: { textTransform: 'uppercase' } }}
              />

              {documentValidation.curp.value && documentValidation.rfc.value && (
                <Alert severity={documentValidation.isValid ? "success" : "warning"}>
                  {documentValidation.isValid 
                    ? "✅ Documentos mexicanos válidos" 
                    : "⚠️ Revisa el formato de los documentos"}
                </Alert>
              )}
            </Box>
          </Paper>
        </Box>

        {/* Ubicación de Libros */}
        <Box sx={{ flex: '1 1 500px', minWidth: '400px' }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
              📚 Ubicación de Libros
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Fila"
                  value={locationValidation.fila.value}
                  onChange={(e) => locationValidation.fila.handleChange(e.target.value)}
                  onBlur={locationValidation.fila.handleBlur}
                  error={locationValidation.fila.touched && !!locationValidation.fila.error}
                  helperText={locationValidation.fila.touched ? locationValidation.fila.error : '1-99'}
                  sx={{ flex: 1 }}
                />

                <TextField
                  label="Columna"
                  value={locationValidation.columna.value}
                  onChange={(e) => locationValidation.columna.handleChange(e.target.value.toUpperCase())}
                  onBlur={locationValidation.columna.handleBlur}
                  error={locationValidation.columna.touched && !!locationValidation.columna.error}
                  helperText={locationValidation.columna.touched ? locationValidation.columna.error : 'A-Z'}
                  sx={{ flex: 1 }}
                  inputProps={{ style: { textTransform: 'uppercase' }, maxLength: 1 }}
                />
              </Box>

              <TextField
                select
                label="Estado del Libro"
                fullWidth
                helperText="Estado actual del libro en la biblioteca"
              >
                {estadoLibrosOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              {locationValidation.fila.value && locationValidation.columna.value && (
                <Alert severity={locationValidation.isValid ? "success" : "warning"}>
                  {locationValidation.isValid 
                    ? `✅ Ubicación válida: ${locationValidation.getLocationString()}` 
                    : "⚠️ Revisa la fila y columna"}
                </Alert>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Instrucciones de Uso */}
      <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
          📖 Cómo usar las validaciones
        </Typography>
        
        <Typography variant="body2" component="div">
          <strong>1. Importa las utilidades:</strong>
          <pre style={{ background: '#f5f5f5', padding: '8px', borderRadius: '4px', marginTop: '8px' }}>
{`import { useFieldValidation } from '../hooks/useValidation';
import { REGEX_PATTERNS, validatePattern } from '../utils/regex';
import { registroUsuarioSchema } from '../utils/validation';`}
          </pre>
          
          <strong>2. Usa los hooks en tu componente:</strong>
          <pre style={{ background: '#f5f5f5', padding: '8px', borderRadius: '4px', margin: '8px 0' }}>
{`const emailValidation = useFieldValidation('CORREO');
const passwordValidation = usePasswordValidation();`}
          </pre>
          
          <strong>3. Conecta con tus campos:</strong>
          <pre style={{ background: '#f5f5f5', padding: '8px', borderRadius: '4px', marginTop: '8px' }}>
{`<TextField
  value={emailValidation.value}
  onChange={(e) => emailValidation.handleChange(e.target.value)}
  onBlur={emailValidation.handleBlur}
  error={emailValidation.touched && !!emailValidation.error}
  helperText={emailValidation.error}
/>`}
          </pre>
        </Typography>
      </Paper>
    </Box>
  );
};

export default ValidationExamplePage;
