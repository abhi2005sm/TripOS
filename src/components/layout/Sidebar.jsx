import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, CreditCard, User, Settings, PlusCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

const Sidebar = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Timeline', path: '/timeline' },
        { icon: CreditCard, label: 'Budget', path: '/budget' },
        { icon: Map, label: 'Map', path: '/map' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 border-r border-white/5 bg-bg-dark/50 backdrop-blur-xl z-50">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                    TripOS
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                <NavLink
                    to="/new-journey"
                    className={({ isActive }) => cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 mb-6 group",
                        isActive
                            ? "bg-gradient-to-r from-blue-600/20 to-cyan-500/20 text-cyan-400 shadow-glow border border-cyan-500/20"
                            : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg hover:shadow-glow hover:scale-[1.02]"
                    )}
                >
                    <PlusCircle size={20} />
                    <span className="font-medium">New Journey</span>
                </NavLink>

                <div className="space-y-1">
                    <p className="px-4 text-xs font-medium text-text-secondary/50 uppercase tracking-wider mb-2">Menu</p>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "text-cyan-400 bg-white/5"
                                    : "text-text-secondary hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon size={20} className="relative z-10" />
                            <span className="relative z-10 font-medium">{item.label}</span>
                            {/* Active Indicator Line */}
                            <div className={cn(
                                "absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 rounded-r transition-all duration-300",
                                item.isActive ? "opacity-100" : "opacity-0"
                            )} />
                        </NavLink>
                    ))}
                </div>
            </nav>

            <div className="p-4 border-t border-white/5">
                <NavLink
                    to="/settings"
                    className={({ isActive }) => cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                        isActive ? "text-cyan-400 bg-white/5" : "text-text-secondary hover:text-white hover:bg-white/5"
                    )}
                >
                    <Settings size={20} />
                    <span className="font-medium">Settings</span>
                </NavLink>
            </div>
        </aside>
    );
};

export default Sidebar;
