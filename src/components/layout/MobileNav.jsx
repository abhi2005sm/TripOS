import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, CreditCard, User } from 'lucide-react';
import { cn } from '../../lib/utils';

const MobileNav = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Timeline', path: '/timeline' },
        { icon: CreditCard, label: 'Budget', path: '/budget' },
        { icon: Map, label: 'Map', path: '/map' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-bg-dark/80 backdrop-blur-xl border-t border-white/10 z-50 pb-safe">
            <div className="flex justify-around items-center h-16 px-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => cn(
                            "flex flex-col items-center justify-center w-full h-full space-y-1",
                            isActive ? "text-cyan-400" : "text-text-secondary hover:text-white"
                        )}
                    >
                        {({ isActive }) => (
                            <>
                                <div className={cn(
                                    "p-1.5 rounded-full transition-all duration-300 relative",
                                    isActive && "bg-cyan-500/20 shadow-glow"
                                )}>
                                    <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                    {isActive && <span className="absolute inset-0 bg-cyan-400/20 blur-md rounded-full" />}
                                </div>
                                <span className="text-[10px] font-medium">{item.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default MobileNav;
