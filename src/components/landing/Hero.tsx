import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-2000" />
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500/20 rounded-full blur-[100px] animate-pulse delay-4000" />

                {/* CSS Grid Pattern */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-sm font-semibold mb-8 animate-in fade-in zoom-in duration-500">
                    <Sparkles size={16} />
                    <span>100% Free • Open Source • Community Driven</span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-in slide-in-from-bottom-4 duration-700">
                    Master DSA.
                    <br />
                    <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Crack Placements.
                    </span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-in slide-in-from-bottom-5 duration-700 delay-200">
                    The ultimate free DSA sheet designed for students. Track your progress, solve curated problems, and land your dream job with structured roadmaps.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-in slide-in-from-bottom-6 duration-700 delay-300">
                    <a href="/roadmap" className="group px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all hover:scale-105 flex items-center gap-2">
                        Start Your Journey
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href="#features" className="px-8 py-4 bg-secondary/50 text-foreground rounded-full text-lg font-bold border border-border/50 hover:bg-secondary transition-all hover:scale-105 flex items-center gap-2">
                        Explore Features
                        <ChevronRight size={20} />
                    </a>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground animate-in slide-in-from-bottom-7 duration-700 delay-500">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-emerald-500" />
                        <span>450+ Problems</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-emerald-500" />
                        <span>Multiple Roadmaps</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-emerald-500" />
                        <span>Progress Tracking</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
