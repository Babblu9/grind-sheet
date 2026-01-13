import React from 'react';
import { ArrowRight, Github } from 'lucide-react';

const CTA = () => {
    return (
        <section className="py-24 bg-[#0d1117] relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 z-0"></div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl shadow-blue-900/20 border border-white/10">
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-heading">
                        Ready to Start Grinding?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of students who are already crushing their placement preparation. It's completely free!
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="/roadmap" className="px-8 py-4 bg-white text-blue-600 rounded-full text-lg font-bold hover:bg-blue-50 transition-all hover:scale-105 shadow-xl flex items-center gap-2">
                            Get Started Now
                            <ArrowRight size={20} />
                        </a>
                        <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-blue-700 text-white rounded-full text-lg font-bold hover:bg-blue-800 transition-all hover:scale-105 flex items-center gap-2 shadow-lg">
                            <Github size={20} />
                            Star on GitHub
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
