import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Public Pages
import Landing from './pages/public/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import FreeBreakoutCandidate from './pages/public/FreeBreakoutCandidate';
import Subscription from './pages/public/Subscription';

// Private Pages
import Dashboard from './pages/private/Dashboard';
import BreakoutCandidates from './pages/private/BreakoutCandidates';
import UserProfile from './pages/private/UserProfile';
import AccountSettings from './pages/private/AccountSettings';
import CheckoutPage from './pages/private/CheckoutPage';

// Content Pages
import FreePremiumContent from './pages/content/FreePremiumContent';

// Routing Components
import ProtectedRoute from './components/routing/ProtectedRoute';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  
  useEffect(() => {
    // Check user preference for dark mode
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    } else {
      // Default to dark mode for trading application
      setDarkMode(true);
    }
  }, []);
  
  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save preference
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="container mx-auto px-4 py-8 max-w-7xl">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/free-candidate" element={<FreeBreakoutCandidate />} />
              <Route path="/subscription" element={<Subscription />} />
              
              {/* Protected Routes (require authentication) */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/settings" element={<AccountSettings />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Route>
              
              {/* Premium Routes (require subscription) */}
              <Route element={<ProtectedRoute requiresSubscription={true} />}>
                <Route path="/premium/candidates" element={<BreakoutCandidates />} />
              </Route>
              
              {/* Combined Free/Premium Content */}
              <Route path="/breakout-candidates" element={<FreePremiumContent />} />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
