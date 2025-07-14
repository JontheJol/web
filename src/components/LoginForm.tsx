import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Link,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const schema = yup.object({
  email: yup
    .string()
    .email('Ingresa un correo electrónico válido')
    .required('El correo electrónico es requerido'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida'),
});

const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  loading,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await onLogin(data.email, data.password);
      navigate('/'); // Navigate to home on successful login
    } catch (err) {
      // Error handled by store
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '100%',
        maxWidth: '359px',
      }}
    >
      {/* Title */}
      <Typography
        variant="h1"
        sx={{
          fontFamily: 'League Spartan, sans-serif',
          fontWeight: 500,
          fontSize: { xs: '48px', sm: '64px' },
          lineHeight: '45px',
          color: '#453726',
          letterSpacing: '0.1px',
          mb: 2,
        }}
      >
        Hola, inicia sesión para continuar.
      </Typography>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Email Field */}
      <Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: 'League Spartan, sans-serif',
            fontWeight: 400,
            fontSize: '24px',
            color: '#4b453d',
            mb: 1,
          }}
        >
          Correo electrónico
        </Typography>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  height: '48px',
                  '& fieldset': {
                    borderColor: 'rgba(69, 55, 38, 0.15)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(69, 55, 38, 0.3)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#453726',
                  },
                },
              }}
            />
          )}
        />
      </Box>

      {/* Password Field */}
      <Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: 'League Spartan, sans-serif',
            fontWeight: 400,
            fontSize: '24px',
            color: '#4b453d',
            mb: 1,
          }}
        >
          Contraseña
        </Typography>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type={showPassword ? 'text' : 'password'}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      sx={{ color: '#453726' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  height: '48px',
                  '& fieldset': {
                    borderColor: 'rgba(69, 55, 38, 0.15)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(69, 55, 38, 0.3)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#453726',
                  },
                },
              }}
            />
          )}
        />
      </Box>

      {/* Register Link */}
      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
        <Typography
          sx={{
            fontFamily: 'League Spartan, sans-serif',
            fontWeight: 600,
            fontSize: '18px',
            color: '#453726',
          }}
        >
          ¿No tienes una cuenta?
        </Typography>
        <Link
          component="button"
          type="button"
          onClick={() => navigate('/register')}
          sx={{
            fontFamily: 'League Spartan, sans-serif',
            fontWeight: 600,
            fontSize: '18px',
            color: '#2e5131',
            textDecoration: 'none',
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Regístrate
        </Link>
      </Box>

      {/* Login Button */}
      <Button
        type="submit"
        disabled={loading}
        sx={{
          backgroundColor: '#453726',
          color: '#ffffff',
          borderRadius: '10px',
          height: '50px',
          fontFamily: 'League Spartan, sans-serif',
          fontWeight: 600,
          fontSize: '20px',
          textTransform: 'none',
          mt: 2,
          '&:hover': {
            backgroundColor: '#352b1f',
          },
          '&:disabled': {
            backgroundColor: 'rgba(69, 55, 38, 0.5)',
          },
        }}
      >
        {loading ? (
          <CircularProgress size={24} sx={{ color: '#ffffff' }} />
        ) : (
          'Iniciar sesión'
        )}
      </Button>
    </Box>
  );
};

export default LoginForm;
