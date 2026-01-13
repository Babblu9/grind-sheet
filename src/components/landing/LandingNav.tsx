import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { Menu, X, ArrowRight } from 'lucide-react';

const LandingNav = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
            scrolled ? "bg-[#0d1117]/80 backdrop-blur-md border-border/50 py-3" : "bg-transparent border-transparent py-5"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-lg">
                            G
                        </div>
                        <span className="font-bold text-xl tracking-tight hidden sm:block text-white">
                            GrindSheet
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Features</a>
                        <a href="#roadmap" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Roadmap</a>
                        <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">How it Works</a>
                        {/* GitHub button removed as per request */}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <a href="/practice" className="text-sm font-medium text-white hover:text-blue-400 transition-colors">
                            Sign In
                        </a>
                        <a href="/practice" className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-bold transition-transform hover:scale-105 shadow-lg">
                            Start Grinding
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    <button
                        className="md:hidden p-2 text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-[#0d1117] border-b border-border p-4 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-2">
                    <a href="#features" className="text-sm font-bold py-2 text-white" onClick={() => setMobileMenuOpen(false)}>Features</a>
                    <a href="#roadmap" className="text-sm font-bold py-2 text-white" onClick={() => setMobileMenuOpen(false)}>Roadmap</a>
                    <a href="#how-it-works" className="text-sm font-bold py-2 text-white" onClick={() => setMobileMenuOpen(false)}>How it Works</a>
                    <div className="h-px bg-border my-2" />
                    <a href="/" className="w-full text-center py-3 bg-secondary rounded-lg font-bold text-white" onClick={() => setMobileMenuOpen(false)}>
                        Sign In
                    </a>
                    <a href="/roadmap" className="w-full text-center py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold" onClick={() => setMobileMenuOpen(false)}>
                        Get Started
                    </a>
                </div>
            )}
        </nav>
    );
};

export default LandingNav;
