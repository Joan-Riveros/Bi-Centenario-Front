import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { authService } from '../../services/authService.js';
import TwoFactorAuthSetup from './TwoFactorAuthSetup.jsx';
import Button from '../../components/Button.jsx';
import { FiUser, FiMail, FiLock, FiShield, FiCheckCircle, FiAlertTriangle, FiSettings, FiEdit, FiSave, FiX} from 'react-icons/fi';
import { LayoutGrid } from '../../components/ui/LayoutGrid';

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

    if (isLoadingProfile && !profileData) {
        return <div className="text-center p-10 dark:text-gray-300">Cargando perfil...</div>;
    }

    if (profileError && !profileData) {
        return <div className="text-center p-10 text-red-500">{profileError}</div>;
    }
    
    if (!authUser && !profileData) {
        return <div className="text-center p-10 dark:text-gray-300">Por favor, inicia sesión para ver tu perfil.</div>;
    }

    const cards = [
        {
            id: 1,
            content: (
                <div>
                    <p className="font-bold text-2xl md:text-4xl text-white">Archivo General de la Nación</p>
                    <p className="text-sm text-neutral-200 mt-2">Accede a archivos históricos digitalizados.</p>
                </div>
            ),
            className: "md:col-span-2",
            thumbnail: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhsCgTENCfzV5JNgJAVGIH-NUA-P31P5p5CkeMRdXrgPWSArm6rT7EN5ovt-yRCRbx1PBAfigbEhFTGRjW9oiMmNafDpzn0ZCuSpTBzwuC-ApNafNdeG3i3FDijtJ-RcRpUTk8K-uYGitMY/s200/xddd.png",
        },
        {
            id: 2,
            content: (
                <div>
                    <p className="font-bold text-2xl md:text-4xl text-white">Documentos Militares</p>
                    <p className="text-sm text-neutral-200 mt-2">Historial bélico y tratados.</p>
                </div>
            ),
            className: "col-span-1",
            thumbnail: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 3,
            content: (
                <div>
                    <p className="font-bold text-2xl md:text-4xl text-white">Mapas Antiguos</p>
                    <p className="text-sm text-neutral-200 mt-2">Cartografía de los siglos XVIII y XIX.</p>
                </div>
            ),
            className: "col-span-1",
            thumbnail: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 4,
            content: (
                <div>
                    <p className="font-bold text-2xl md:text-4xl text-white">Revoluciones Regionales</p>
                    <p className="text-sm text-neutral-200 mt-2">Documentos sobre los movimientos locales.</p>
                </div>
            ),
            className: "md:col-span-2",
            thumbnail: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=800&q=80",
        },
    ];


    return (
        <div className="min-h-screen bg-light-gradient dark:bg-dark-gradient bg-full animate-gradient transition-all">
            <div
                className="w-full h-44 md:h-56 bg-cover bg-center shadow-md"
                style={{ backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/6/64/Cole_Thomas_The_Course_of_Empire_Destruction_1836.jpg)' }}
            >
                <div className="w-full h-full bg-black/40 flex items-center justify-center">
                    <h2 className="text-white text-xl md:text-2xl font-semibold tracking-wide text-center px-4">
                        "Tu cuenta, tu historia, tu seguridad."
                    </h2>
                </div>
            </div>

            <div className="relative z-[1] grid md:grid-cols-[240px_1fr] gap-6 max-w-7xl mx-auto px-4 sm:px-8 -mt-24">
                <aside className="hidden md:flex flex-col bg-white dark:bg-base rounded-xl shadow border border-gray-200 dark:border-slate-700 p-4 space-y-4">
                    <h3 className="text-lg font-semibold text-primary dark:text-accent">Mi Cuenta</h3>
                    <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                        <li className="flex items-center gap-2 cursor-pointer hover:text-primary"><FiUser /> Información</li>
                        <li className="flex items-center gap-2 cursor-pointer hover:text-primary"><FiShield /> Seguridad</li>
                        <li className="flex items-center gap-2 cursor-pointer hover:text-primary"><FiLock /> Contraseña</li>
                        <li className="flex items-center gap-2 cursor-pointer hover:text-primary"><FiSettings /> Preferencias</li>
                    </ul>
                </aside>

                <div className="bg-white dark:bg-darkSecondary rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-2">
                        <FiUser className="text-primary dark:text-accent" />
                        Perfil del Usuario
                    </h1>
                    {actionMessage.text && (
                        <div className={`p-3 rounded-md text-sm mb-6 ${
                            actionMessage.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-700 dark:text-green-50'
                            : 'bg-red-50 text-red-700 dark:bg-red-700 dark:text-red-50'
                        }`}>
                            {actionMessage.text}
                        </div>
                        )}

                        {editError && (
                            <div className="p-3 rounded-md text-sm mb-6 bg-red-50 text-red-700 dark:bg-red-700 dark:text-red-50">
                                {editError}
                            </div>
                    )}

                    <form onSubmit={handleProfileUpdateSubmit}>
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8">
                            <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-tr from-primary to-accent text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-lg ring-2 ring-accent">
                                {inicial}
                            </div>
                            <div className="flex-1 space-y-3 text-center sm:text-left">
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
                                    <span className="capitalize">
                                        Rol:
                                        <span className="ml-2 inline-block text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full dark:bg-blue-700 dark:text-white">
                                            {displayUser.role?.toLowerCase()}
                                        </span>
                                    </span>
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

                    
                    {actionMessage.text && (
                        <div className={`p-3 rounded-md text-sm ${
                            actionMessage.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-700 dark:text-green-50' 
                            : 'bg-red-50 text-red-700 dark:bg-red-700 dark:text-red-50'
                        }`}>
                            {actionMessage.text}
                        </div>
                    )}

                    {displayUser.role === 'administrador' && (
                        <div className="border-t border-gray-300 dark:border-gray-600 pt-6 space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                <FiShield /> Seguridad de la Cuenta
                            </h2>
                            <div className="p-4 bg-gray-50 dark:bg-slate-700/60 rounded-lg border border-gray-200 dark:border-slate-600">
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
            
            <button className="fixed bottom-6 right-6 z-50 bg-accent text-white px-4 py-2 rounded-full shadow-lg hover:brightness-110 transition-all">
                Ayuda
            </button> 

            <div className="mt-20">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
                    Explora Secciones Relacionadas
                </h2>
                <LayoutGrid cards={cards} />
            </div>
        </div>
    );
}

export default UserProfile;