import React from 'react';
import { Target, TrendingUp, BookOpen, Zap, Users, Trophy } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: <Target className="w-8 h-8" />,
            title: "Curated Problem Sets",
            description: "450+ handpicked DSA problems covering all important topics from arrays to dynamic programming.",
            color: "from-blue-500 to-cyan-500",
            iconColor: "text-blue-400"
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Track Your Progress",
            description: "Visual progress indicators and statistics to keep you motivated throughout your preparation journey.",
            color: "from-purple-500 to-pink-500",
            iconColor: "text-purple-400"
        },
        {
            icon: <BookOpen className="w-8 h-8" />,
            title: "Multiple Roadmaps",
            description: "Choose from various roadmaps: Striver's SDE Sheet, Love Babbar's 450, and custom company-specific sheets.",
            color: "from-orange-500 to-red-500",
            iconColor: "text-orange-400"
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Smart Revision",
            description: "Never forget what you learned. Our spaced repetition system ensures long-term retention.",
            color: "from-green-500 to-emerald-500",
            iconColor: "text-green-400"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Community Support",
            description: "Join thousands of students. Share solutions, discuss approaches, and grow together.",
            color: "from-indigo-500 to-blue-500",
            iconColor: "text-indigo-400"
        },
        {
            icon: <Trophy className="w-8 h-8" />,
            title: "Interview Ready",
            description: "Focus on problems frequently asked in FAANG and top product companies. Be interview-ready.",
            color: "from-yellow-500 to-orange-500",
            iconColor: "text-yellow-400"
        }
    ];

    return (
        <section id="features" className="py-24 bg-[#0d1117] relative">
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 z-10 relative">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4 font-heading">
                        Everything You Need to <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Succeed</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Powerful features designed to accelerate your placement preparation
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 bg-card/[0.03] border border-border/50 rounded-2xl hover:bg-card/[0.08] hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 font-heading">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
