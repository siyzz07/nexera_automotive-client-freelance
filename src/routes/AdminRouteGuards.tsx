import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/sessionStorageUtils';

interface RouteProps {
  children: ReactNode;
}


export const ProtectedRoute = ({ children }: RouteProps) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};


export const PublicRoute = ({ children }: RouteProps) => {
  const token = getToken();

  if (token) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};
