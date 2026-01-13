import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';
import { X, Mail, Calendar, Award, Target, TrendingUp } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { completedQuestions, completionTimestamps } from '../stores/progressStore';

interface UserDashboardProps {
    isOpen: boolean;
    onClose: () => void;
}

const UserDashboard = ({ isOpen, onClose }: UserDashboardProps) => {
    const [user, setUser] = useState<User | null>(null);
    const completed = useStore(completedQuestions);
    const timestamps = useStore(completionTimestamps);

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });
    }, []);

    if (!isOpen || !user) return null;

    const totalCompleted = Object.keys(completed).length;
    const completedToday = Object.values(timestamps).filter(ts => {
        const date = new Date(ts);
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }).length;

    const joinedDate = new Date(user.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Popup Card */}
            <div className="fixed top-20 right-6 z-50 w-[380px] bg-card border border-border rounded-xl shadow-2xl animate-in slide-in-from-top-5 duration-300">
                {/* Header with Close Button */}
                <div className="relative p-6 pb-4">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <X size={18} />
                    </button>

                    {/* Profile Section */}
                    <div className="flex items-center gap-4 mb-6">
                        {user.user_metadata?.avatar_url ? (
                            <img
                                src={user.user_metadata.avatar_url}
                                alt="Profile"
                                className="w-16 h-16 rounded-full border-2 border-primary/20"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                                {user.user_metadata?.full_name?.[0].toUpperCase() || user.email?.[0].toUpperCase()}
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-foreground truncate">
                                {user.user_metadata?.full_name || user.email?.split('@')[0]}
                            </h3>
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <Mail size={14} />
                                <span className="truncate">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 rounded-lg bg-muted/50 border border-border">
                            <div className="flex items-center gap-2 mb-1">
                                <Target size={16} className="text-primary" />
                                <span className="text-xs font-medium text-muted-foreground">Total Solved</span>
                            </div>
                            <p className="text-2xl font-bold text-foreground">{totalCompleted}</p>
                        </div>

                        <div className="p-4 rounded-lg bg-muted/50 border border-border">
                            <div className="flex items-center gap-2 mb-1">
                                <TrendingUp size={16} className="text-green-500" />
                                <span className="text-xs font-medium text-muted-foreground">Today</span>
                            </div>
                            <p className="text-2xl font-bold text-foreground">{completedToday}</p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Footer Info */}
                <div className="p-6 pt-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar size={14} />
                            <span>Joined</span>
                        </div>
                        <span className="font-medium text-foreground">{joinedDate}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Award size={14} />
                            <span>Rank</span>
                        </div>
                        <span className="font-medium text-foreground">Beginner</span>
                    </div>
                </div>

                {/* Action Button */}
                <div className="p-4 pt-0">
                    <button
                        onClick={onClose}
                        className="w-full py-2.5 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                        Continue Grinding
                    </button>
                </div>
            </div>
        </>
    );
};

export default UserDashboard;
