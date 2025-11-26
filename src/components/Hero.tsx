"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50 pointer-events-none" />

            <div className="z-10 px-4">
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
                    className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
                >
                    Hi, I'm <span className="text-primary">Aromal Sajeev</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10"
                >
                    Founding Engineer at Asthra AI | Full-Stack Developer
                    <br />
                    <span className="text-base md:text-lg mt-2 block">
                        Building the Future of AI-Assisted Regulatory Writing
                    </span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        href="#projects"
                        className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                    >
                        View Projects
                    </Link>
                    <Link
                        href="#contact"
                        className="px-8 py-3 rounded-full bg-secondary/10 text-secondary font-medium hover:bg-secondary/20 transition-colors border border-secondary/20"
                    >
                        Contact Me
                    </Link>
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
