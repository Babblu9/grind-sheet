import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
    {
        name: "Alex C.",
        role: "SDE II at Amazon",
        quote: "GrindSheet's roadmap helped me clear my Amazon onsite. The structured path kept me focused when I felt overwhelmed.",
        avatar: "AC",
        color: "bg-orange-500"
    },
    {
        name: "Sarah L.",
        role: "Frontend Engineer at Google",
        quote: "I used to miss Codeforces contests all the time. The unified calendar is a game changer. Landed my dream job last month!",
        avatar: "SL",
        color: "bg-blue-500"
    },
    {
        name: "David K.",
        role: "Intern at Meta",
        quote: "The NeetCode 150 integration is seamless. Tracking my progress visually gave me the confidence I needed.",
        avatar: "DK",
        color: "bg-indigo-500"
    }
];

const SocialProof = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Generate fake contribution data
    const weeks = 52;
    const days = 7;
    const contributionData = Array.from({ length: weeks * days }).map(() => Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : 0);

    const getContributionColor = (level: number) => {
        switch (level) {
            case 0: return 'bg-[#161b22]'; // Empty
            case 1: return 'bg-[#0e4429]';
            case 2: return 'bg-[#006d32]';
            case 3: return 'bg-[#26a641]';
            case 4: return 'bg-[#39d353]';
            default: return 'bg-[#161b22]';
        }
    };

    return (
        <section id="social-proof" className="py-24 bg-[#0d1117] relative overflow-hidden">

            <div className="container mx-auto px-4 z-10 relative">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Left: Testimonials */}
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-8">
                            Join <span className="text-primary">10,000+</span> Developers Who Got The Job
                        </h2>

                        <div className="relative min-h-[400px] flex items-center justify-center">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-all duration-700 ease-in-out transform flex flex-col justify-center ${index === activeIndex
                                            ? 'opacity-100 translate-x-0 scale-100 z-20 visible'
                                            : 'opacity-0 translate-x-8 scale-95 z-10 invisible pointer-events-none'
                                        }`}
                                >
                                    <div className="p-8 rounded-2xl bg-secondary/10 border border-border backdrop-blur-sm shadow-xl">
                                        <div className="flex gap-1 mb-4 text-yellow-500">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                        </div>
                                        <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-foreground">"{testimonial.quote}"</p>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-full ${testimonial.color} flex items-center justify-center font-bold text-white shadow-lg`}>
                                                {testimonial.avatar}
                                            </div>
                                            <div>
                                                <div className="font-bold text-foreground">{testimonial.name}</div>
                                                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Contribution Graph Visualization */}
                    <div className="w-full lg:w-1/2">
                        <div className="p-6 rounded-xl bg-card border border-border shadow-2xl skew-y-3 transform lg:rotate-3 hover:rotate-0 transition-transform duration-500">
                            <h3 className="text-sm font-bold text-muted-foreground uppercase mb-4 flex items-center justify-between">
                                <span>Consistency Visualized</span>
                                <span className="text-xs normal-case bg-green-900/30 text-green-400 px-2 py-1 rounded">365 Day Streak</span>
                            </h3>

                            <div className="flex gap-1 flex-wrap justify-center opacity-80">
                                {Array.from({ length: 18 }).map((_, w) => (
                                    <div key={w} className="flex flex-col gap-1">
                                        {Array.from({ length: 7 }).map((_, d) => (
                                            <div
                                                key={d}
                                                className={`w-3 h-3 rounded-sm ${getContributionColor(Math.random() > 0.4 ? Math.floor(Math.random() * 5) : 0)}`}
                                            />
                                        ))}
                                    </div>
                                ))}
                                {/* Gradient fade for endless look */}
                            </div>

                            <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                                <span>Less</span>
                                <div className="flex gap-1">
                                    <div className="w-3 h-3 rounded-sm bg-[#161b22]"></div>
                                    <div className="w-3 h-3 rounded-sm bg-[#0e4429]"></div>
                                    <div className="w-3 h-3 rounded-sm bg-[#006d32]"></div>
                                    <div className="w-3 h-3 rounded-sm bg-[#26a641]"></div>
                                    <div className="w-3 h-3 rounded-sm bg-[#39d353]"></div>
                                </div>
                                <span>More</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Company Logos */}
                <div className="mt-20 pt-10 border-t border-dashed border-border/30">
                    <p className="text-center text-sm text-muted-foreground mb-8">Graduates hired by</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Simple Text Logos for now */}
                        <span className="text-2xl font-bold font-sans">Google</span>
                        <span className="text-2xl font-bold font-sans">Meta</span>
                        <span className="text-2xl font-bold font-sans">Amazon</span>
                        <span className="text-2xl font-bold font-sans">Netflix</span>
                        <span className="text-2xl font-bold font-sans">Uber</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
