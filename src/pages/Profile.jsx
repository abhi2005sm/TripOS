import React, { useState } from 'react';
import { MapPin, Calendar, Globe, Award, Settings as SettingsIcon, LogOut, ChevronRight, Edit } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [user, setUser] = useState({
        name: 'Alex Morgan',
        role: 'Pro Traveler',
        location: 'San Francisco, CA',
        avatar: 'https://photos.google.com/photo/AF1QipNcP-l_h_WxPmhMfxUuYfzFMmEqijcIiiSUaAMG',
        stats: [
            { label: 'Trips', value: '47', icon: MapPin, color: 'text-blue-400' },
            { label: 'Countries', value: '12', icon: Globe, color: 'text-cyan-400' },
            { label: 'Days Travelled', value: '284', icon: Calendar, color: 'text-emerald-400' },
        ]
    });

    const [tempUser, setTempUser] = useState(user);

    const handleEditClick = () => {
        setTempUser(user);
        setIsEditModalOpen(true);
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        setUser(tempUser);
        setIsEditModalOpen(false);
    };

    const handleStatChange = (index, value) => {
        const newStats = [...tempUser.stats];
        newStats[index] = { ...newStats[index], value };
        setTempUser({ ...tempUser, stats: newStats });
    };

    const recentTrips = [
        { id: 1, title: 'Tokyo Adventure', dates: 'Oct 12 - Oct 17', status: 'Upcoming', image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
        { id: 2, title: 'Paris Escape', dates: 'Aug 05 - Aug 10', status: 'Completed', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
        { id: 3, title: 'Iceland Roadtrip', dates: 'Jun 15 - Jun 25', status: 'Completed', image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    ];

    return (
        <div className="space-y-8 pb-20 max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="relative">
                <div className="h-48 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg-dark to-transparent"></div>
                </div>

                <div className="px-6 relative -mt-16 flex flex-col md:flex-row items-end md:items-end gap-6">
                    <div className="relative group cursor-pointer" onClick={handleEditClick}>
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-32 h-32 rounded-full border-4 border-bg-dark shadow-2xl object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Edit className="text-white" size={24} />
                        </div>
                        <div className="absolute bottom-2 right-2 p-1.5 bg-cyan-500 rounded-full border-2 border-bg-dark">
                            <Award size={16} className="text-white" />
                        </div>
                    </div>

                    <div className="flex-1 mb-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                            <button
                                onClick={handleEditClick}
                                className="p-1.5 hover:bg-white/10 rounded-lg text-text-secondary hover:text-white transition-colors"
                            >
                                <Edit size={18} />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 text-text-secondary">
                            <MapPin size={14} />
                            <span>{user.location}</span>
                            <span className="mx-2">•</span>
                            <Badge variant="primary">{user.role}</Badge>
                        </div>
                    </div>

                    <Link to="/settings" className="mb-4">
                        <button className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10 text-white">
                            <SettingsIcon size={20} />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Profile"
            >
                <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="space-y-4">
                        <Input
                            label="DISPLAY NAME"
                            value={tempUser.name}
                            onChange={(e) => setTempUser({ ...tempUser, name: e.target.value })}
                            placeholder="Your Name"
                        />
                        <Input
                            label="ROLE / TITLE"
                            value={tempUser.role}
                            onChange={(e) => setTempUser({ ...tempUser, role: e.target.value })}
                            placeholder="e.g. Pro Traveler"
                        />
                        <Input
                            label="LOCATION"
                            value={tempUser.location}
                            onChange={(e) => setTempUser({ ...tempUser, location: e.target.value })}
                            placeholder="e.g. San Francisco, CA"
                        />
                        <Input
                            label="PROFILE IMAGE URL"
                            value={tempUser.avatar}
                            onChange={(e) => setTempUser({ ...tempUser, avatar: e.target.value })}
                            placeholder="https://..."
                        />

                        <div className="pt-2">
                            <label className="text-xs font-medium text-text-secondary ml-1 mb-2 block">STATS</label>
                            <div className="grid grid-cols-3 gap-3">
                                {tempUser.stats.map((stat, index) => (
                                    <div key={index} className="space-y-1">
                                        <label className="text-[10px] text-text-secondary uppercase">{stat.label}</label>
                                        <input
                                            type="text"
                                            value={stat.value}
                                            onChange={(e) => handleStatChange(index, e.target.value)}
                                            className="w-full bg-bg-dark border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <Button type="submit" className="w-full shadow-glow">
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6">
                {user.stats.map((stat, index) => (
                    <Card key={index} className="flex flex-col items-center justify-center p-8 bg-bg-dark/40 border-white/5 hover:border-white/10 transition-all group overflow-hidden relative">
                        <div className="relative mb-4 flex items-center justify-center">
                            {/* Centered Background Glow */}
                            <div className={cn(
                                "absolute w-16 h-16 blur-[30px] opacity-20 group-hover:opacity-40 transition-opacity rounded-full",
                                stat.color.replace('text-', 'bg-')
                            )} />

                            <div className={cn(
                                "w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 relative z-10 group-hover:scale-110 transition-transform duration-500",
                                stat.color
                            )}>
                                <stat.icon size={28} strokeWidth={1.5} />
                            </div>
                        </div>

                        <div className="text-center relative z-10">
                            <p className="text-4xl font-bold text-white tracking-tight mb-1">{stat.value}</p>
                            <p className="text-[11px] uppercase tracking-[0.2em] text-text-secondary font-semibold">{stat.label}</p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Recent Trips */}
            <div>
                <h2 className="text-lg font-semibold text-white mb-4">Recent Trips</h2>
                <div className="space-y-4">
                    {recentTrips.map((trip) => (
                        <Card key={trip.id} hover className="flex items-center gap-4 p-4 group cursor-pointer">
                            <img
                                src={trip.image}
                                alt={trip.title}
                                className="w-16 h-16 rounded-xl object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">{trip.title}</h3>
                                <p className="text-sm text-text-secondary">{trip.dates}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Badge variant={trip.status === 'Upcoming' ? 'accent' : 'default'} className="hidden md:inline-flex">
                                    {trip.status}
                                </Badge>
                                <ChevronRight className="text-white/20 group-hover:text-white transition-colors" />
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="pt-4 border-t border-white/5">
                <button className="w-full flex items-center justify-center gap-2 p-4 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors font-medium">
                    <LogOut size={20} />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Profile;
