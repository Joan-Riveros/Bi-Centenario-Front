// src/pages/profile/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { authService } from '../../services/authService.js'; // Asegúrate que la ruta es correcta
import TwoFactorAuthSetup from './TwoFactorAuthSetup.jsx';
 // Asegúrate que la ruta es correcta
import Button from '../../components/Button.jsx'; // Asumiendo que tienes este componente
import { FiUser, FiMail, FiLock, FiShield, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

function UserProfile() {
  const { user: authUser, token } = useAuth(); // Usamos 'user' del contexto como base
  const [profileData, setProfileData] = useState(null); // Para datos completos incluyendo 2FA status
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [actionMessage, setActionMessage] = useState({ type: '', text: ''}); // Para mensajes de habilitar/deshabilitar

  useEffect(() => {
    const fetchProfile = async () => {
      if (token) { // Solo intentar si hay token (usuario logueado)
        setIsLoadingProfile(true);
        setProfileError('');
        try {
          // Asumimos que getCurrentUserProfile devuelve { ..., is_2fa_enabled: boolean }
          const data = await authService.getCurrentUserProfile();
          setProfileData(data);
        } catch (err) {
          console.error("Error fetching profile:", err);
          setProfileError(err.detail || err.message || "No se pudo cargar el perfil.");
          // Si falla la carga del perfil y tenemos authUser, usamos eso como fallback parcial
          if (authUser) {
            setProfileData({ ...authUser, is_2fa_enabled: false }); // Asumir 2FA deshabilitado si falla la carga
          }
        } finally {
          setIsLoadingProfile(false);
        }
      } else {
         // Si no hay token, usamos el authUser (que podría ser null o datos decodificados básicos)
        setProfileData(authUser); // Podría ser null si no está logueado
        setIsLoadingProfile(false);
      }
    };
    fetchProfile();
  }, [token, authUser]); // Volver a cargar si el token o authUser (del contexto) cambian


  const handleToggle2FASetup = () => {
    setShow2FASetup(prev => !prev);
    setActionMessage({ type: '', text: '' }); // Limpiar mensajes al abrir/cerrar
  };

  const handle2FAEnabled = () => {
    setProfileData(prev => ({ ...prev, is_2fa_enabled: true }));
    setShow2FASetup(false); // Ocultar el componente de setup
    setActionMessage({ type: 'success', text: '¡Autenticación de Dos Factores habilitada exitosamente!' });
  };
  
  const handle2FASetupCancelled = () => {
      setShow2FASetup(false);
      setActionMessage({ type: '', text: '' });
  };

  const handleDisable2FA = async () => {
    if (!window.confirm("¿Estás seguro de que quieres deshabilitar la Autenticación de Dos Factores? Tu cuenta será menos segura.")) {
      return;
    }
    setIsLoadingProfile(true); // Reutilizar isLoading para la acción
    setActionMessage({ type: '', text: '' });
    try {
      const response = await authService.disable2FA();
      setProfileData(prev => ({ ...prev, is_2fa_enabled: false }));
      setActionMessage({ type: 'success', text: response.detail || "2FA deshabilitada correctamente." });
    } catch (err) {
      setActionMessage({ type: 'error', text: err.detail || err.message || "Error al deshabilitar 2FA." });
    } finally {
      setIsLoadingProfile(false);
    }
  };
  
  // Fallback si no hay usuario aún (previene errores de lectura de propiedades)
  // Usamos profileData si está disponible, sino authUser, sino un invitado.
  const displayUser = profileData || authUser || {
    nombre: 'Usuario Invitado',
    email: 'correo@ejemplo.com',
    role: 'VISITANTE', // Asegúrate que 'VISITANTE' es el valor correcto de tu enum UserRole
    is_2fa_enabled: false,
  };

  const inicial = displayUser?.nombre?.[0]?.toUpperCase() || displayUser?.email?.[0]?.toUpperCase() || '?';

  if (isLoadingProfile && !profileData) {
    return <div className="text-center p-10 dark:text-gray-300">Cargando perfil...</div>;
  }

  if (profileError && !profileData) {
       return <div className="text-center p-10 text-red-500">{profileError}</div>;
  }
  
  if (!authUser && !profileData) { // Si después de cargar, no hay usuario autenticado
      return <div className="text-center p-10 dark:text-gray-300">Por favor, inicia sesión para ver tu perfil.</div>;
  }


  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white dark:bg-darkSecondary rounded-lg shadow-xl p-6 sm:p-8 space-y-6 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Perfil del Usuario
        </h1>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-lg">
            {inicial}
          </div>
          <div className="flex-1 space-y-3 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 text-gray-800 dark:text-white">
              <FiUser className="text-xl text-primary dark:text-primary-light" />
              <span className="font-medium text-lg">{displayUser.nombre}</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-3 text-gray-600 dark:text-gray-300">
              <FiMail className="text-xl" />
              <span>{displayUser.email}</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-3 text-gray-600 dark:text-gray-300">
              <FiLock className="text-xl" />
              <span className="capitalize">Rol: {displayUser.role?.toLowerCase()}</span>
            </div>
          </div>
        </div>
        
        {actionMessage.text && (
            <div className={`p-3 rounded-md text-sm ${
                actionMessage.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-700 dark:text-green-50' 
                                               : 'bg-red-50 text-red-700 dark:bg-red-700 dark:text-red-50'
            }`}>
                {actionMessage.text}
            </div>
        )}

        {/* Sección de Seguridad y 2FA solo para Administradores */}
        {displayUser.role === 'administrador' && (
          <div className="border-t border-gray-300 dark:border-gray-600 pt-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Seguridad de la Cuenta</h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-100">Autenticación de Dos Factores (2FA)</h3>
                  {profileData?.is_2fa_enabled ? (
                    <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                      <FiCheckCircle /> Activada
                    </p>
                  ) : (
                    <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                      <FiAlertTriangle /> Desactivada. Te recomendamos activarla.
                    </p>
                  )}
                </div>
                {!show2FASetup && (
                  profileData?.is_2fa_enabled ? (
                    <Button variant="danger" onClick={handleDisable2FA} disabled={isLoadingProfile}>
                      Deshabilitar 2FA
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={handleToggle2FASetup} disabled={isLoadingProfile}>
                      Habilitar 2FA
                    </Button>
                  )
                )}
              </div>
               {show2FASetup && !profileData?.is_2fa_enabled && (
                <TwoFactorAuthSetup
                  on2FAEnabled={handle2FAEnabled}
                  onCancel={handle2FASetupCancelled}
                />
              )}
            </div>
          </div>
        )}

        <div className="border-t border-gray-300 dark:border-gray-500 pt-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Otras Configuraciones</h2>
          <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
            <li className="cursor-not-allowed opacity-50">Cambiar contraseña (próximamente)</li>
            {/* Otras configuraciones */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;