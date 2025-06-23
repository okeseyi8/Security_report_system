import React from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const token = useAuthStore((state) => state.token);

  if (!token){
    return <Navigate to="/" replace />
  }
  return children;

}

export default ProtectedRoute