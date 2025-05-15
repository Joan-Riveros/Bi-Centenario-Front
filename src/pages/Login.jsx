import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; 
import { HiEye, HiEyeOff } from 'react-icons/hi';
import AuthWrapper from '../components/AuthWrapper.jsx'; 
import Button from '../components/Button.jsx';         

function Login() {
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);


    const loginResult = await login(email, password);

    setIsLoading(false);

    if (loginResult.success) {
      if (loginResult.requires2FA) {
        navigate('/verify-2fa', {
          state: {
            twoFactorToken: loginResult.twoFactorToken,
            email: email 
          }
        });
      } else {
        navigate('/');
      }
    } else {
      setError(loginResult.error || 'Credenciales incorrectas o error en el login');
    }
  };

  return (
    <AuthWrapper>
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Iniciar Sesión
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Correo Electrónico</label>
          <input
            type="email"
            name="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="ejemplo@correo.com"
            required
            disabled={isLoading}
          />
        </div>

        <div className="relative">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="********"
            required
            disabled={isLoading}
          />
          <button type="button" onClick={togglePasswordVisibility} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 dark:text-gray-300 focus:outline-none" style={{ top: '3.1rem' }} disabled={isLoading}>
            {showPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
          </button>
        </div>

        <div className="text-right">
          <Link to="/recover-password" className="text-sm text-primary hover:text-primary-hover transition-colors">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full py-3 text-base"
          disabled={isLoading}
        >
          {isLoading ? 'Ingresando...' : 'Entrar'}
        </Button>

        <div className="text-center mt-4 text-sm text-gray-700 dark:text-gray-300">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-primary hover:text-primary-hover">Regístrate</Link>
        </div>

        <Link to="/" className="block text-center mt-4 text-sm text-primary hover:text-primary-hover transition-colors">
          ⬅️ Volver a Home
        </Link>
      </form>
    </AuthWrapper>
  );
}

export default Login;