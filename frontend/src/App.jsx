import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ConnectAccounts from './pages/ConnectAccounts';
import AIAdvice from './pages/AIAdvice';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Features from './pages/Features';
import Notifications from './pages/Notifications';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for token in localStorage on initial load
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const PrivateRoute = ({ children }) => {
    if (isLoading) return <div>Loading...</div>;
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar isAuthenticated={isAuthenticated} setAuth={setAuth} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/features" element={<Features />} />
            <Route path="/login" element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/dashboard" />} />
            
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/connect" element={
              <PrivateRoute>
                <ConnectAccounts />
              </PrivateRoute>
            } />
            <Route path="/ai-advice" element={
              <PrivateRoute>
                <AIAdvice />
              </PrivateRoute>
            } />
            <Route path="/notifications" element={
              <PrivateRoute>
                <Notifications />
              </PrivateRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
