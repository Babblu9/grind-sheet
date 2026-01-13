import React, { useEffect, useState, useRef } from 'react';

const StatCounter = ({ end, label, suffix = "" }: { end: number, label: string, suffix?: string }) => {
    // Basic counter logic or simplified for this quick update
    return (
        <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{end}{suffix}</div>
            <div className="text-blue-200/80 text-sm sm:text-base font-medium">{label}</div>
        </div>
    );
};

const Stats = () => {
    const stats = [
        { value: "450+", label: "Curated Problems" },
        { value: "10K+", label: "Active Students" },
        { value: "50+", label: "Top Companies Covered" },
        { value: "100%", label: "Free Forever" }
    ];

    return (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
            {/* Abstract Shapes/Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl sm:text-5xl font-bold text-white mb-2 font-heading">{stat.value}</div>
                            <div className="text-white/80 text-sm sm:text-base font-medium uppercase tracking-wide">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
