import React, { useState } from 'react';
import { Bell, Shield, Globe, CreditCard, Moon, Smartphone, ChevronRight, LogOut, DollarSign } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const [currency, setCurrency] = useState('INR (₹)');

    const toggleCurrency = () => {
        const currencies = ['INR (₹)', 'USD ($)', 'EUR (€)', 'GBP (£)'];
        const next = currencies[(currencies.indexOf(currency) + 1) % currencies.length];
        setCurrency(next);
        toast.success(`Currency changed to ${next}`);
    };

    const handleLogout = () => {
        logout();
        toast.success('Signed out successfully.');
        navigate('/');
    };

    const sections = [
        {
            title: 'Account & Security',
            items: [
                { icon: Shield, label: 'Password & Security', value: 'Last changed 3 months ago' },
                { icon: CreditCard, label: 'Payment Methods', value: 'Visa ending in 4242' },
            ]
        },
        {
            title: 'Preferences',
            items: [
                { icon: Globe, label: 'Language', value: 'English (India)' },
                { icon: DollarSign, label: 'Currency', value: currency, action: toggleCurrency },
                { icon: Moon, label: 'Dark Mode', toggle: true, state: darkMode, setState: setDarkMode },
                { icon: Bell, label: 'Notifications', toggle: true, state: notifications, setState: setNotifications },
            ]
        },
        {
            title: 'App Settings',
            items: [
                { icon: Smartphone, label: 'App Icon', value: 'Default' },
            ]
        }
    ];

    return (
        <div className="space-y-8 pb-20 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>

            <div className="space-y-6">
                {sections.map((section, idx) => (
                    <div key={idx} className="space-y-3">
                        <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider pl-2">{section.title}</h2>
                        <Card className="p-0 overflow-hidden divide-y divide-white/5">
                            {section.items.map((item, itemIdx) => (
                                <div
                                    key={itemIdx}
                                    className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer group"
                                    onClick={() => {
                                        if (item.toggle) {
                                            item.setState(!item.state);
                                            toast.info(`${item.label} ${!item.state ? 'enabled' : 'disabled'}`);
                                        } else if (item.action) {
                                            item.action();
                                        } else {
                                            toast.info(`${item.label} settings coming soon!`);
                                        }
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-bg-dark/50 text-text-secondary group-hover:text-white transition-colors">
                                            <item.icon size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{item.label}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {item.value && <span className="text-sm text-text-secondary">{item.value}</span>}
                                        {item.toggle ? (
                                            <div className={cn("w-11 h-6 rounded-full transition-colors relative", item.state ? "bg-cyan-500" : "bg-bg-dark border border-white/10")}>
                                                <div className={cn("absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm", item.state ? "translate-x-5" : "translate-x-0")} />
                                            </div>
                                        ) : (
                                            <ChevronRight size={18} className="text-text-secondary group-hover:text-white" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </Card>
                    </div>
                ))}
            </div>

            <div className="pt-6">
                <Button
                    variant="danger"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleLogout}
                >
                    <LogOut size={18} />
                    Sign Out
                </Button>
                <p className="text-center text-xs text-text-secondary mt-4">
                    TripOS v1.0.0 • © 2025 TripOS Technologies Pvt. Ltd.
                </p>
            </div>
        </div>
    );
};

export default Settings;
