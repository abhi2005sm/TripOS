import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { cn } from '../lib/utils';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 4000) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    const dismiss = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const toast = {
        success: (msg, dur) => addToast(msg, 'success', dur),
        error: (msg, dur) => addToast(msg, 'error', dur),
        info: (msg, dur) => addToast(msg, 'info', dur),
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
                {toasts.map(t => (
                    <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
};

const styles = {
    success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    error: 'border-red-500/30 bg-red-500/10 text-red-400',
    info: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
};

const ToastItem = ({ toast, onDismiss }) => {
    const Icon = icons[toast.type];
    return (
        <div
            className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl pointer-events-auto min-w-[260px] max-w-sm animate-fade-in',
                'bg-bg-card/90',
                styles[toast.type]
            )}
        >
            <Icon size={18} className="flex-shrink-0" />
            <p className="text-sm font-medium text-white flex-1">{toast.message}</p>
            <button
                onClick={() => onDismiss(toast.id)}
                className="text-white/40 hover:text-white transition-colors flex-shrink-0"
            >
                <X size={14} />
            </button>
        </div>
    );
};

export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
    return ctx;
};
