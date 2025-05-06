import React from 'react';
import clsx from 'clsx';

function Button({
    children,
    onClick,
    type = 'button',
    className = '',
    color = 'bg-gray-700',
    shadow = 'shadow-green-300',
    border = 'border-green-400',
}) {
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
