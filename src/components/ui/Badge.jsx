import React from 'react';
import { cn } from '../../lib/utils';

const Badge = ({ children, variant = 'default', className, ...props }) => {
    const variants = {
        default: 'bg-white/10 text-white',
        primary: 'bg-blue-500/20 text-blue-300 border border-blue-500/20',
        success: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/20',
        warning: 'bg-amber-500/20 text-amber-300 border border-amber-500/20',
        accent: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/20',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm',
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
};

export default Badge;
