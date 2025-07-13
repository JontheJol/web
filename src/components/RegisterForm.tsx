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
  CircularProgress,
  Paper,
} from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { RegisterData } from '../store/appStore';
import { REGEX_PATTERNS, VALIDATION_MESSAGES } from '../utils/regexPatterns';

interface RegisterFormData extends RegisterData {}

interface RegisterFormProps {
  onRegister: (data: RegisterData) => Promise<void>;
  loading: boolean;
  error: string | null;
  onBackToLogin?: () => void;
}

const schema = yup.object({
  firstName: yup
    .string()
    .required('El nombre es requerido')
    .matches(REGEX_PATTERNS.NAME, VALIDATION_MESSAGES.NAME),
  lastName: yup
    .string()
    .required('El apellido es requerido')
    .matches(REGEX_PATTERNS.NAME, VALIDATION_MESSAGES.NAME),
  phone: yup
    .string()
    .required('El celular es requerido')
    .matches(REGEX_PATTERNS.PHONE, VALIDATION_MESSAGES.PHONE),
  curp: yup
    .string()
    .required('El CURP es requerido')
    .matches(REGEX_PATTERNS.CURP, VALIDATION_MESSAGES.CURP),
  rfc: yup
    .string()
    .required('El RFC es requerido')
    .matches(REGEX_PATTERNS.RFC, VALIDATION_MESSAGES.RFC),
  email: yup
    .string()
    .required('El correo electrónico es requerido')
    .matches(REGEX_PATTERNS.EMAIL, VALIDATION_MESSAGES.EMAIL),
  password: yup
    .string()
    .required('La contraseña es requerida')
    .matches(REGEX_PATTERNS.PASSWORD, VALIDATION_MESSAGES.PASSWORD),
});

const RegisterForm: React.FC<RegisterFormProps> = ({
  onRegister,
  loading,
  error,
  onBackToLogin,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      curp: '',
      rfc: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await onRegister(data);
      navigate('/'); // Navigate to home on successful registration
    } catch (err) {
      // Error handled by store
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleBackToLogin = () => {
    console.log('Navigating to login page...');
    if (onBackToLogin) {
      onBackToLogin();
    } else {
      navigate('/login');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#fff9ec',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          borderRadius: '15px',
          padding: { xs: 3, sm: 4, md: 6 },
          maxWidth: '889px',
          width: '100%',
          backgroundColor: '#fff9ec',
          border: '1px solid rgba(0,0,0,0.05)',
          boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
        }}
      >
        {/* Back to Login */}
        <Box sx={{ mb: 2 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={handleBackToLogin}
            sx={{
              color: '#453726',
              textTransform: 'none',
              fontFamily: 'League Spartan, sans-serif',
              '&:hover': {
                backgroundColor: 'rgba(69, 55, 38, 0.1)',
              },
            }}
          >
            Volver al inicio de sesión
          </Button>
        </Box>

        {/* BookSmart Logo */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            component="img"
            src="/booksmart Logo.svg"
            alt="BookSmart Logo"
            sx={{
              width: '80px',
              height: '80px',
              objectFit: 'contain',
            }}
          />
        </Box>

        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'League Spartan, sans-serif',
            fontWeight: 500,
            fontSize: '27px',
            lineHeight: '45px',
            color: '#453726',
            letterSpacing: '0.1px',
            textAlign: 'center',
            mb: 4,
          }}
        >
          Comparte los siguientes datos para completar tu registro.
        </Typography>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Registration Form */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 3,
            }}
          >
            {/* Nombre */}
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
                Nombre(s)
              </Typography>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
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

            {/* Celular */}
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
                Celular
              </Typography>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    placeholder="10 dígitos"
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

            {/* Apellido */}
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
                Apellido
              </Typography>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
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

            {/* CURP */}
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
                CURP
              </Typography>
              <Controller
                name="curp"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    error={!!errors.curp}
                    helperText={errors.curp?.message}
                    placeholder="18 caracteres"
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

            {/* Email */}
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

            {/* RFC */}
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
                RFC
              </Typography>
              <Controller
                name="rfc"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    error={!!errors.rfc}
                    helperText={errors.rfc?.message}
                    placeholder="12-13 caracteres"
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

            {/* Password */}
            <Box sx={{ gridColumn: { xs: '1', md: '1' } }}>
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
          </Box>

          {/* Submit Button */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              type="submit"
              disabled={loading}
              sx={{
                backgroundColor: '#2f5232',
                color: '#ffffff',
                borderRadius: '10px',
                height: '50px',
                width: '226px',
                fontFamily: 'League Spartan, sans-serif',
                fontWeight: 600,
                fontSize: '20px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#1f3522',
                },
                '&:disabled': {
                  backgroundColor: 'rgba(47, 82, 50, 0.5)',
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: '#ffffff' }} />
              ) : (
                'Siguiente'
              )}
            </Button>
          </Box>

          {/* Login Link */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography
              component="span"
              sx={{
                fontFamily: 'League Spartan, sans-serif',
                fontWeight: 600,
                fontSize: '16px',
                color: '#453726',
                mr: 1,
              }}
            >
              ¿Ya tienes una cuenta?
            </Typography>
            <Button
              variant="text"
              onClick={handleBackToLogin}
              sx={{
                fontFamily: 'League Spartan, sans-serif',
                fontWeight: 600,
                fontSize: '16px',
                color: '#2e5131',
                textDecoration: 'none',
                cursor: 'pointer',
                textTransform: 'none',
                minWidth: 'auto',
                padding: '4px 8px',
                '&:hover': {
                  textDecoration: 'underline',
                  backgroundColor: 'transparent',
                },
              }}
            >
              Iniciar sesión
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterForm;
