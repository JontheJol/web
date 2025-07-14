import React from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppStore } from '../store/appStore';
import { useNavigate } from 'react-router-dom';
import { type UserFormData } from '../types';

const schema = yup.object({
  name: yup
    .string()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: yup
    .string()
    .required('El email es requerido')
    .email('Debe ser un email válido'),
  age: yup
    .number()
    .required('La edad es requerida')
    .min(18, 'La edad debe ser mayor a 18 años')
    .max(100, 'La edad debe ser menor a 100 años'),
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
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      name: '',
      email: '',
      age: 18,
    },
  });

  const handleFormSubmit = (data: UserFormData) => {
    onSubmit(data);
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
