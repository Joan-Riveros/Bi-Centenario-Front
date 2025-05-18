import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService.js';
import CopyToClipboardButton from '../../components/ui/CopyToClipboardButton'; 
import Button from '../../components/Button.jsx'; 

function TwoFactorAuthSetup({ on2FAEnabled, onCancel }) {
  const [currentStep, setCurrentStep] = useState(1); 
  const [setupData, setSetupData] = useState(null); 
  const [totpCode, setTotpCode] = useState('');
  const [backupCodesSaved, setBackupCodesSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetch2FASetupData = async () => {
      setIsLoading(true);
      setError('');
      try {
        const data = await authService.initiate2FASetup();
        setSetupData(data);
      } catch (err) {
        setError(err.detail || err.message || "Error al iniciar la configuracion de 2FA");
      } finally {
        setIsLoading(false);
      }
    };
    fetch2FASetupData();
  }, []);

  const handleVerifyAndEnable = async (e) => {
    e.preventDefault();
    if (!backupCodesSaved && currentStep === 1) {
        setError("Por favor, confirma que has guardado los codigos de respaldo");
        return;
    }
    if (currentStep === 1 && backupCodesSaved) {
        setCurrentStep(2); 
        setError(''); 
        return;
    }

    if (currentStep === 2) {
        if (!totpCode.match(/^\d{6}$/)) {
            setError("El codigo TOTP debe ser de 6 digitos.");
            return;
        }
        setIsLoading(true);
        setError('');
        setSuccessMessage('');
        try {
            const verificationData = {
                totp_secret: setupData.totp_secret,
                totp_code: totpCode,
                backup_codes: setupData.backup_codes,
            };
            const response = await authService.verifyAndEnable2FA(verificationData);
            setSuccessMessage(response.detail || "¡2FA habilitada exitosamente!");
            if (on2FAEnabled) on2FAEnabled(); 

        } catch (err) {
            setError(err.detail || err.message || "Error al habilitar 2FA");
        } finally {
            setIsLoading(false);
        }
    }
  };

  if (isLoading && !setupData) {
    return <p className="text-center dark:text-gray-300">Cargando configuración 2FA...</p>;
  }

  if (error && !setupData && currentStep === 1) { 
    return <div className="text-red-500 text-sm p-4 bg-red-50 dark:bg-red-900 dark:text-red-200 rounded-md">{error}</div>;
  }
  
  if (!setupData && currentStep === 1) {
      return null; 
  }

  return (
    <div className="mt-6 p-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Configurar Autenticación de Dos Factores
      </h3>
      {error && <p className="text-red-500 text-sm text-center mb-4 p-2 bg-red-100 dark:bg-red-800 dark:text-red-200 rounded">{error}</p>}
      {successMessage && <p className="text-green-600 text-sm text-center mb-4 p-2 bg-green-100 dark:bg-green-800 dark:text-green-200 rounded">{successMessage}</p>}

      {!successMessage && setupData && (
        <form onSubmit={handleVerifyAndEnable}>
          {currentStep === 1 && (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                1. Escanea este codigo QR con tu aplicacion de autenticacion (como Google Authenticator, Authy, etc.):
              </p>
              <div className="flex justify-center my-4">
                <img src={setupData.qr_code_image} alt="Código QR para 2FA" className="border dark:border-gray-500" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                O ingresa manualmente la siguiente clave secreta:
              </p>
              <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-600 rounded mb-4">
                <span className="font-mono text-sm break-all">{setupData.totp_secret}</span>
                <CopyToClipboardButton textToCopy={setupData.totp_secret} />
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 mb-2 font-semibold">
                2. Guarda estos codigos de respaldo en un lugar seguro.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                Si pierdes acceso a tu aplicacion de autenticación, podras usar uno de estos códigos para ingresar. Cada codigo solo puede usarse una vez.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-gray-100 dark:bg-gray-600 rounded mb-4 text-center">
                {setupData.backup_codes.map((code) => (
                  <span key={code} className="font-mono text-sm p-1">{code}</span>
                ))}
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="backupCodesSaved"
                  checked={backupCodesSaved}
                  onChange={(e) => setBackupCodesSaved(e.target.checked)}
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="backupCodesSaved" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  He guardado mis códigos de respaldo de forma segura
                </label>
              </div>
               <Button type="submit" className="w-full mb-2" disabled={isLoading || !backupCodesSaved}>
                {isLoading ? 'Cargando...' : 'Continuar a Verificación'}
              </Button>
            </>
          )}

          {currentStep === 2 && (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                3. Ingresa el código de 6 digitos de tu aplicacion de autenticación para verificar y habilitar 2FA:
              </p>
              <div>
                <label htmlFor="totpCode" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Codigo TOTP</label>
                <input
                  type="text"
                  id="totpCode"
                  name="totpCode"
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, '').slice(0,6))} 
                  maxLength="6"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="123456"
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full mt-4 mb-2" disabled={isLoading || totpCode.length !== 6}>
                {isLoading ? 'Verificando...' : 'Verificar y Habilitar 2FA'}
              </Button>
            </>
          )}
          <Button type="button" variant="secondary" onClick={onCancel} className="w-full" disabled={isLoading}>
            Cancelar
          </Button>
        </form>
      )}
    </div>
  );
}

export default TwoFactorAuthSetup;