import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; 
import { authService } from '../services/authService';  
import AuthWrapper from '../components/AuthWrapper.jsx'; 
import Button from '../components/Button.jsx';        

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
    <AuthWrapper>
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
        Verificación de Dos Pasos
      </h2>
      {userEmail && (
        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-6">
          Ingresa el código para la cuenta: <strong>{userEmail}</strong>
        </p>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-sm text-center mb-4 p-2 bg-red-100 dark:bg-red-800 dark:text-red-200 rounded">{error}</p>}

        {!useBackupCode ? (
          <div>
            <label htmlFor="totpCode" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Código de Autenticación (6-8 dígitos)
            </label>
            <input
              id="totpCode"
              type="text" 
              inputMode="numeric" 
              pattern="\d*" 
              value={totpCode}
              onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))} 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="123456"
              maxLength={8} 
              required={!useBackupCode}
              disabled={isLoading}
              autoComplete="one-time-code" 
            />
          </div>
        ) : (
          <div>
            <label htmlFor="backupCode" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Código de Respaldo
            </label>
            <input
              id="backupCode"
              type="text"
              value={backupCode}
              onChange={(e) => setBackupCode(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Ej: abc123ef (8 caracteres)" 
              maxLength={8} 
              required={useBackupCode}
              disabled={isLoading}
            />
          </div>
        )}

        <div className="text-center">
            <button
                type="button"
                onClick={() => {
                    setUseBackupCode(!useBackupCode);
                    setError(''); 
                    setTotpCode(''); 
                    setBackupCode(''); 
                }}
                className="text-sm text-primary hover:text-primary-hover transition-colors underline disabled:text-gray-400 disabled:no-underline"
                disabled={isLoading}
            >
                {useBackupCode ? 'Usar código de aplicación autenticadora' : 'Usar un código de respaldo'}
            </button>
        </div>

        <div className="flex items-center">
          <input
            id="rememberDevice"
            type="checkbox"
            checked={rememberDevice}
            onChange={(e) => setRememberDevice(e.target.checked)}
            className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:focus:ring-offset-gray-800"
            disabled={isLoading}
          />
          <label htmlFor="rememberDevice" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
            Recordar este dispositivo por 30 días
          </label>
        </div>

        <Button
          type="submit"
          className="w-full py-3 text-base"
          disabled={isLoading || (!useBackupCode && !totpCode) || (useBackupCode && !backupCode) }
        >
          {isLoading ? 'Verificando...' : 'Verificar Código'}
        </Button>
      </form>
    </AuthWrapper>
  );
}

export default Verify2FAPage;