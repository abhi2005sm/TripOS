import React from 'react';
import { cn } from '../../lib/utils';

const Input = React.forwardRef(({ className, icon: Icon, label, error, ...props }, ref) => {
    return (
        <div className="w-full space-y-1.5">
            {label && (
                <label className="text-xs font-medium text-text-secondary ml-1">
                    {label}
                </label>
            )}
            <div className="relative group">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-cyan-400 transition-colors">
                        <Icon size={18} />
                    </div>
                )}
                <input
                    className={cn(
                        'w-full bg-bg-card/50 border border-white/10 rounded-xl py-3 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all shadow-sm',
                        Icon ? 'pl-10 pr-4' : 'px-4',
                        error && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
            {error && <p className="text-xs text-red-400 ml-1">{error}</p>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
