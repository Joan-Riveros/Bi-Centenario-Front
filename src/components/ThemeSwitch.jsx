import React from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

function ThemeSwitch() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex justify-center items-center">
            <label className="relative inline-flex items-center cursor-pointer group">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                />
                <div className="w-16 h-9 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-gray-900 peer-checked:to-gray-600 transition-all duration-500 shadow-inner group-hover:scale-105">
                </div>
                <div className="absolute left-1 top-1 w-7 h-7 bg-white rounded-full shadow-md transition-all duration-500 peer-checked:translate-x-7 peer-checked:bg-gradient-to-br peer-checked:from-zinc-800 peer-checked:to-gray-500">
                </div>
            </label>
        </div>
    );
}

export default ThemeSwitch;
