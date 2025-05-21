import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; 
import { authService } from '../services/authService';  
import AuthWrapper from '../components/AuthWrapper.jsx'; 
import Button from '../components/Button.jsx'; 
import logoImage from '../assets/MomoriaAntiqua.jpg'; 
import { PiLockKeyFill } from 'react-icons/pi';

function Verify2FAPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { complete2FALogin } = useAuth(); 

    const [totpCode, setTotpCode] = useState('');
    const [backupCode, setBackupCode] = useState('');
    const [useBackupCode, setUseBackupCode] = useState(false);
    const [rememberDevice, setRememberDevice] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    
    const twoFactorToken = location.state?.twoFactorToken;
    const userEmail = location.state?.email; 

    useEffect(() => {
        if (!twoFactorToken) {
            console.error("No se encontro el token de 2FA. Redirigiendo a login");
            navigate('/login'); 
        }
    }, [twoFactorToken, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!twoFactorToken) {
            setError("Error: Sesión de verificacion no valida. Intenta iniciar sesión de nuevo");
            setIsLoading(false);
            navigate('/login'); 
            return;
        }

        if (!useBackupCode && !totpCode.match(/^\d{6,8}$/)) { 
            setError("Por favor, ingresa tu codigo de autenticación (6-8 digitos)");
            setIsLoading(false);
            return;
        }

        if (useBackupCode && !backupCode) { 
            setError("Por favor, ingresa tu codigo de respaldo");
            setIsLoading(false);
            return;
        }

        try {
            const verificationData = {
                two_factor_token: twoFactorToken,
                remember_device: rememberDevice,
            };

            if (useBackupCode) {
                verificationData.backup_code = backupCode;
            } else {
                verificationData.totp_code = totpCode;
            }

            const response = await authService.verify2FALogin(verificationData);

            if (response && response.access_token) {
                complete2FALogin(response.access_token); 

                navigate('/');
            } else {
                setError("Respuesta inesperada del servidor durante la verificación 2FA");
            }
        } catch (err) {
            console.error("Error en la verificación 2FA:", err);
            setError(err.detail || err.message || "Código de verificacion incorrecto o error del servidor");
        } finally {
            setIsLoading(false);
        }
    };

    if (!twoFactorToken && !isLoading) {
        return <p className="text-center mt-10 dark:text-gray-300">Sesion de verificacion no valida. Redirigiendo...</p>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-light dark:bg-base px-4 py-12">
            <div className="max-w-5xl w-full bg-white dark:bg-darkSecondary rounded-lg shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2">
                <div className="hidden md:flex items-center justify-center bg-gradient-to-tr from-primary to-secondary p-8">
                    <img src={logoImage} alt="2FA visual" className="w-4/5 max-w-xs" />
                </div>

                <div className="p-8 md:p-10">
                    <div className="flex items-center justify-center mb-6">
                        <PiLockKeyFill className="text-3xl text-primary mr-2" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Verificación en Dos Pasos
                        </h2>
                    </div>

                    {userEmail && (
                        <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-4">
                            Verificando cuenta: <span className="font-medium">{userEmail}</span>
                        </p>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <p className="text-sm text-center p-3 bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100 rounded">
                                {error}
                            </p>
                        )}

                        {!useBackupCode ? (
                            <div>
                                <label htmlFor="totpCode" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Código de autenticación
                                </label>
                                <input
                                    id="totpCode"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="\d*"
                                    value={totpCode}
                                    onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Ej: 123456"
                                    maxLength={8}
                                    autoComplete="one-time-code"
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                        ) : (
                            <div>
                                <label htmlFor="backupCode" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Código de respaldo
                                </label>
                                <input
                                    id="backupCode"
                                    type="text"
                                    value={backupCode}
                                    onChange={(e) => setBackupCode(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Ej: abc123ef"
                                    maxLength={8}
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                        )}

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => {
                                    setUseBackupCode(!useBackupCode);
                                    setTotpCode('');
                                    setBackupCode('');
                                    setError('');
                                }}
                                disabled={isLoading}
                                className="text-sm text-primary underline hover:text-primary-hover transition-colors disabled:text-gray-400"
                            >
                                {useBackupCode ? 'Usar código de autenticación' : 'Usar código de respaldo'}
                            </button>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="rememberDevice"
                                type="checkbox"
                                checked={rememberDevice}
                                onChange={(e) => setRememberDevice(e.target.checked)}
                                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                                disabled={isLoading}
                            />
                            <label htmlFor="rememberDevice" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                Recordar este dispositivo por 30 días
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-3 text-base"
                            disabled={isLoading || (!useBackupCode && !totpCode) || (useBackupCode && !backupCode)}
                        >
                            {isLoading ? 'Verificando...' : 'Verificar Código'}
                        </Button>

                        <Link to="/login" className="block text-center mt-4 text-sm text-primary hover:text-primary-hover">
                            ⬅️ Volver al login
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Verify2FAPage;