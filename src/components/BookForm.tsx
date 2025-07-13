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
import { useNavigate } from 'react-router-dom';
import { type BookFormData } from '../types';
import { REGEX_PATTERNS, VALIDATION_MESSAGES } from '../utils/regexPatterns';

const schema = yup.object({
  title: yup
    .string()
    .required('El título es requerido')
    .matches(REGEX_PATTERNS.BOOK_NAME, VALIDATION_MESSAGES.BOOK_NAME),
  author: yup
    .string()
    .required('El autor es requerido')
    .matches(REGEX_PATTERNS.BOOK_NAME, VALIDATION_MESSAGES.BOOK_NAME),
  editorial: yup
    .string()
    .required('La editorial es requerida')
    .matches(REGEX_PATTERNS.BOOK_NAME, VALIDATION_MESSAGES.BOOK_NAME),
  status: yup
    .string()
    .required('El estado es requerido')
    .matches(REGEX_PATTERNS.BOOK_STATUS, VALIDATION_MESSAGES.BOOK_STATUS),
  location: yup
    .string()
    .required('La ubicación es requerida')
    .matches(REGEX_PATTERNS.LOCATION, VALIDATION_MESSAGES.LOCATION),
  row: yup
    .number()
    .required('La fila es requerida')
    .test('row-validation', VALIDATION_MESSAGES.ROW, function(value) {
      if (!value) return false;
      return REGEX_PATTERNS.ROW.test(value.toString());
    }),
  column: yup
    .string()
    .required('La columna es requerida')
    .matches(REGEX_PATTERNS.COLUMN, VALIDATION_MESSAGES.COLUMN),
});

interface BookFormProps {
  initialData?: BookFormData;
  onSubmit: (data: BookFormData) => void;
  title: string;
  submitText: string;
  error?: string | null;
}

const BookForm: React.FC<BookFormProps> = ({
  initialData,
  onSubmit,
  title,
  submitText,
  error,
}) => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      title: '',
      author: '',
      editorial: '',
      status: 'Disponible' as const,
      location: '',
      row: 1,
      column: 'A',
    },
  });

  const handleFormSubmit = (data: any) => {
    const formData: BookFormData = {
      title: data.title,
      author: data.author,
      editorial: data.editorial,
      status: data.status,
      location: data.location,
      row: data.row,
      column: data.column,
    };
    onSubmit(formData);
    navigate('/books');
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
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Título del Libro"
                fullWidth
                margin="normal"
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />

          <Controller
            name="author"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Autor"
                fullWidth
                margin="normal"
                error={!!errors.author}
                helperText={errors.author?.message}
              />
            )}
          />

          <Controller
            name="editorial"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Editorial"
                fullWidth
                margin="normal"
                error={!!errors.editorial}
                helperText={errors.editorial?.message}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal" error={!!errors.status}>
                <InputLabel>Estado</InputLabel>
                <Select
                  {...field}
                  label="Estado"
                >
                  <MenuItem value="Disponible">Disponible</MenuItem>
                  <MenuItem value="No disponible">No disponible</MenuItem>
                  <MenuItem value="Prestado">Prestado</MenuItem>
                </Select>
                {errors.status && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                    {errors.status.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />

          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Ubicación"
                fullWidth
                margin="normal"
                error={!!errors.location}
                helperText={errors.location?.message || 'Ej: Estante principal, Sección infantil, etc.'}
              />
            )}
          />

          <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
            <Controller
              name="row"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Fila"
                  type="number"
                  error={!!errors.row}
                  helperText={errors.row?.message || 'Número del 1 al 99'}
                  inputProps={{ min: 1, max: 99 }}
                  sx={{ flex: 1 }}
                />
              )}
            />

            <Controller
              name="column"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Columna"
                  error={!!errors.column}
                  helperText={errors.column?.message || 'Letra A-Z'}
                  inputProps={{ 
                    style: { textTransform: 'uppercase' },
                    maxLength: 1
                  }}
                  sx={{ flex: 1 }}
                />
              )}
            />
          </Box>

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
              onClick={() => navigate('/books')}
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

export default BookForm;
