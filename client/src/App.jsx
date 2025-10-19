import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import SalonsPage from './pages/SalonsPage.jsx';
import SalonDetailsPage from './pages/SalonDetailsPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

const App = () => (
  <AuthProvider>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/salons" element={<SalonsPage />} />
        <Route path="/salons/:id" element={<SalonDetailsPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Layout>
  </AuthProvider>
);

export default App;
