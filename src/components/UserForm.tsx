import React from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppStore } from '../store/appStore';
import { useNavigate } from 'react-router-dom';
import { type UserFormData } from '../types';
import { REGEX_PATTERNS, VALIDATION_MESSAGES } from '../utils/regexPatterns';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es requerido')
    .matches(REGEX_PATTERNS.NAME, VALIDATION_MESSAGES.NAME),
  email: yup
    .string()
    .required('El email es requerido')
    .matches(REGEX_PATTERNS.EMAIL, VALIDATION_MESSAGES.EMAIL),
  age: yup
    .number()
    .required('La edad es requerida')
    .min(18, 'La edad debe ser mayor a 18 años')
    .max(100, 'La edad debe ser menor a 100 años'),
  phone: yup
    .string()
    .notRequired()
    .when('phone', {
      is: (value: string) => value && value.length > 0,
      then: (schema) => schema.matches(REGEX_PATTERNS.PHONE, VALIDATION_MESSAGES.PHONE),
      otherwise: (schema) => schema,
    }),
  gender: yup
    .string()
    .notRequired()
    .when('gender', {
      is: (value: string) => value && value.length > 0,
      then: (schema) => schema.matches(REGEX_PATTERNS.GENDER, VALIDATION_MESSAGES.GENDER),
      otherwise: (schema) => schema,
    }),
  curp: yup
    .string()
    .notRequired()
    .when('curp', {
      is: (value: string) => value && value.length > 0,
      then: (schema) => schema.matches(REGEX_PATTERNS.CURP, VALIDATION_MESSAGES.CURP),
      otherwise: (schema) => schema,
    }),
  rfc: yup
    .string()
    .notRequired()
    .when('rfc', {
      is: (value: string) => value && value.length > 0,
      then: (schema) => schema.matches(REGEX_PATTERNS.RFC, VALIDATION_MESSAGES.RFC),
      otherwise: (schema) => schema,
    }),
});

interface UserFormProps {
  initialData?: UserFormData;
  onSubmit: (data: UserFormData) => void;
  title: string;
  submitText: string;
}

const UserForm: React.FC<UserFormProps> = ({
  initialData,
  onSubmit,
  title,
  submitText,
}) => {
  const navigate = useNavigate();
  const { error } = useAppStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: initialData || {
      name: '',
      email: '',
      age: 18,
      phone: '',
      gender: undefined,
      curp: '',
      rfc: '',
    },
  });

  const handleFormSubmit = (data: UserFormData) => {
    const formData: UserFormData = {
      name: data.name,
      email: data.email,
      age: data.age,
      phone: data.phone || undefined,
      gender: data.gender || undefined,
      curp: data.curp || undefined,
      rfc: data.rfc || undefined,
    };
    onSubmit(formData);
    navigate('/users');
  };

  return (
    <Box sx={{ padding: { xs: 1, sm: 2 } }}>
      <Paper elevation={3} sx={{ padding: { xs: 2, sm: 3 }, maxWidth: 600, margin: '0 auto' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Edad"
                type="number"
                fullWidth
                margin="normal"
                error={!!errors.age}
                helperText={errors.age?.message}
                inputProps={{ min: 18, max: 100 }}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Teléfono (Opcional)"
                fullWidth
                margin="normal"
                error={!!errors.phone}
                helperText={errors.phone?.message || 'Formato: 10 dígitos (ej: 5551234567)'}
                placeholder="5551234567"
              />
            )}
          />

          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal" error={!!errors.gender}>
                <InputLabel>Género (Opcional)</InputLabel>
                <Select
                  {...field}
                  label="Género (Opcional)"
                  value={field.value || ''}
                >
                  <MenuItem value="">
                    <em>Seleccionar...</em>
                  </MenuItem>
                  <MenuItem value="Masculino">Masculino</MenuItem>
                  <MenuItem value="Femenino">Femenino</MenuItem>
                </Select>
                {errors.gender && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                    {errors.gender.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />

          <Controller
            name="curp"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="CURP (Opcional)"
                fullWidth
                margin="normal"
                error={!!errors.curp}
                helperText={errors.curp?.message || 'Formato: AAAA######AAAAAA#'}
                placeholder="CURP123456HDFRNN09"
                inputProps={{ style: { textTransform: 'uppercase' } }}
              />
            )}
          />

          <Controller
            name="rfc"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="RFC (Opcional)"
                fullWidth
                margin="normal"
                error={!!errors.rfc}
                helperText={errors.rfc?.message || 'Formato: AAA######AAA'}
                placeholder="ABC123456DEF"
                inputProps={{ style: { textTransform: 'uppercase' } }}
              />
            )}
          />

          <Box sx={{ display: 'flex', gap: 2, marginTop: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              fullWidth
            >
              {submitText}
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/users')}
              fullWidth
            >
              Cancelar
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default UserForm;
