import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

const Layout = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/';

    if (isLoginPage) {
        return <Outlet />;
    }

    return (
        <div className="min-h-screen bg-bg-dark text-text-primary flex">
            <Sidebar />
            <main className="flex-1 md:ml-64 pb-20 md:pb-0 relative overflow-x-hidden">
                {/* Background Gradients */}
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 rounded-full blur-[120px]" />
                </div>

                <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen animate-fade-in">
                    <Outlet />
                </div>
            </main>
            <MobileNav />
        </div>
    );
};

export default Layout;
