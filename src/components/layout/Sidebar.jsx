import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, CreditCard, User, Settings, PlusCircle, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const { user } = useAuth();

    const navItems = [
        { icon: LayoutDashboard, label: 'Timeline', path: '/timeline' },
        { icon: CreditCard, label: 'Budget', path: '/budget' },
        { icon: Map, label: 'Map', path: '/map' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    const avatar = user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'T')}&background=0ea5e9&color=fff`;

    return (
        <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 border-r border-white/5 bg-bg-dark/50 backdrop-blur-xl z-50">
            <div className="p-6 mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center shadow-glow">
                        <span className="text-white font-black text-xl transform -rotate-12">T</span>
                    </div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                        TripOS
                    </h1>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-6">
                <div>
                    <NavLink
                        to="/new-journey"
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                            isActive
                                ? "bg-gradient-to-r from-blue-600/20 to-cyan-500/20 text-cyan-400 shadow-glow border border-cyan-500/20"
                                : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg hover:shadow-glow hover:scale-[1.02]"
                        )}
                    >
                        <PlusCircle size={20} />
                        <span className="font-medium">New Journey</span>
                    </NavLink>
                </div>

                <div className="space-y-1">
                    <p className="px-4 text-[10px] font-bold text-text-secondary/40 uppercase tracking-[0.2em] mb-3">Principal</p>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "text-cyan-400 bg-white/5 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]"
                                    : "text-text-secondary hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon size={20} className="relative z-10" />
                            <span className="relative z-10 font-medium">{item.label}</span>

                            {/* Active Indicator Line */}
                            <NavLink to={item.path}>
                                {({ isActive }) => (
                                    <div className={cn(
                                        "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-500 rounded-r-full transition-all duration-300",
                                        isActive ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                                    )} />
                                )}
                            </NavLink>
                        </NavLink>
                    ))}
                </div>
            </nav>

            <div className="p-4 space-y-2 border-t border-white/5">
                <NavLink
                    to="/settings"
                    className={({ isActive }) => cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors mb-2",
                        isActive ? "text-cyan-400 bg-white/5" : "text-text-secondary hover:text-white hover:bg-white/5"
                    )}
                >
                    <Settings size={20} />
                    <span className="font-medium">Settings</span>
                </NavLink>

                {/* User Profile Card */}
                <div className="p-2 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3 p-2">
                        <img
                            src={avatar}
                            alt={user?.name}
                            className="w-10 h-10 rounded-xl object-cover ring-2 ring-white/10"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">{user?.name || 'Traveler'}</p>
                            <p className="text-[10px] text-text-secondary truncate">{user?.email || 'Pro Member'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
