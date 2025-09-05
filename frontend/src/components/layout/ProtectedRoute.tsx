import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  
  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Loading Colabship</h2>
            <p className="text-muted-foreground">Checking authentication...</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Redirect to homepage if not authenticated (user can click login button)
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  // Show the protected content if user is authenticated
  return <>{children}</>;
};

export default ProtectedRoute; 