import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { useAppStore } from '../store/appStore';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, authLoading, authError, setAuthError } = useAppStore();

  const handleBackToLogin = () => {
    // Clear any existing errors when going back to login
    setAuthError(null);
    // Navigate to login page
    navigate('/login');
  };

  return (
    <RegisterForm
      onRegister={register}
      loading={authLoading}
      error={authError}
      onBackToLogin={handleBackToLogin}
    />
  );
};

export default Register;
