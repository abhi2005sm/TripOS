import React, { useState } from 'react';
import { MapPin, Clock, Coffee, Camera, Train, Moon, Sun, Utensils, ShoppingBag, Waves, Music } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Skeleton from '../components/ui/Skeleton';
import { cn } from '../lib/utils';
import { useToast } from '../context/ToastContext.jsx';

const Timeline = () => {
    const [activeDay, setActiveDay] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();

    React.useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [activeDay]);

    const allItineraries = {
        1: [
            { time: '08:00 AM', title: 'Breakfast at Fort Kochi', description: 'Traditional Kerala breakfast with appam and stew.', type: 'food', icon: Coffee, location: 'Fort Kochi', duration: '1.5h', cost: '₹500' },
            { time: '10:00 AM', title: 'Chinese Fishing Nets', description: 'Iconic cantilevered fishing nets — best viewed at sunrise/sunset.', type: 'activity', icon: Camera, location: 'Fort Kochi', duration: '1h', cost: 'Free' },
            { time: '01:00 PM', title: 'Houseboat Cruise', description: 'Alleppey backwaters cruise with freshly cooked Kerala meals.', type: 'food', icon: Utensils, location: 'Alleppey', duration: '2h', cost: '₹2,500' },
            { time: '04:00 PM', title: 'Sunset at Marari Beach', description: 'Peaceful golden-hour views on a quiet Kerala beach.', type: 'activity', icon: Sun, location: 'Marari', duration: '2h', cost: 'Free' },
        ],
        2: [
            { time: '09:00 AM', title: 'Munnar Tea Gardens', description: 'Scenic hills, mist, and tea-tasting at KDHP estate.', type: 'activity', icon: Camera, location: 'Munnar', duration: '3h', cost: '₹1,200' },
            { time: '01:00 PM', title: 'Spices Farm Tour', description: 'Cardamom, pepper and vanilla plantation walk.', type: 'culture', icon: Sun, location: 'Thekkady', duration: '1.5h', cost: '₹400' },
            { time: '07:00 PM', title: 'Kathakali Performance', description: 'Classical Kerala dance-drama with elaborate costumes.', type: 'culture', icon: Moon, location: 'Thekkady', duration: '2h', cost: '₹800' },
        ],
        3: [
            { time: '08:00 AM', title: 'Drive to Varkala', description: 'Scenic coastal road passing through paddy fields.', type: 'transit', icon: Train, location: 'En Route', duration: '4h', cost: '₹1,500' },
            { time: '01:00 PM', title: 'Varkala Cliff Lunch', description: 'Fresh seafood at a cliff-top restaurant with ocean views.', type: 'food', icon: Utensils, location: 'Varkala Cliff', duration: '1.5h', cost: '₹1,200' },
            { time: '04:00 PM', title: 'Papanasam Beach', description: 'Holy beach known for its mineral springs and surf.', type: 'activity', icon: Waves, location: 'Varkala', duration: '2h', cost: 'Free' },
        ],
        4: [
            { time: '07:00 AM', title: 'Morning Yoga by the Sea', description: 'Guided beach yoga session at sunrise — deeply rejuvenating.', type: 'activity', icon: Sun, location: 'Varkala Beach', duration: '1h', cost: '₹300' },
            { time: '10:00 AM', title: 'Black Beach Exploration', description: 'Hidden black-sand beach accessible only via cliffside trail.', type: 'activity', icon: Camera, location: 'North Cliff', duration: '2h', cost: 'Free' },
            { time: '01:30 PM', title: 'Seafood Thali at Café Del Mar', description: 'Authentic Kerala fish curry and prawn masala.', type: 'food', icon: Utensils, location: 'Varkala', duration: '1h', cost: '₹900' },
            { time: '04:00 PM', title: 'Travel to Thiruvananthapuram', description: 'Bus transfer to the state capital.', type: 'transit', icon: Train, location: 'En Route', duration: '1.5h', cost: '₹200' },
            { time: '07:00 PM', title: 'Padmanabha Swamy Temple', description: 'One of India\'s richest temples — evening darshan.', type: 'culture', icon: Moon, location: 'Trivandrum', duration: '2h', cost: 'Free' },
        ],
        5: [
            { time: '09:00 AM', title: 'Napier Museum', description: 'Stunning Indo-Saracenic architecture housing rare artifacts.', type: 'culture', icon: Camera, location: 'Trivandrum', duration: '1.5h', cost: '₹30' },
            { time: '11:30 AM', title: 'Kovalam Beach', description: 'Famous crescent-shaped beach — last swim of the trip!', type: 'activity', icon: Waves, location: 'Kovalam', duration: '2h', cost: 'Free' },
            { time: '02:00 PM', title: 'Farewell Seafood Feast', description: 'Tiger prawns, lobster and Kerala fish curry — the grand finale.', type: 'food', icon: Utensils, location: 'Kovalam', duration: '1.5h', cost: '₹2,000' },
            { time: '05:00 PM', title: 'Handicrafts Shopping', description: 'Coir, Kasavu sarees, and spice bundles from Government Emporium.', type: 'activity', icon: ShoppingBag, location: 'MG Road', duration: '1.5h', cost: '₹1,500' },
            { time: '09:00 PM', title: 'Departure', description: 'Transfer to Trivandrum International Airport. Safe travels!', type: 'transit', icon: Train, location: 'TRV Airport', duration: '1h', cost: '₹600' },
        ],
    };

    const itinerary = allItineraries[activeDay] || [];

    const dayMeta = {
        1: { label: 'Kochi', emoji: '⚓' },
        2: { label: 'Munnar', emoji: '🍃' },
        3: { label: 'Varkala', emoji: '🏖️' },
        4: { label: 'Trivandrum', emoji: '🛕' },
        5: { label: 'Departure', emoji: '✈️' },
    };

    return (
        <div className="space-y-6 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Kerala Bliss</h1>
                    <p className="text-text-secondary flex items-center gap-2 mt-1">
                        <MapPin size={14} className="text-cyan-400" />
                        5 Days • Oct 12 – Oct 17 • {dayMeta[activeDay].emoji} {dayMeta[activeDay].label}
                    </p>
                </div>
                <div className="flex gap-2 bg-bg-card/50 p-1 rounded-xl w-fit backdrop-blur-sm overflow-x-auto max-w-full">
                    {[1, 2, 3, 4, 5].map((day) => (
                        <button
                            key={day}
                            onClick={() => setActiveDay(day)}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                                activeDay === day
                                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                                    : "text-text-secondary hover:text-white hover:bg-white/5"
                            )}
                        >
                            Day {day}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-6 md:left-[27px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500/50 via-cyan-500/30 to-transparent"></div>

                <div className="space-y-8">
                    {isLoading ? (
                        [1, 2, 3].map((i) => (
                            <div key={i} className="relative pl-16 md:pl-20">
                                <div className="absolute left-3 md:left-[19px] top-6 w-4 h-4 -translate-x-1/2 rounded-full border-2 border-white/5 bg-bg-dark z-10" />
                                <Card className="p-6">
                                    <div className="flex gap-4">
                                        <Skeleton className="w-12 h-12 rounded-xl" />
                                        <div className="flex-1 space-y-3">
                                            <Skeleton className="h-6 w-1/3" />
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-2/3" />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))
                    ) : (
                        itinerary.map((item, index) => (
                            <div key={index} className="relative pl-16 md:pl-20 group">
                                {/* Timeline Node */}
                                <div className={cn(
                                    "absolute left-3 md:left-[19px] top-6 w-6 h-6 md:w-4 md:h-4 -translate-x-1/2 rounded-full border-2 transition-all duration-500 z-10 bg-bg-dark",
                                    index === 0
                                        ? "border-cyan-400 shadow-glow scale-125 bg-cyan-950"
                                        : "border-white/20 group-hover:border-white/50"
                                )}>
                                    {index === 0 && <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-75"></div>}
                                </div>

                                {/* Mobile Time */}
                                <div className="md:hidden absolute left-14 top-0 text-xs font-semibold text-cyan-400 mb-1">{item.time}</div>

                                <Card className={cn(
                                    "relative transition-all duration-300",
                                    index === 0 ? "border-cyan-500/30 bg-bg-card/60" : "hover:bg-bg-card/60"
                                )}>
                                    <div className="flex flex-col md:flex-row gap-4 md:items-start">
                                        <div className="hidden md:block w-24 pt-1 flex-shrink-0">
                                            <span className={cn("text-sm font-semibold", index === 0 ? "text-cyan-400" : "text-text-secondary")}>
                                                {item.time}
                                            </span>
                                        </div>

                                        <div className={cn(
                                            "p-3 rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0",
                                            item.type === 'transit' ? "bg-white/5 text-text-secondary" : "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-cyan-400"
                                        )}>
                                            <item.icon size={20} />
                                        </div>

                                        <div className="flex-1 space-y-2">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-200 transition-colors">{item.title}</h3>
                                                    <p className="text-sm text-text-secondary mt-1 leading-relaxed">{item.description}</p>
                                                </div>
                                                {item.cost && (
                                                    <Badge variant={index === 0 ? 'accent' : 'default'} className="hidden sm:inline-flex flex-shrink-0 ml-2">
                                                        {item.cost}
                                                    </Badge>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-4 text-xs text-text-secondary pt-2">
                                                {item.duration && (
                                                    <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">
                                                        <Clock size={12} />{item.duration}
                                                    </span>
                                                )}
                                                <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">
                                                    <MapPin size={12} />{item.location}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {index === 0 && (
                                        <div className="absolute -right-1 -top-1">
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                                            </span>
                                        </div>
                                    )}
                                </Card>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="pt-4 flex gap-3">
                <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => toast.info('Trip export coming soon!')}
                >
                    Export Itinerary
                </Button>
                <Button
                    className="flex-1 shadow-glow"
                    onClick={() => toast.success('Itinerary saved to your trips!')}
                >
                    Save Trip
                </Button>
            </div>
        </div>
    );
};

export default Timeline;
