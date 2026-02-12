import React from 'react';
import { cn } from '../../lib/utils';

const Card = ({ children, className, hover = false, ...props }) => {
    return (
        <div
            className={cn(
                'bg-bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 relative overflow-hidden',
                hover && 'hover:bg-bg-card/60 hover:border-white/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
                className
            )}
            {...props}
        >
            <div className="relative z-10">{children}</div>
        </div>
    );
};

export default Card;
