"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden grid-pattern">
            {/* Enhanced Background Gradients */}
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 px-4 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-sm md:text-base text-accent font-semibold tracking-wider uppercase mb-4">
                        Welcome to my portfolio
                    </h2>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold mb-6"
                >
                    Hi, I'm <span className="gradient-text">Aromal Sajeev</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10"
                >
                    Founding Engineer at <span className="text-primary font-semibold">Asthra AI</span> | Full-Stack Developer
                    <br />
                    <span className="text-base md:text-lg mt-2 block">
                        Building the Future of AI-Assisted Regulatory Writing
                    </span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
                >
                    <Link
                        href="#projects"
                        className="magnetic-btn px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-lg glow"
                    >
                        View Projects
                    </Link>
                    <Link
                        href="#contact"
                        className="magnetic-btn px-8 py-3 rounded-full glass font-medium hover:bg-secondary/20 transition-all border border-border"
                    >
                        Contact Me
                    </Link>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex gap-4 justify-center"
                >
                    <a
                        href="https://github.com/amalu-sajeev-me"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full glass hover:bg-primary/20 transition-all glow"
                        aria-label="GitHub"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                    <a
                        href="https://linkedin.com/in/aromal-sajeev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full glass hover:bg-secondary/20 transition-all glow-secondary"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                        href="mailto:amalu.sajeev@gmail.com"
                        className="p-3 rounded-full glass hover:bg-accent/20 transition-all"
                        aria-label="Email"
                    >
                        <Mail className="w-5 h-5" />
                    </a>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
            >
                <ArrowDown className="text-muted-foreground w-6 h-6" />
            </motion.div>
        </section>
    );
}
