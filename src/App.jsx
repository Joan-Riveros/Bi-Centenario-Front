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

import VisitorHome from './pages/visitor/VisitorHome.jsx';
import DocumentDetail from './pages/visitor/DocumentDetail';

import InvestigadorDashboard from './pages/investigador/InvestigadorDashboard.jsx';

import ProtectedRoute from './routes/ProtectedRoute.jsx';
import AccessDenied from './pages/AccessDenied.jsx';

import SearchDocuments from './pages/search/SearchDocuments.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
      <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
      <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
      <Route path="/recover-password" element={<MainLayout><RecoverPassword /></MainLayout>} />
      <Route path="/reset-password" element={<MainLayout><ResetPassword /></MainLayout>} />
      <Route path="/403" element={<MainLayout><AccessDenied /></MainLayout>} />
      <Route path="/inicio-visitor" element={<MainLayout><VisitorHome /></MainLayout>} />
      <Route path="/documento/:id" element={<MainLayout><DocumentDetail /></MainLayout>} />    
      <Route path="/search" element={<MainLayout><SearchDocuments /></MainLayout>}/>

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
        path="/inicio-visitor"
        element={
          <ProtectedRoute allowedRoles={['Visitor']}>
            <MainLayout>
              <VisitorHome />
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