import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Plane, Sparkles, Shield, BarChart3, Map as MapIcon, Globe, ChevronRight, Apple, Play } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-bg-dark text-white overflow-x-hidden">
            {/* Header / Nav */}
            <nav className="fixed top-0 w-full z-50 bg-bg-dark/50 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center shadow-glow">
                            <Plane className="text-white transform -rotate-45" size={20} />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">TripOS</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
                        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">Sign In</Link>
                        <Button size="sm" onClick={() => navigate('/register')}>Get Started</Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                </div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-8 animate-fade-in">
                        <Sparkles size={14} />
                        <span>NEXT-GEN AI TRAVEL ASSISTANT</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                        Plan Your Next Adventure <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                            with AI Precision.
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
                        The world's first operating system for travelers.
                        Generate hyper-realistic itineraries, track budgets in real-time,
                        and discover hidden gems using custom-trained AI models.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                        <Button size="lg" className="h-14 px-8 text-lg shadow-glow-lg group" onClick={() => navigate('/register')}>
                            Start Planning Free
                            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button variant="secondary" size="lg" className="h-14 px-8 text-lg">
                            <Play className="mr-2 fill-current" size={16} />
                            Watch Demo
                        </Button>
                    </div>

                    {/* App Preview Mockup */}
                    <div className="relative max-w-4xl mx-auto group">
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent z-10" />
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity" />
                        <Card className="p-2 border-white/10 shadow-2xl overflow-hidden bg-bg-card/80 backdrop-blur-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                                alt="Dashboard Preview"
                                className="rounded-2xl border border-white/5 opacity-80"
                            />
                        </Card>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Master Your Journey</h2>
                        <p className="text-text-secondary">Everything you need to travel like a professional, powered by science.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Sparkles,
                                title: "AI-Driven Itineraries",
                                desc: "No more generic lists. Get plans tailored to your pace, budget, and niche interests.",
                                color: "text-purple-400"
                            },
                            {
                                icon: BarChart3,
                                title: "Smart Budgeting",
                                desc: "Track every rupee across flights, stay, and street food. Avoid overspending with AI alerts.",
                                color: "text-emerald-400"
                            },
                            {
                                icon: MapIcon,
                                title: "Interactive Mapping",
                                desc: "Visualize your entire route. Save locations offline and sync across all your devices.",
                                color: "text-blue-400"
                            }
                        ].map((f, i) => (
                            <Card key={i} hover className="p-8 border-white/5 bg-bg-card/40">
                                <div className={cn("w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6", f.color)}>
                                    <f.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                                <p className="text-text-secondary leading-relaxed">{f.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="py-24 border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale">
                        <span className="text-2xl font-black italic">Expedia</span>
                        <span className="text-2xl font-black italic">AirBnb</span>
                        <span className="text-2xl font-black italic">Skyscanner</span>
                        <span className="text-2xl font-black italic">TripAdvisor</span>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-32 px-6">
                <div className="max-w-5xl mx-auto">
                    <Card className="p-12 md:p-20 text-center bg-gradient-to-br from-blue-600 to-cyan-500 border-none relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to escape the ordinary?</h2>
                            <p className="text-xl text-white/80 mb-12 max-w-xl mx-auto">
                                Join 50,000+ travelers who have ditched spreadsheets for TripOS.
                            </p>
                            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-white/90 px-12 h-16 text-xl font-bold" onClick={() => navigate('/register')}>
                                Get Started Now
                            </Button>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-white/5 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center">
                                <Plane className="text-white transform -rotate-45" size={16} />
                            </div>
                            <span className="text-xl font-bold">TripOS</span>
                        </div>
                        <p className="text-text-secondary max-w-xs mb-8">
                            Empowering travelers with scientific tools and intelligent automation.
                        </p>
                        <div className="flex gap-4">
                            <Button variant="secondary" size="icon" className="w-10 h-10 rounded-full"><Apple size={18} /></Button>
                            <Button variant="secondary" size="icon" className="w-10 h-10 rounded-full"><Globe size={18} /></Button>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-text-secondary">
                            <li><a href="#" className="hover:text-white">AI Engine</a></li>
                            <li><a href="#" className="hover:text-white">Integrations</a></li>
                            <li><a href="#" className="hover:text-white">Mobile App</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-text-secondary">
                            <li><a href="#" className="hover:text-white">About Us</a></li>
                            <li><a href="#" className="hover:text-white">Careers</a></li>
                            <li><a href="#" className="hover:text-white">Privacy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-xs text-text-secondary">
                    © 2025 TripOS Technologies Pvt. Ltd. Made with ❤️ for world explorers.
                </div>
            </footer>
        </div>
    );
};

export default Landing;
