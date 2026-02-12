import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    isLoading,
    ...props
}) => {
    const variants = {
        primary: 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-glow border-none',
        secondary: 'bg-white/10 text-white hover:bg-white/15 border border-white/5 backdrop-blur-md',
        outline: 'bg-transparent border border-white/20 text-text-primary hover:border-white/40',
        ghost: 'bg-transparent text-text-secondary hover:text-white hover:bg-white/5',
        danger: 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs rounded-lg',
        md: 'px-4 py-2.5 text-sm rounded-xl',
        lg: 'px-6 py-3.5 text-base rounded-xl',
        icon: 'p-2 rounded-xl',
    };

    return (
        <button
            className={cn(
                'inline-flex items-center justify-center font-medium transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
                variants[variant],
                sizes[size],
                className
            )}
            disabled={isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
};

export default Button;
