import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, DollarSign, Zap, Clock, Info, Sparkles, Minus, Plus } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { cn } from '../lib/utils';

const NewJourney = () => {
    const navigate = useNavigate();
    const [budget, setBudget] = useState('standard');
    const [pace, setPace] = useState('normal');
    const [travelers, setTravelers] = useState(2);
    const [days, setDays] = useState(7);
    const [aiFeatures, setAiFeatures] = useState({ scheduling: true, gems: false });

    const toggleFeature = (feature) => {
        setAiFeatures(prev => ({ ...prev, [feature]: !prev[feature] }));
    };

    const handleGenerate = () => {
        navigate('/timeline');
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 pb-20">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                    Where to next?
                </h1>
                <p className="text-text-secondary">Enter your details for an AI-powered itinerary.</p>
            </div>

            <Card className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Destination</label>
                        <Input
                            icon={MapPin}
                            placeholder="Search cities (e.g. Goa, Manali)..."
                            className="bg-bg-dark/50"
                        />
                        <Input
                            icon={Zap} // Just a placeholder icon for area
                            placeholder="Specific area (Optional)"
                            className="bg-bg-dark/50"
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Trip Details</label>

                        <Input
                            icon={Calendar}
                            type="date"
                            className="bg-bg-dark/50"
                        />

                        <div className="grid grid-cols-2 gap-4">
                            {/* Duration Input */}
                            <div className="bg-bg-dark/40 border border-white/5 rounded-2xl p-4 flex flex-col gap-3 group hover:border-white/10 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white tracking-wide">Duration</p>
                                        <p className="text-[10px] uppercase tracking-wider text-text-secondary font-medium">Days</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between bg-bg-dark/60 rounded-xl p-1.5 border border-white/5">
                                    <button
                                        onClick={() => setDays(Math.max(1, days - 1))}
                                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-text-secondary hover:text-white transition-all active:scale-95"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="text-lg font-bold text-white font-mono w-8 text-center">{days}</span>
                                    <button
                                        onClick={() => setDays(days + 1)}
                                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-text-secondary hover:text-white transition-all active:scale-95"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Travelers Input */}
                            <div className="bg-bg-dark/40 border border-white/5 rounded-2xl p-4 flex flex-col gap-3 group hover:border-white/10 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white tracking-wide">Travelers</p>
                                        <p className="text-[10px] uppercase tracking-wider text-text-secondary font-medium">People</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between bg-bg-dark/60 rounded-xl p-1.5 border border-white/5">
                                    <button
                                        onClick={() => setTravelers(Math.max(1, travelers - 1))}
                                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-text-secondary hover:text-white transition-all active:scale-95"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="text-lg font-bold text-white font-mono w-8 text-center">{travelers}</span>
                                    <button
                                        onClick={() => setTravelers(travelers + 1)}
                                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-text-secondary hover:text-white transition-all active:scale-95"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Budget Level</label>
                        <span className="text-xs text-text-secondary">Per person / day</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {['economy', 'standard', 'luxury'].map((level) => (
                            <button
                                key={level}
                                onClick={() => setBudget(level)}
                                className={cn(
                                    "flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300",
                                    budget === level
                                        ? "bg-cyan-500/20 border-cyan-500/50 shadow-glow"
                                        : "bg-bg-dark/30 border-white/5 hover:bg-bg-dark/50 hover:border-white/10"
                                )}
                            >
                                <span className="capitalize font-medium text-sm mb-1">{level}</span>
                                <span className="text-xs text-text-secondary">
                                    {level === 'economy' && '₹4,000-8,000'}
                                    {level === 'standard' && '₹12,000-25,000'}
                                    {level === 'luxury' && '₹40,000+'}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Travel Pace</label>
                    <div className="flex p-1 bg-bg-dark/50 rounded-xl border border-white/5">
                        {['relaxed', 'normal', 'fast'].map((p) => (
                            <button
                                key={p}
                                onClick={() => setPace(p)}
                                className={cn(
                                    "flex-1 py-2 text-sm font-medium rounded-lg transition-all capitalize",
                                    pace === p
                                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                                        : "text-text-secondary hover:text-white"
                                )}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>


                <div className="space-y-4">
                    <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">AI Features</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                            onClick={() => toggleFeature('scheduling')}
                            className={cn(
                                "flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-300",
                                aiFeatures.scheduling
                                    ? "bg-blue-500/10 border-blue-500/50 shadow-glow"
                                    : "bg-bg-dark/30 border-white/5 hover:bg-bg-dark/50"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                                    <Clock size={18} />
                                </div>
                                <div className="text-sm">
                                    <p className="font-medium text-white">Smart Scheduling</p>
                                    <p className="text-xs text-text-secondary">Optimize transit times</p>
                                </div>
                            </div>
                            <div className={cn(
                                "w-10 h-6 rounded-full relative transition-colors border",
                                aiFeatures.scheduling ? "bg-cyan-500/20 border-cyan-500/30" : "bg-bg-dark border-white/10"
                            )}>
                                <div className={cn(
                                    "absolute top-1 w-4 h-4 rounded-full shadow-glow transition-all duration-300",
                                    aiFeatures.scheduling ? "right-1 bg-cyan-400" : "left-1 bg-text-secondary"
                                )}></div>
                            </div>
                        </div>

                        <div
                            onClick={() => toggleFeature('gems')}
                            className={cn(
                                "flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-300",
                                aiFeatures.gems
                                    ? "bg-purple-500/10 border-purple-500/50 shadow-glow"
                                    : "bg-bg-dark/30 border-white/5 hover:bg-bg-dark/50"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                                    <Sparkles size={18} />
                                </div>
                                <div className="text-sm">
                                    <p className="font-medium text-white">Hidden Gems</p>
                                    <p className="text-xs text-text-secondary">Include local spots</p>
                                </div>
                            </div>
                            <div className={cn(
                                "w-10 h-6 rounded-full relative transition-colors border",
                                aiFeatures.gems ? "bg-cyan-500/20 border-cyan-500/30" : "bg-bg-dark border-white/10"
                            )}>
                                <div className={cn(
                                    "absolute top-1 w-4 h-4 rounded-full shadow-glow transition-all duration-300",
                                    aiFeatures.gems ? "right-1 bg-cyan-400" : "left-1 bg-text-secondary"
                                )}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <Button onClick={handleGenerate} className="w-full py-4 text-lg font-semibold shadow-glow group">
                        <Sparkles className="mr-2 group-hover:animate-spin" size={20} />
                        Generate Realistic Trip Plan
                    </Button>
                    <p className="text-center text-xs text-text-secondary mt-4 flex items-center justify-center gap-1">
                        <Info size={12} />
                        AI generates plans based on real-time data
                    </p>
                </div>

            </Card>
        </div>
    );
};

export default NewJourney;
