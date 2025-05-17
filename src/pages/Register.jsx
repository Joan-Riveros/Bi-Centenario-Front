import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import AuthWrapper from '../components/AuthWrapper.jsx';
import Button from '../components/Button';
import { authService } from '../services/authService';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(prev => !prev);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    if (!formData.nombre || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Todos los campos son obligatorios.');
      setIsLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setIsLoading(false);
      return;
    }
    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      setIsLoading(false);
      return;
    }
    if (!formData.termsAccepted) {
      setError('Debes aceptar los Terminos y Condiciones');
      setIsLoading(false);
      return;
    }

    try {
      const userData = {
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
      };

      const registeredUser = await authService.register(userData);

      if (registeredUser && registeredUser.id) {
        setSuccessMessage('¡Registro exitoso! Serás redirigido a la página de inicio de sesipn');
        setFormData({ 
          nombre: '', email: '', password: '', confirmPassword: '', termsAccepted: false,
        });
        setTimeout(() => {
          navigate('/login'); 
        }, 2000);
      } else {

        setError('Hubo un problema con el registro. Intentalo de nuevo');
      }
    } catch (err) {
      console.error("Error en el registro:", err);
      let errorMessage = 'Error al registrar el usuario. Verifica los datos e inténtalo de nuevo';


      if (err && err.detail) {
        errorMessage = err.detail;
      } else if (err && err.response && err.response.data && err.response.data.detail && Array.isArray(err.response.data.detail)) {

        errorMessage = err.response.data.detail
          .map(d => `${d.loc[d.loc.length - 1]}: ${d.msg}`) 
          .join('; ');
      } else if (err && err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <h2 className="text-2xl font-bold text-center text-primary dark:text-accent mb-6">
        Crear Cuenta
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm text-center mb-4">{successMessage}</p>}

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Nombre Completo</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-base dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Tu nombre completo"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-primary dark:text-accent">
            Correo Electrónico
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-base dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
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
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-base dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Mínimo 8 caracteres"
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-8 right-1 text-gray-600 dark:text-gray-300"
            disabled={isLoading}
          >
            {showPassword ? <HiEyeOff size={23} /> : <HiEye size={23} />}
          </button>
        </div>

        <div className="relative">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Confirmar Contraseña</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-base dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="********"
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute top-8 right-1 text-gray-600 dark:text-gray-300"
            disabled={isLoading}
          >
            {showConfirmPassword ? <HiEyeOff size={23} /> : <HiEye size={23} />}
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="termsAccepted"
            id="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            required
            disabled={isLoading}
          />
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Acepto los <a href="#" className="text-primary hover:text-primary-hover">Términos y Condiciones</a>.
          </label>
        </div>

        <Button
          type="submit"
          className="w-full py-3 text-base" 
          disabled={isLoading}
        >
          {isLoading ? 'Registrando...' : 'Registrarse'}
        </Button>

        <div className="text-center mt-4 text-sm text-gray-700 dark:text-gray-300">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-primary hover:text-primary-hover">
            Inicia Sesión
          </Link>
        </div>

        <Link to="/" className="block text-center mt-4 text-sm text-primary hover:text-primary-hover transition-colors">
          ⬅️ Volver a Home
        </Link>
      </form>
    </AuthWrapper>
  );
}

export default Register;