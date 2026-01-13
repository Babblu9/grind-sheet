import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';
import UserDashboard from './UserDashboard';
import { logger } from '../lib/logger';

const AuthButton = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [showDashboard, setShowDashboard] = useState(false);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSignIn = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/practice`
                }
            });

            if (error) {
                logger.error('Authentication error:', error.message);
                // You could add a toast notification here for better UX
                alert('Failed to sign in. Please try again.');
            }
        } catch (error) {
            logger.error('Unexpected error during sign in:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    };

    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                logger.error('Sign out error:', error.message);
                alert('Failed to sign out. Please try again.');
            }
        } catch (error) {
            logger.error('Unexpected error during sign out:', error);
        }
    };

    if (loading) {
        return (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse"></div>
        );
    }

    if (user) {
        return (
            <>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowDashboard(true)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                    >
                        {user.user_metadata?.avatar_url ? (
                            <img
                                src={user.user_metadata.avatar_url}
                                alt="Profile"
                                className="w-6 h-6 rounded-full"
                            />
                        ) : (
                            <UserIcon size={14} className="text-muted-foreground" />
                        )}
                        <span className="text-sm font-medium text-foreground max-w-[120px] truncate">
                            {user.user_metadata?.full_name || user.email?.split('@')[0]}
                        </span>
                    </button>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>

                <UserDashboard
                    isOpen={showDashboard}
                    onClose={() => setShowDashboard(false)}
                />
            </>
        );
    }

    return (
        <button
            onClick={handleSignIn}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
            <LogIn size={16} />
            Sign In
        </button>
    );
};

export default AuthButton;

