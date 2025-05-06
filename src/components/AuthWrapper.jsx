import React from 'react';
import fondoVideo from '../assets/fondoHome.mp4';

function AuthWrapper({ children }) {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover -z-10"
            >
                <source src={fondoVideo} type="video/mp4" />
            </video>

            {/* Contenido */}
            <div className="flex items-center justify-center min-h-screen p-6 relative z-10">
                <div className="w-full max-w-md bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 rounded-lg shadow-lg p-8 backdrop-blur-sm">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AuthWrapper;
