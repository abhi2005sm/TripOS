import React, { useState } from 'react';
import { Bell, Shield, Globe, CreditCard, Moon, Smartphone, ChevronRight, LogOut, CheckCircle, DollarSign } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge'; // Corrected import path (was missing ..)
import Button from '../components/ui/Button';
import { cn } from '../lib/utils'; // Corrected import path

const Settings = () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const [currency, setCurrency] = useState('INR (₹)');

    const toggleCurrency = () => {
        const currencies = ['INR (₹)', 'USD ($)', 'EUR (€)', 'GBP (£)'];
        const currentIndex = currencies.indexOf(currency);
        const nextIndex = (currentIndex + 1) % currencies.length;
        setCurrency(currencies[nextIndex]);
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
                { icon: Globe, label: 'Language', value: 'English (US)' },
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
                                        } else if (item.action) {
                                            item.action();
                                        } else {
                                            if (item.label === 'Sign Out') return;
                                            alert(`Navigating to ${item.label} settings...`);
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
                                            <div className={cn(
                                                "w-11 h-6 rounded-full transition-colors relative",
                                                item.state ? "bg-cyan-500" : "bg-bg-dark border border-white/10"
                                            )}>
                                                <div className={cn(
                                                    "absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm",
                                                    item.state ? "translate-x-5" : "translate-x-0"
                                                )} />
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
                    onClick={() => window.location.href = '/'}
                >
                    <LogOut size={18} />
                    Sign Out
                </Button>
                <p className="text-center text-xs text-text-secondary mt-4">
                    TripOS v1.0.0 • Build 2024.10.12
                </p>
            </div>
        </div>
    );
};

export default Settings;
