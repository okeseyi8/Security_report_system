import React from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const token = useAuthStore((state) => state.token);
  const showForm = useAuthStore((state) => state.showForm)
  const user = useAuthStore((s) => s.user
  )
  if (!token && (showForm === "true")){
    return (<Navigate to="/" replace />)
  }
  return children;

}

export default ProtectedRoute