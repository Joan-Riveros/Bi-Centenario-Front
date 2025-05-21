import { createContext, useContext, useState, useEffect } from 'react';
import { authService as AuthServiceAPI } from '../services/authService'; 
import { jwtDecode } from 'jwt-decode'; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken')); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);

        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          console.warn("Token expirado, deslogueando");
          logout();
        } else {
          setUser({ email: decodedToken.sub, role: decodedToken.role });
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error decodificando token o token invalido:", error);
        logout(); 
      }
    }
    setIsLoading(false);
  }, []);

  /**
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{success: boolean, requires2FA: boolean, twoFactorToken?: string, error?: string}>}
   */
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
        setToken(access_token);

        try {
          const decodedToken = jwtDecode(access_token);
          console.log("Login directo - Decoded token role:", decodedToken.role);
          setUser({ email: decodedToken.sub, role: decodedToken.role }); 
        } catch (error) {
          console.error("Error decodificando token despues del login:", error);

        }
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

  /**
   * @param {string} accessToken 
   */
  const complete2FALogin = (accessToken) => {
    localStorage.setItem('authToken', accessToken);
    setToken(accessToken);
    try {
      const decodedToken = jwtDecode(accessToken);
      setUser({ email: decodedToken.sub, role: decodedToken.role }); 
    } catch (error) {
      console.error("Error decodificando token despues de 2FA:", error);

    }
  };


  const logout = () => {

    localStorage.removeItem('authToken');
    setUser(null);
    setToken(null);
    // Redirección a la página de login aqui si es necesario
    // window.location.href = '/login'; 
  };

  const updateAuthContextUser = (newUserData) => {
    setUser(prev => ({ ...prev, ...newUserData }));
  };

  const value = {
    user,
    token,
    isLoading, 
    login,
    logout,
    complete2FALogin, 
    isAuthenticated: !!token && !!user, 
    updateAuthContextUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children} {/* Renderizar hijos solo cuando la carga inicial haya terminado */}
    </AuthContext.Provider>
  );
}
