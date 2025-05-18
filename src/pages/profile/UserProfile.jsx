import React, { useState, useEffect, useCallback } from 'react'; 
import { useAuth } from '../../context/AuthContext.jsx';
import { authService } from '../../services/authService.js';
import TwoFactorAuthSetup from './TwoFactorAuthSetup.jsx';
import Button from '../../components/Button.jsx';
import { FiUser, FiMail, FiLock, FiEdit, FiSave, FiX, FiShield, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi'; 

function UserProfile() {
  const { user: authUser, token, updateAuthContextUser, isLoading: isAuthLoading } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true); 
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [actionMessage, setActionMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editableNombre, setEditableNombre] = useState('');
  const [editError, setEditError] = useState('');
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const fetchProfileCallback = useCallback(async () => {
    if (token) {
      setIsLoadingProfile(true);
      setProfileError('');
      try {
        const data = await authService.getCurrentUserProfile(); 
        setProfileData(data);
        setEditableNombre(data.nombre || ''); 
      } catch (err) {
        console.error("Error fetching profile:", err);
        setProfileError(err.detail || err.message || "No se pudo cargar el perfil");
        if (authUser) {
          setProfileData({ ...authUser, is_2fa_enabled: false, nombre: authUser.nombre || '' });
          setEditableNombre(authUser.nombre || '');
        }
      } finally {
        setIsLoadingProfile(false);
      }
    } else if (!isAuthLoading) { 
      setProfileData(null); 
      setIsLoadingProfile(false);
    }
  }, [token, authUser, isAuthLoading]); 

  useEffect(() => {
    fetchProfileCallback();
  }, [fetchProfileCallback]);

  const handleToggleEdit = () => {
    if (!isEditing && profileData) {
      setEditableNombre(profileData.nombre); 
      setEditError('');
      setActionMessage({ type: '', text: '' }); 
    }
    setIsEditing(prev => !prev);
  };

  const handleNombreChange = (e) => {
    setEditableNombre(e.target.value);
  };

  const handleProfileUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editableNombre.trim()) {
      setEditError("El nombre no puede estar vacío.");
      return;
    }
    setIsSavingEdit(true);
    setEditError('');
    setActionMessage({ type: '', text: '' });
    try {
      const updatedUserData = await authService.updateUserProfile({ nombre: editableNombre.trim() });

      setProfileData(prevData => ({
        ...prevData, 
        id: updatedUserData.id, 
        nombre: updatedUserData.nombre, 
        email: updatedUserData.email, 
        role: updatedUserData.role, 
        is_active: updatedUserData.is_active, 
      }));
      updateAuthContextUser({ nombre: updatedUserData.nombre, email: updatedUserData.email }); 
      setIsEditing(false);
      setActionMessage({ type: 'success', text: '¡Nombre actualizado exitosamente!' });
    } catch (err) {
      setEditError(err.detail || err.message || "Error al actualizar el nombre");
    } finally {
      setIsSavingEdit(false);
    }
  };


  const handleToggle2FASetup = () => { setShow2FASetup(prev => !prev); setActionMessage({ type: '', text: '' }); };
  const handle2FAEnabled = () => { setProfileData(prev => ({ ...prev, is_2fa_enabled: true })); setShow2FASetup(false); setActionMessage({ type: 'success', text: '¡Autenticación de Dos Factores habilitada exitosamente!' }); };
  const handle2FASetupCancelled = () => {  setShow2FASetup(false); setActionMessage({ type: '', text: '' }); };
  const handleDisable2FA = async () => {  if (!window.confirm("¿Estás seguro de que quieres deshabilitar la Autenticación de Dos Factores? Tu cuenta será menos segura.")) { return; } setIsLoadingProfile(true); setActionMessage({ type: '', text: '' }); try { const response = await authService.disable2FA(); setProfileData(prev => ({ ...prev, is_2fa_enabled: false })); setActionMessage({ type: 'success', text: response.detail || "2FA deshabilitada correctamente." }); } catch (err) { setActionMessage({ type: 'error', text: err.detail || err.message || "Error al deshabilitar 2FA." }); } finally { setIsLoadingProfile(false); } };

  const displayUser = profileData || authUser; 
  const inicial = displayUser?.nombre?.[0]?.toUpperCase() || displayUser?.email?.[0]?.toUpperCase() || '?';

  if (isAuthLoading || (isLoadingProfile && !profileData && token)) {
    return <div className="text-center p-10 dark:text-gray-300">Cargando perfil...</div>;
  }
  if (profileError && !profileData) {
    return <div className="text-center p-10 text-red-500">{profileError}</div>;
  }
  if (!displayUser) {
    return <div className="text-center p-10 dark:text-gray-300">Por favor, inicia sesión para ver tu perfil.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white dark:bg-darkSecondary rounded-lg shadow-xl p-6 sm:p-8 space-y-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Perfil del Usuario
        </h1>

        {actionMessage.text && ( 
          <div className={`p-3 rounded-md text-sm mb-6 ${ actionMessage.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-700 dark:text-green-50' : 'bg-red-50 text-red-700 dark:bg-red-700 dark:text-red-50' }`}>
            {actionMessage.text}
          </div>
        )}
        {editError && ( 
            <div className="p-3 rounded-md text-sm mb-6 bg-red-50 text-red-700 dark:bg-red-700 dark:text-red-50">
                {editError}
            </div>
        )}


        {/* Informacion del perfil y edicion */}
        <form onSubmit={handleProfileUpdateSubmit}>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
            <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-lg">
              {inicial}
            </div>
            <div className="flex-1 space-y-3 text-center sm:text-left w-full">
              <div className="flex items-center justify-center sm:justify-start gap-3 text-gray-800 dark:text-white">
                <FiUser className="text-xl text-primary dark:text-primary-light" />
                {isEditing ? (
                  <input
                    type="text"
                    value={editableNombre}
                    onChange={handleNombreChange}
                    className="font-medium text-lg p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white focus:ring-primary focus:border-primary flex-grow"
                    disabled={isSavingEdit}
                  />
                ) : (
                  <span className="font-medium text-lg">{displayUser.nombre}</span>
                )}
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
             {!isEditing && (
                <Button type="button" onClick={handleToggleEdit} variant="icon" className="flex-shrink-0">
                    <FiEdit className="mr-1" /> Editar Nombre
                </Button>
            )}
          </div>

          {isEditing && (
            <div className="flex flex-col sm:flex-row gap-3 mt-4 pt-4 border-t dark:border-gray-600">
              <Button type="submit" variant="primary" className="w-full sm:w-auto" disabled={isSavingEdit}>
                <FiSave className="mr-2" /> {isSavingEdit ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
              <Button type="button" onClick={handleToggleEdit} variant="secondary" className="w-full sm:w-auto" disabled={isSavingEdit}>
                <FiX className="mr-2" /> Cancelar
              </Button>
            </div>
          )}
        </form>

        {/*Seguridad 2FA soloAdministradores */}
        {displayUser.role?.toUpperCase() === 'ADMINISTRADOR' && ( 
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
                    <Button variant="danger" onClick={handleDisable2FA} disabled={isLoadingProfile || isSavingEdit}>
                      Deshabilitar 2FA
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={handleToggle2FASetup} disabled={isLoadingProfile || isSavingEdit}>
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
      </div>
    </div>
  );
}

export default UserProfile;