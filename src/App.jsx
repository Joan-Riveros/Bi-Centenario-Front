import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider} from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

import MainLayout from './layouts/MainLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';

import HomePage from './pages/HomePage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx'; 
import RecoverPassword from './pages/RecoverPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

import AdminUsers from './pages/admin/AdminUsers.jsx';
import VisitanteInicio from './pages/visitante/VisitanteInicio.jsx';
import InvestigadorDashboard from './pages/investigador/InvestigadorDashboard.jsx';

import ProtectedRoute from './routes/ProtectedRoute.jsx';
import AccessDenied from './pages/AccessDenied.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
      <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
      <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
      <Route path="/recover-password" element={<MainLayout><RecoverPassword /></MainLayout>} />
      <Route path="/reset-password" element={<MainLayout><ResetPassword /></MainLayout>} />
      <Route path="/403" element={<MainLayout><AccessDenied /></MainLayout>} />

      <Route
        path="/admin-users"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminLayout>
              <AdminUsers />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/investigador"
        element={
          <ProtectedRoute allowedRoles={['Investigador']}>
            <MainLayout>
              <InvestigadorDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/inicio-visitante"
        element={
          <ProtectedRoute allowedRoles={['Visitante']}>
            <MainLayout>
              <VisitanteInicio />
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;