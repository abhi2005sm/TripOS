import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Plane, Apple } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login delay
        setTimeout(() => {
            setIsLoading(false);
            navigate('/new-journey');
        }, 1500);
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
                        <h1 className="text-3xl font-bold text-white mb-2">Login</h1>
                        <p className="text-text-secondary">Welcome back to TripOS</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-4">
                            <Input
                                label="EMAIL"
                                type="email"
                                placeholder="Enter your email"
                                icon={Mail}
                                required
                            />
                            <Input
                                label="PASSWORD"
                                type="password"
                                placeholder="Enter your password"
                                icon={Lock}
                                required
                            />
                            <div className="flex justify-end">
                                <a href="#" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                                    Forgot?
                                </a>
                            </div>
                        </div>

                        <Button type="submit" className="w-full py-3 text-base shadow-glow" isLoading={isLoading}>
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#161e32] px-2 text-text-secondary">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <Button variant="secondary" className="w-full">
                                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Google
                            </Button>
                            <Button variant="secondary" className="w-full">
                                <Apple className="h-5 w-5 mr-2" fill="currentColor" />
                                Apple
                            </Button>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-text-secondary">
                            Don't have an account? <a href="#" className="text-cyan-400 font-medium hover:text-cyan-300">Sign Up</a>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Login;
