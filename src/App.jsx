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
import UserProfile from './pages/profile/UserProfile.jsx';

import AdminUsers from './pages/admin/AdminUsers.jsx';
import UploadDocument from './pages/admin/UploadDocument.jsx';

import DocumentDetail from './pages/visitor/DocumentDetail';

import Foro from './pages/foro/Foro.jsx';
import ForoCategoria from './pages/foro/ForoCategoria.jsx';
import ForoDetalle from './pages/foro/ForoDetalle.jsx';
import CrearTema from './pages/foro/CrearTema';

import InvestigadorDashboard from './pages/investigador/InvestigadorDashboard.jsx';

import ProtectedRoute from './routes/ProtectedRoute.jsx';
import AccessDenied from './pages/AccessDenied.jsx';

import SearchDocuments from './pages/search/SearchDocuments.jsx';
import Verify2FAPage from './pages/Verify2FAPage.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
      <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
      <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
      <Route path="/recover-password" element={<MainLayout><RecoverPassword /></MainLayout>} />
      <Route path="/reset-password" element={<MainLayout><ResetPassword /></MainLayout>} />
      <Route path="/403" element={<MainLayout><AccessDenied /></MainLayout>} />
      <Route path="/documento/:id" element={<MainLayout><DocumentDetail /></MainLayout>} />
      <Route path="/foro" element={<MainLayout><Foro /></MainLayout>} />
      <Route path="/foro/categoria/:categoryId" element={<ForoCategoria />} />
      <Route path="/foro/:id" element={<ForoDetalle />} />
      <Route path="/search" element={<MainLayout><SearchDocuments /></MainLayout>} />
      
      <Route path="/verify-2fa" element={<MainLayout><Verify2FAPage /></MainLayout>} />

      <Route
        path="/admin/upload"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <AdminLayout><UploadDocument /></AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-users"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <AdminLayout>
              <AdminUsers />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/investigador"
        element={
          <ProtectedRoute allowedRoles={['Investigador', 'administrador']}>
            <MainLayout>
              <InvestigadorDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={['administrador', 'Investigador', 'Visitante']}>
            <MainLayout>
              <UserProfile />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/foro/nuevo"
        element={
          <ProtectedRoute allowedRoles={['administrador', 'Investigador', 'Visitante']}>
            <MainLayout>
              <CrearTema />
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