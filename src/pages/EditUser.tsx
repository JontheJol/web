import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Box } from '@mui/material';
import UserForm from '../components/UserForm';
import { useAppStore } from '../store/appStore';
import { type UserFormData } from '../types';

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { users, updateUser } = useAppStore();

  const user = users.find(u => u.id === Number(id));

  if (!user) {
    return (
      <Box sx={{ padding: 3 }}>
        <Alert severity="error">
          Usuario no encontrado
        </Alert>
      </Box>
    );
  }

  const handleSubmit = (data: UserFormData) => {
    updateUser(user.id, data);
    navigate('/users');
  };

  return (
    <UserForm
      title={`Editar Usuario: ${user.name}`}
      submitText="Actualizar Usuario"
      onSubmit={handleSubmit}
      initialData={{
        name: user.name,
        email: user.email,
        age: user.age,
      }}
    />
  );
};

export default EditUser;
