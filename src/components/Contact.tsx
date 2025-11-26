"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Phone, MapPin } from "lucide-react";
import SectionWrapper from "./ui/SectionWrapper";
import Link from "next/link";

export default function Contact() {
    return (
        <SectionWrapper id="contact" className="mb-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass rounded-3xl p-8 md:p-12 text-center glow relative overflow-hidden"
            >
                {/* Background gradient orbs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px]" />
                
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Let's <span className="gradient-text">Connect</span>
                    </h2>
                <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 items-center">
                    <Link
                        href="mailto:amalu.sajeev.me@gmail.com"
                        className="flex flex-col items-center gap-3 group"
                    >
                        <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                            <Mail className="w-6 h-6" />
                        </div>
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                            amalu.sajeev.me@gmail.com
                        </span>
                    </Link>

                    <Link
                        href="https://www.linkedin.com/in/amalu-sajeev-me/"
                        target="_blank"
                        className="flex flex-col items-center gap-3 group"
                    >
                        <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                            <Linkedin className="w-6 h-6" />
                        </div>
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                            LinkedIn Profile
                        </span>
                    </Link>

                    <div className="flex flex-col items-center gap-3 group cursor-default">
                        <div className="p-4 rounded-full bg-primary/10 text-primary transition-all duration-300">
                            <Phone className="w-6 h-6" />
                        </div>
                        <span className="text-muted-foreground">
                            +91 7012416163
                        </span>
                    </div>

                    <div className="flex flex-col items-center gap-3 group cursor-default">
                        <div className="p-4 rounded-full bg-primary/10 text-primary transition-all duration-300">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <span className="text-muted-foreground">
                            Hyderabad, India
                        </span>
                    </div>
                </div>
                </div>
            </motion.div>
        </SectionWrapper>
    );
}
