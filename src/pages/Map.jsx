import React, { useState } from 'react';
import { MapPin, Search, Navigation, Layers, Info } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { cn } from '../lib/utils';

const Map = () => {
    const [activePin, setActivePin] = useState(1);

    const locations = [
        { id: 1, x: '50%', y: '40%', title: 'Tokyo Skytree', type: 'Attraction' },
        { id: 2, x: '30%', y: '60%', title: 'Senso-ji Temple', type: 'Culture' },
        { id: 3, x: '70%', y: '55%', title: 'TeamLab Planets', type: 'Art' },
    ];

    return (
        <div className="relative w-full h-[calc(100vh-100px)] -m-4 md:-m-8 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Mock Map Background */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-60 hover:opacity-70 transition-opacity duration-700"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1774&q=80")' }}
            >
                <div className="absolute inset-0 bg-bg-dark/40 backdrop-grayscale-[0.5]"></div>
            </div>

            {/* Floating Header */}
            <div className="absolute top-6 left-6 right-6 md:left-12 md:right-auto flex gap-4 z-20">
                <div className="relative flex-1 md:w-80">
                    <Search className="absolute left-3 top-3 text-text-secondary" size={20} />
                    <input
                        type="text"
                        placeholder="Search places..."
                        className="w-full bg-bg-card/80 backdrop-blur-md border border-white/10 pl-10 pr-4 py-2.5 rounded-xl text-white placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-cyan-500/50 shadow-glass"
                    />
                </div>
                <Button variant="secondary" size="icon" className="shadow-glass bg-bg-card/80">
                    <Layers size={20} />
                </Button>
            </div>

            {/* Pins */}
            {locations.map((loc) => (
                <button
                    key={loc.id}
                    onClick={() => setActivePin(loc.id)}
                    className="absolute z-10 group"
                    style={{ left: loc.x, top: loc.y, transform: 'translate(-50%, -100%)' }}
                >
                    <div className={cn(
                        "relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 shadow-glow",
                        activePin === loc.id
                            ? "bg-cyan-500 border-white scale-110"
                            : "bg-bg-dark/80 border-cyan-500/50 hover:scale-105"
                    )}>
                        <MapPin size={24} className={cn(
                            activePin === loc.id ? "text-white" : "text-cyan-400"
                        )} fill={activePin === loc.id ? "currentColor" : "none"} />

                        {activePin === loc.id && (
                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-500 rotate-45 transform origin-center -z-10"></span>
                        )}
                    </div>

                    <div className={cn(
                        "absolute bottom-full mb-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 bg-bg-dark/90 backdrop-blur-md rounded-lg text-xs font-medium text-white shadow-lg pointer-events-none transition-all duration-300",
                        activePin === loc.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    )}>
                        {loc.title}
                    </div>
                </button>
            ))}

            {/* Bottom Card for Active Pin */}
            <div className="absolute bottom-6 left-6 right-6 md:w-96 md:left-auto md:right-6 z-20">
                <Card className="bg-bg-card/90 backdrop-blur-xl border-t border-white/20 shadow-2xl animate-fade-in">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <Badge variant="accent" className="mb-2">Attraction</Badge>
                            <h2 className="text-xl font-bold text-white">Tokyo Skytree</h2>
                            <p className="text-sm text-text-secondary">Tallest tower in the world.</p>
                        </div>
                        <div className="bg-bg-dark/50 p-2 rounded-lg">
                            <Navigation size={20} className="text-cyan-400" />
                        </div>
                    </div>

                    <div className="flex gap-4 mb-4">
                        <img
                            src="https://images.unsplash.com/photo-1545569384-6031659841f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                            className="w-20 h-20 rounded-lg object-cover border border-white/10"
                            alt="Attraction"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                            className="w-20 h-20 rounded-lg object-cover border border-white/10"
                            alt="View"
                        />
                    </div>

                    <Button className="w-full shadow-glow">
                        Get Directions
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default Map;
