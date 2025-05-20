import React from 'react';
import clsx from 'clsx';

function Button({
    children,
    onClick,
    type = 'button',
    className = '',
    variant = 'primary',
    disabled = false,
}) {
    const variants = {
        primary: {
            color: 'bg-primary',
            border: 'border-secondary',
            shadow: 'shadow-secondary',
        },
        contrast: {
            color: 'bg-white dark:bg-base',
            border: 'border-gray-300 dark:border-gray-600',
            shadow: 'shadow-md',
        },
        neutral: {
            color: 'bg-gray-200 dark:bg-black',
            border: 'border-gray-300 dark:border-gray-700',
            shadow: 'shadow-md dark:shadow',
        },
    };

    const { color, border, shadow } = variants[variant] || variants.primary;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                'cursor-pointer transition-all px-6 py-2 rounded-lg font-medium',
                color,
                'text-black dark:text-white',
                border,
                'border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]',
                'active:border-b-[2px] active:brightness-90 active:translate-y-[2px]',
                `hover:shadow-xl active:shadow-none ${shadow}`,
                disabled && 'opacity-50 cursor-not-allowed',
                className
            )}
        >
            {children}
        </button>
    );
}

export default Button;