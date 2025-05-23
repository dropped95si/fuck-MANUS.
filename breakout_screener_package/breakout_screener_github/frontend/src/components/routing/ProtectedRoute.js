import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ requiresSubscription = false }) => {
  const { isAuthenticated, loading, user, subscription } = useSelector(state => state.auth);

  // Check if user is authenticated and has subscription if required
  const isAuthorized = isAuthenticated && 
    (!requiresSubscription || (subscription && subscription.planId));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // If not authenticated or missing required subscription, redirect to appropriate page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requiresSubscription && !subscription) {
    return <Navigate to="/subscription" />;
  }

  // If authorized, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
