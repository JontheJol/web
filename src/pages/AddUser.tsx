import React from 'react';
import UserForm from '../components/UserForm';
import { useAppStore } from '../store/appStore';
import { type UserFormData } from '../types';

const AddUser: React.FC = () => {
  const { addUser } = useAppStore();

  const handleSubmit = (data: UserFormData) => {
    addUser(data);
  };

  return (
    <UserForm
      title="Agregar Nuevo Usuario"
      submitText="Crear Usuario"
      onSubmit={handleSubmit}
    />
  );
};

export default AddUser;
