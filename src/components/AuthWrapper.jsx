import React from 'react';
import fondoVideo from '../assets/fondoHome.mp4';

function AuthWrapper({ children }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-blue-900 dark:via-gray-800 dark:to-purple-900 transition-all duration-[4000ms] bg-[length:400%_400%] animate-gradient font-sans">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover -z-10"
            >
                <source src={fondoVideo} type="video/mp4" />
            </video>

            <div className="flex items-center justify-center min-h-screen p-6 relative z-10 w-full">
                {children}
            </div>
        </div>
    );
}

export default AuthWrapper;