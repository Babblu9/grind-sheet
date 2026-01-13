import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const LandingFooter = () => {
    return (
        <footer className="bg-[#050912] border-t border-border/50 pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-lg">
                                G
                            </div>
                            <span className="font-bold text-xl text-white">
                                GrindSheet
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                            The open-source platform for mastering data structures, algorithms, and technical interviews.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-muted-foreground hover:text-white transition-colors"><Github size={20} /></a>
                            <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                            <li><a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a></li>
                            <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="/changelog" className="hover:text-white transition-colors">Changelog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><a href="/docs" className="hover:text-white transition-colors">Documentation</a></li>
                            <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                            <li><a href="/community" className="hover:text-white transition-colors">Community</a></li>
                            <li><a href="https://github.com/your-repo" className="hover:text-white transition-colors">Open Source</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Stay Updated</h4>
                        <p className="text-xs text-muted-foreground mb-4">
                            Get the latest updates and roadmap notifications.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 w-full"
                            />
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">
                        © 2024 GrindSheet. All rights reserved.
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        Made with ❤️ by developers, for developers.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;
