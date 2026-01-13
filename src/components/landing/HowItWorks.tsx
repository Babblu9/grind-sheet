import React from 'react';
import { cn } from '../../lib/utils';

const steps = [
    {
        number: "01",
        title: "Choose Your Roadmap",
        description: "Select from curated DSA sheets or create your own custom study plan based on your goals.",
        color: "from-blue-500 to-cyan-500"
    },
    {
        number: "02",
        title: "Solve & Track",
        description: "Work through problems systematically. Mark completed, attempted, and questions to revisit.",
        color: "from-purple-500 to-pink-500"
    },
    {
        number: "03",
        title: "Review & Revise",
        description: "Use our smart revision system to reinforce concepts and ensure long-term retention.",
        color: "from-orange-500 to-red-500"
    },
    {
        number: "04",
        title: "Ace Interviews",
        description: "Walk into your placement interviews with confidence, knowing you've mastered the fundamentals.",
        color: "from-green-500 to-emerald-500"
    }
];

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-24 bg-[#0d1117] relative">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4 font-heading">
                        Your Path to <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Success</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Four simple steps to transform from beginner to placement-ready
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative group">
                            <div className="text-center p-6 rounded-2xl bg-card/5 border border-border/50 hover:bg-card/10 hover:border-border transition-all duration-300">
                                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300`}>
                                    {step.number}
                                </div>
                                <h3 className="text-xl font-bold mb-3 font-heading">{step.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-[20%] -right-[12.5%] w-[25%] h-0.5 bg-gradient-to-r from-border/50 to-transparent z-0"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
