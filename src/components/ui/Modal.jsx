import React from 'react';
import { FiX } from 'react-icons/fi';

function Modal({ isOpen, onClose, title, children, footer }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-300 ease-in-out">
            <div className="bg-white dark:bg-darkSecondary rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
                <div className="flex justify-between items-center p-4 sm:p-6 border-b dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        aria-label="Cerrar modal"
                    >
                        <FiX size={24} />
                    </button>
                </div>
                <div className="p-4 sm:p-6 overflow-y-auto">
                    {children}
                </div>
                {footer && (
                    <div className="p-4 sm:p-6 border-t dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Modal;