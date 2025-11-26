"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
            setMousePosition({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden grid-pattern">
            {/* Enhanced Background Gradients */}
            <div className="absolute inset-0 w-full h-full">
                <motion.div 
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"
                    animate={{
                        x: mousePosition.x * 80,
                        y: mousePosition.y * 80
                    }}
                    transition={{ type: "spring", stiffness: 30, damping: 15 }}
                />
                <motion.div 
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse [animation-delay:1s]"
                    animate={{
                        x: mousePosition.x * -60,
                        y: mousePosition.y * -60
                    }}
                    transition={{ type: "spring", stiffness: 30, damping: 15 }}
                />
                <motion.div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]"
                    animate={{
                        x: mousePosition.x * 50,
                        y: mousePosition.y * 50
                    }}
                    transition={{ type: "spring", stiffness: 30, damping: 15 }}
                />
            </div>

            <div className="relative z-10 px-4 max-w-5xl mx-auto space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h2 className="text-xs md:text-sm text-accent font-semibold tracking-widest uppercase mb-6">
                        Welcome to my portfolio
                    </h2>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                >
                    Hi, I'm <span className="gradient-text">Aromal Sajeev</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="space-y-4"
                >
                    <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        Founding Engineer at <span className="text-primary font-semibold">Asthra AI</span> | Full-Stack Developer
                    </p>
                    <p className="text-sm md:text-base lg:text-lg text-muted-foreground/80 max-w-2xl mx-auto">
                        Building the Future of AI-Assisted Regulatory Writing
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full max-w-md mx-auto sm:max-w-none"
                >
                    <Link
                        href="#projects"
                        className="magnetic-btn px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-lg glow text-center min-h-12 flex items-center justify-center sm:min-w-40"
                    >
                        View Projects
                    </Link>
                    <Link
                        href="#contact"
                        className="magnetic-btn px-8 py-4 rounded-full glass font-medium hover:bg-secondary/20 transition-all border border-border text-center min-h-12 flex items-center justify-center sm:min-w-40"
                    >
                        Contact Me
                    </Link>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex gap-4 justify-center items-center"
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
