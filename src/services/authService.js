import apiClient from './api';

/**
 * @typedef {Object} LoginCredentials
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} AccessTokenResponse
 * @property {string} access_token
 * @property {string} token_type
 */

/**
 * @typedef {Object} TwoFactorChallengeResponse
 * @property {string} detail
 * @property {string} two_factor_token
 */

/**
 * @typedef {Object} LoginResponse
 * @property {AccessTokenResponse} [tokenData] 
 * @property {TwoFactorChallengeResponse} [challengeData] 
 * @property {boolean} requires2FA 
 */

/**
 * 
 * @param {LoginCredentials} credentials 
 * @returns {Promise<LoginResponse>} 
 */
const login = async (credentials) => {
  try {
    const response = await apiClient.post('/users/login', credentials);

    if (response.data && response.data.two_factor_token) {
      return {
        challengeData: response.data, 
        requires2FA: true,
      };
    } else if (response.data && response.data.access_token) {
      //
      localStorage.setItem("authToken", response.data.access_token);
      //
      return {
        tokenData: response.data, 
        requires2FA: false,
      };
    } else {
      throw new Error("Respuesta inesperada del servidor durante el login");
    }
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error.response?.data || { message: error.message || "Error de red o servidor" };
  }
};

/**
 * @typedef {Object} TwoFactorVerificationData
 * @property {string} two_factor_token
 * @property {string} [totp_code]
 * @property {string} [backup_code]
 * @property {boolean} [remember_device]
 */

/**
 * 
 * @param {TwoFactorVerificationData} verificationData
 * @returns {Promise<AccessTokenResponse>} 
 */
const verify2FALogin = async (verificationData) => {
  try {
    const response = await apiClient.post('/users/2fa/verify-login', verificationData);
    return response.data;
  } catch (error) {
    console.error('2FA Verification error:', error.response?.data || error.message);
    throw error.response?.data || { message: error.message || "Error de red o servidor" };
  }
};

/**
 * @typedef {Object} UserRegistrationData
 * @property {string} email
 * @property {string} nombre
 * @property {string} password
 */

/**
 * @typedef {Object} UserOut
 * @property {number} id
 * @property {string} email
 * @property {string} nombre
 * @property {boolean} is_active
 */

/**
 * 
 * @param {UserRegistrationData} userData
 * @returns {Promise<UserOut>} 
 */
const register = async (userData) => {
  try {
    const response = await apiClient.post('/users/register', userData);
    return response.data; 
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error.response?.data || { message: error.message || "Error de red o servidor" };
  }
};

/**
 * @typedef {Object} UserProfileData
 * @property {number} id
 * @property {string} email
 * @property {string} nombre
 * @property {string} role
 * @property {boolean} is_active
 * @property {boolean} is_2fa_enabled
 */

/**
 * @returns {Promise<UserProfileData>}
 */
const getCurrentUserProfile = async () => {
  try {
    const response = await apiClient.get('/users/me/profile'); 
    return response.data;
  } catch (error) {
    console.error('Get current user profile error:', error.response?.data || error.message);
    throw error.response?.data || { message: error.message || "Error al obtener el perfil del usuario" };
  }
};

/**
 * @typedef {Object} TwoFactorSetupInitiateResponse
 * @property {string} otpauth_uri
 * @property {string} totp_secret
 * @property {string} qr_code_image
 * @property {string[]} backup_codes
 */

/**

 * @returns {Promise<TwoFactorSetupInitiateResponse>}
 */
const initiate2FASetup = async () => {
  try {
    const response = await apiClient.post('/users/me/2fa/initiate-setup');
    return response.data;
  } catch (error) {
    console.error('Initiate 2FA setup error:', error.response?.data || error.message);
    throw error.response?.data || { message: error.message || "Error al iniciar la configuracion de 2FA" };
  }
};

/**
 * @typedef {Object} TwoFactorSetupVerifyEnableRequest
 * @property {string} totp_secret
 * @property {string} totp_code
 * @property {string[]} backup_codes
 */

/**
 
 * @param {TwoFactorSetupVerifyEnableRequest} verificationData
 * @returns {Promise<{detail: string}>} 
 */
const verifyAndEnable2FA = async (verificationData) => {
  try {
    const response = await apiClient.post('/users/me/2fa/verify-enable', verificationData);
    return response.data;
  } catch (error) {
    console.error('Verify and Enable 2FA error:', error.response?.data || error.message);
    throw error.response?.data || { message: error.message || "Error al verificar y habilitar 2FA" };
  }
};

/**
 * @typedef {Object} TwoFactorDisableResponse
 * @property {string} detail
 */

/**
 
 * @returns {Promise<TwoFactorDisableResponse>}
 */
const disable2FA = async () => {
  try {
    const response = await apiClient.post('/users/me/2fa/disable');
    return response.data;
  } catch (error) {
    console.error('Disable 2FA error:', error.response?.data || error.message);
    throw error.response?.data || { message: error.message || "Error al deshabilitar 2FA" };
  }
};


//recuperacion contrase;a
/**
 * @param {string} email 
 * @returns {Promise<{msg: string}>} 
 */
const requestPasswordReset = async (email) => {
  try {
    const response = await apiClient.post('/users/password-recovery', { email });
    
    return response.data;
  } catch (error) {
    console.error('Request password reset error:', error.response?.data || error.message);
    throw error.response?.data || { message: error.message || "Error al solicitar el reseteo de contraseña" };
  }
};

/**
 * @param {string} token 
 * @param {string} newPassword 
 * @returns {Promise<{msg: string}>} 
 */
const confirmPasswordReset = async (token, newPassword) => {
  try {
    const response = await apiClient.post('/users/reset-password', { token, new_password: newPassword });
    
    return response.data;
  } catch (error) {
    console.error('Confirm password reset error:', error.response?.data || error.message);
    throw error.response?.data || { message: error.message || "Error al restablecer la contraseña" };
  }
};


/**
 * @typedef {Object} UserProfileUpdateData
 * @property {string} [nombre] 
 * @property {string} [email] - no permitido
 */
/**
 * @param {UserProfileUpdateData} profileData 
 * @returns {Promise<UserProfileData>} 
 */
const updateUserProfile = async (profileUpdateData) => {
  try {
    const response = await apiClient.put('/users/me', profileUpdateData);
    return response.data;
  } catch (error) {
    console.error('Update user profile error:', error.response?.data || error.message);
    throw error.response?.data || { message: error.message || "Error al actualizar el perfil" };
  }
};

export const authService = {
  login,
  register,
  verify2FALogin,
  getCurrentUserProfile, 
  initiate2FASetup,
  verifyAndEnable2FA,
  disable2FA,
  requestPasswordReset,
  confirmPasswordReset,
  updateUserProfile, 
};