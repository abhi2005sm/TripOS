import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils';
import Card from './Card';

const Modal = ({ isOpen, onClose, title, children, className }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div
                className="absolute inset-0"
                onClick={onClose}
            />

            <Card className={cn("w-full max-w-md bg-bg-card border border-white/10 shadow-2xl relative z-10 animate-fade-in", className)}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-text-secondary hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </Card>
        </div>,
        document.body
    );
};

export default Modal;
