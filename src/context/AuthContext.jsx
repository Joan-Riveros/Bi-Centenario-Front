import { createContext, useContext, useState, useEffect, useCallback } from 'react'; 
import { authService as AuthServiceAPI } from '../services/authService';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserFromToken = useCallback(async (currentToken) => {
    if (currentToken) {
      try {
        const decodedToken = jwtDecode(currentToken);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          console.warn("Token expirado, deslogueando");
          localStorage.removeItem('authToken');
          setUser(null);
          setToken(null);
        } else {
          try {

            const userProfile = await AuthServiceAPI.getCurrentUserProfile();
            setUser(userProfile); 
            setToken(currentToken);
 
          } catch (profileError) {
            console.error("AuthContext: Error cargando perfil completo, usando datos basicos del token", profileError);
            setUser({
              email: decodedToken.sub,
              role: decodedToken.role,
            });
            setToken(currentToken);
          }
        }
      } catch (error) {
        console.error("AuthContext: Error decodificando token o token invalido:", error);
        localStorage.removeItem('authToken');
        setUser(null);
        setToken(null);
      }
    }
    setIsLoading(false); 
  }, []);


  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      loadUserFromToken(storedToken);
    } else {
      setIsLoading(false); 
    }
  }, [loadUserFromToken]);

  const login = async (email, password) => {
    try {
      const response = await AuthServiceAPI.login({ email, password });
      if (response.requires2FA && response.challengeData) {
        return {
          success: true,
          requires2FA: true,
          twoFactorToken: response.challengeData.two_factor_token,
        };
      } else if (!response.requires2FA && response.tokenData) {
        const { access_token } = response.tokenData;
        localStorage.setItem('authToken', access_token);

        await loadUserFromToken(access_token); 
        return { success: true, requires2FA: false };
      } else {
        throw new Error("Respuesta inesperada del servicio de login");
      }
    } catch (error) {
      console.error("Login fallido en AuthContext:", error);
      const errorMessage = error.detail || error.message || "Error desconocido durante el login";
      return { success: false, requires2FA: false, error: errorMessage };
    }
  };

  const complete2FALogin = async (accessToken) => { 
    localStorage.setItem('authToken', accessToken);
    await loadUserFromToken(accessToken);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setToken(null);
  };

  /**
   * @param {Object} updatedUserData
   */
  const updateAuthContextUser = (updatedFields) => {
    setUser(prevUser => {
      if (!prevUser) return null;
      return { ...prevUser, ...updatedFields };
    });
  };

  const value = {
    user,
    token,
    isLoading, 
    login,
    logout,
    complete2FALogin,
    updateAuthContextUser,
    isAuthenticated: !!token && !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children} 
    </AuthContext.Provider>
  );
}