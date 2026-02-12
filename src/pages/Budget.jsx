import React, { useState } from 'react';
import { Plane, BedDouble, Utensils, Ticket, Plus, MoreHorizontal, ShoppingBag, Car, Coffee, X, Trash2, RotateCcw, Edit, FileText } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { cn } from '../lib/utils';

const Budget = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Trip Data State
    const [tripName, setTripName] = useState("Europe Summer '24");
    const [totalBudget, setTotalBudget] = useState(350000);

    const [categories, setCategories] = useState([
        { id: '1', name: 'Flights', icon: Plane, budget: 120000, spent: 95000, color: 'bg-blue-500' },
        { id: '2', name: 'Stay', icon: BedDouble, budget: 100000, spent: 70000, color: 'bg-indigo-500' },
        { id: '3', name: 'Food & Dining', icon: Utensils, budget: 60000, spent: 35000, color: 'bg-orange-500' },
        { id: '4', name: 'Activities', icon: Ticket, budget: 40000, spent: 15000, color: 'bg-emerald-500' },
        { id: '5', name: 'Shopping', icon: ShoppingBag, budget: 20000, spent: 8000, color: 'bg-pink-500' },
        { id: '6', name: 'Transport', icon: Car, budget: 10000, spent: 4000, color: 'bg-yellow-500' },
    ]);

    const [newExpense, setNewExpense] = useState({
        category: 'Food & Dining',
        amount: '',
        description: ''
    });

    // Calculate totals dynamically
    const spent = categories.reduce((acc, cat) => acc + cat.spent, 0);
    const remaining = totalBudget - spent;
    const percentage = Math.min((spent / totalBudget) * 100, 100);

    const displayedCategories = showAllCategories ? categories : categories.slice(0, 4);

    const handleAddExpense = (e) => {
        e.preventDefault();
        if (!newExpense.amount || !newExpense.category) return;

        const amountDiff = parseFloat(newExpense.amount);

        setCategories(prev => prev.map(cat => {
            if (cat.name === newExpense.category) {
                return { ...cat, spent: cat.spent + amountDiff };
            }
            return cat;
        }));

        setIsAddModalOpen(false);
        setNewExpense({ category: 'Food & Dining', amount: '', description: '' });
    };

    const handleDeleteCategory = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            setCategories(prev => prev.filter(cat => cat.id !== id));
        }
    };

    const handleResetTrip = () => {
        if (window.confirm("Are you sure you want to completely reset the trip? This will clear the trip name, budget, and all expenses.")) {
            setTripName("New Journey");
            setTotalBudget(0);
            setCategories(prev => prev.map(cat => ({ ...cat, spent: 0 })));
            setIsMenuOpen(false);
        }
    };

    const handleEditTrip = () => {
        const newName = prompt("Enter Trip Name:", tripName);
        if (newName) setTripName(newName);

        const newBudget = prompt("Enter Total Budget:", totalBudget);
        if (newBudget && !isNaN(newBudget)) setTotalBudget(parseFloat(newBudget));

        setIsMenuOpen(false);
    };

    return (
        <div className="space-y-8 pb-20 max-w-4xl mx-auto" onClick={() => setIsMenuOpen(false)}>
            <div className="flex items-center justify-between relative">
                <div>
                    <p className="text-xs uppercase tracking-wider text-text-secondary font-semibold">Current Trip</p>
                    <h1 className="text-2xl font-bold text-white">{tripName}</h1>
                </div>

                <div className="relative">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMenuOpen(!isMenuOpen);
                        }}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <MoreHorizontal size={24} className="text-text-secondary" />
                    </button>

                    {isMenuOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-bg-card border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-in">
                            <button
                                onClick={handleEditTrip}
                                className="w-full text-left px-4 py-3 text-sm text-text-secondary hover:text-white hover:bg-white/5 flex items-center gap-2 transition-colors"
                            >
                                <Edit size={16} />
                                Edit Trip Details
                            </button>
                            <button
                                onClick={() => alert("Exporting PDF...")}
                                className="w-full text-left px-4 py-3 text-sm text-text-secondary hover:text-white hover:bg-white/5 flex items-center gap-2 transition-colors"
                            >
                                <FileText size={16} />
                                Export as PDF
                            </button>
                            <div className="h-px bg-white/5 my-1" />
                            <button
                                onClick={handleResetTrip}
                                className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                            >
                                <RotateCcw size={16} />
                                Reset Trip
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Budget Card */}
            <Card className="bg-gradient-to-br from-bg-card/80 to-bg-dark/80 border-cyan-500/20 shadow-glow">
                <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-6">
                    <div className="space-y-1">
                        <span className="text-sm text-text-secondary">Total Budget</span>
                        <div className="text-4xl font-bold text-white tracking-tight">
                            ₹{totalBudget.toLocaleString()}
                        </div>
                    </div>
                    <Badge variant="primary" className="self-start md:self-auto bg-blue-500/20 text-blue-300 px-3 py-1">
                        {Math.round(percentage)}% Spent
                    </Badge>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                        <span className="text-text-secondary">Spent: <span className="text-white">₹{spent.toLocaleString()}</span></span>
                        <span className="text-text-secondary">Remaining: <span className={cn(remaining < 0 ? "text-red-400" : "text-emerald-400")}>₹{remaining.toLocaleString()}</span></span>
                    </div>
                    <div className="h-4 bg-bg-dark rounded-full overflow-hidden border border-white/5 relative">
                        <div
                            className={cn(
                                "h-full rounded-full transition-all duration-1000 ease-out relative",
                                percentage > 90 ? "bg-gradient-to-r from-orange-500 to-red-500" : "bg-gradient-to-r from-blue-600 to-cyan-400"
                            )}
                            style={{ width: `${percentage}%` }}
                        >
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50 blur-[2px]"></div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Categories Grid */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">Category Breakdown</h2>
                    <button
                        onClick={() => setShowAllCategories(!showAllCategories)}
                        className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                        {showAllCategories ? 'Show Less' : 'View All'}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {displayedCategories.map((cat) => (
                        <Card key={cat.id} hover className="flex flex-col gap-4 animate-fade-in relative group">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={cn("p-2.5 rounded-xl bg-white/5", cat.color.replace('bg-', 'text-'))}>
                                        <cat.icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">{cat.name}</h3>
                                        <p className="text-xs text-text-secondary">₹{cat.spent.toLocaleString()} of ₹{cat.budget.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-text-secondary">{Math.round((cat.spent / cat.budget) * 100)}%</span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteCategory(cat.id);
                                        }}
                                        className="p-1.5 rounded-lg text-text-secondary hover:text-red-400 hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all"
                                        title="Delete Category"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="h-1.5 bg-bg-dark rounded-full overflow-hidden">
                                <div
                                    className={cn("h-full rounded-full transition-all duration-1000", cat.color)}
                                    style={{ width: `${Math.min((cat.spent / cat.budget) * 100, 100)}%` }}
                                />
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="pt-4">
                <Button
                    onClick={() => setIsAddModalOpen(true)}
                    className="w-full py-4 text-base font-semibold shadow-glow flex items-center justify-center gap-2 group"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    Add New Expense
                </Button>
            </div>

            {/* Add Expense Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add New Expense"
            >
                <form onSubmit={handleAddExpense} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-medium text-text-secondary ml-1 mb-1.5 block">CATEGORY</label>
                            <div className="grid grid-cols-2 gap-2">
                                {categories.map(cat => (
                                    <button
                                        type="button"
                                        key={cat.id}
                                        onClick={() => setNewExpense({ ...newExpense, category: cat.name })}
                                        className={cn(
                                            "p-3 rounded-xl border text-sm font-medium transition-all flex items-center gap-2",
                                            newExpense.category === cat.name
                                                ? "bg-cyan-500/20 border-cyan-500/50 text-white"
                                                : "bg-bg-dark/30 border-white/5 text-text-secondary hover:bg-white/5"
                                        )}
                                    >
                                        <div className={cn("w-2 h-2 rounded-full", cat.color)} />
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Input
                            label="AMOUNT (₹)"
                            type="number"
                            placeholder="0.00"
                            value={newExpense.amount}
                            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                            required
                            min="0"
                            step="0.01"
                            className="text-lg font-mono"
                        />

                        <Input
                            label="DESCRIPTION"
                            placeholder="What was this for?"
                            value={newExpense.description}
                            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                        />
                    </div>

                    <div className="pt-2">
                        <Button type="submit" className="w-full shadow-glow">
                            Add Expense
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Budget;
