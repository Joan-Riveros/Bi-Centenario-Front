import React from 'react';
import clsx from 'clsx';

function Button({
    children,
    onClick,
    type = 'button',
    className = '',
    variant = 'primary',
}) {
    const variants = {
        primary: {
            color: 'bg-gray-900',
            border: 'border-green-400',
            shadow: 'shadow-green-300',
        },
        login: {
            color: 'bg-primary',
            border: 'border-orange-500',
            shadow: 'shadow-orange-300',
        },
        danger: {
            color: 'bg-red-600',
            border: 'border-red-500',
            shadow: 'shadow-red-300',
        },
        success: {
            color: 'bg-green-600',
            border: 'border-green-500',
            shadow: 'shadow-green-300',
        },
        neutral: {
            color: 'bg-gray-500',
            border: 'border-gray-400',
            shadow: 'shadow-gray-300',
        },
    };

    const { color, border, shadow } = variants[variant] || variants.primary;

    return (
        <button
            type={type}
            onClick={onClick}
            className={clsx(
                'cursor-pointer transition-all px-6 py-2 rounded-lg text-white font-medium',
                color,
                border,
                'border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]',
                'active:border-b-[2px] active:brightness-90 active:translate-y-[2px]',
                `hover:shadow-xl active:shadow-none ${shadow}`,
                className
            )}
        >
            {children}
        </button>
    );
}

export default Button;
