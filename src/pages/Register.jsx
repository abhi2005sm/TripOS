import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Plane } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const toast = useToast();

    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = 'Name is required';
        if (!form.email.trim()) errs.email = 'Email is required';
        if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
        if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
        return errs;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        setErrors({});
        setIsLoading(true);
        try {
            await register(form.name, form.email, form.password);
            toast.success('Account created! Welcome to TripOS 🚀');
            navigate('/new-journey');
        } catch (err) {
            const msg = err?.response?.data?.message || 'Registration failed. Please try again.';
            setErrors({ api: msg });
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-bg-dark">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-cyan-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2021&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
            </div>

            <div className="w-full max-w-md p-4 relative z-10 animate-fade-in">
                <Card className="border-white/10 shadow-2xl backdrop-blur-xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                            <Plane className="text-white transform -rotate-45" size={32} />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                        <p className="text-text-secondary">Start your journey with TripOS</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5">
                        <Input
                            label="FULL NAME"
                            type="text"
                            placeholder="Your full name"
                            icon={User}
                            value={form.name}
                            onChange={set('name')}
                            error={errors.name}
                            required
                            autoComplete="name"
                        />
                        <Input
                            label="EMAIL"
                            type="email"
                            placeholder="you@example.com"
                            icon={Mail}
                            value={form.email}
                            onChange={set('email')}
                            error={errors.email}
                            required
                            autoComplete="email"
                        />
                        <Input
                            label="PASSWORD"
                            type="password"
                            placeholder="Min. 6 characters"
                            icon={Lock}
                            value={form.password}
                            onChange={set('password')}
                            error={errors.password}
                            required
                            autoComplete="new-password"
                        />
                        <Input
                            label="CONFIRM PASSWORD"
                            type="password"
                            placeholder="Repeat your password"
                            icon={Lock}
                            value={form.confirm}
                            onChange={set('confirm')}
                            error={errors.confirm}
                            required
                            autoComplete="new-password"
                        />

                        {errors.api && (
                            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 animate-fade-in">
                                {errors.api}
                            </div>
                        )}

                        <Button type="submit" className="w-full py-3 text-base shadow-glow" isLoading={isLoading}>
                            {isLoading ? 'Creating account…' : 'Create Account'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-text-secondary">
                            Already have an account?{' '}
                            <Link to="/" className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Register;
