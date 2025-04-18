import React from 'react';
import { Navigate } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';
import { useAuth } from '../context/AuthContext';

const SignupPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <SignupForm />
    </div>
  );
};

export default SignupPage;