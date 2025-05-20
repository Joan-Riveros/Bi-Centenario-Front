import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService'; 
import AuthWrapper from '../components/AuthWrapper.jsx'; 
import Button from '../components/Button.jsx'; 
import memoriaAntiqua from '../assets/MomoriaAntiqua.jpg';

function RecoverPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(''); 
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setIsError(false);

        if (!email) {
            setMessage("Por favor, ingresa tu correo electronico");
            setIsError(true);
            setIsLoading(false);
            return;
        }

        try {
            const response = await authService.requestPasswordReset(email);
            setMessage(response.msg); 
            setIsError(false);
            setEmail(''); 
        } catch (err) {
            setMessage(err.detail || err.message || "Ocurrio un error. Intentalo de nuevo");
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthWrapper>
            <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto bg-white dark:bg-base rounded-xl shadow-lg overflow-hidden animate-fadeIn">
                <div className="w-full md:w-1/2">
                    <img
                        src={memoriaAntiqua}
                        alt="Imagen del patrimonio histórico boliviano"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
                        Recuperar Contraseña
                    </h2>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-6">
                        Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
                    </p>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {message && (
                            <p className={`text-sm text-center p-3 rounded-md ${
                                isError ? 'bg-red-50 text-red-700 dark:bg-red-700 dark:text-red-100' 
                                        : 'bg-green-50 text-green-700 dark:bg-green-700 dark:text-green-100'
                            }`}>
                                {message}
                            </p>
                        )}
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Correo Electrónico
                            </label>
                            <input
                                id="email"
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

                        <Button
                            type="submit"
                            className="w-full py-3 text-base" 
                            disabled={isLoading}
                        >
                            {isLoading ? 'Enviando...' : 'Enviar Instrucciones'}
                        </Button>

                        <Link to="/login" className="block text-center mt-4 text-sm text-primary hover:text-primary-hover transition-colors">
                            ⬅️ Volver a Login
                        </Link>
                    </form>
                </div>
            </div>
        </AuthWrapper>
    );
}

export default RecoverPassword;