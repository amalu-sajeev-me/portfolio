"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Phone, MapPin } from "lucide-react";
import SectionWrapper from "./ui/SectionWrapper";
import Link from "next/link";
import ContactForm from "./ContactForm";

export default function Contact() {
    return (
        <SectionWrapper id="contact">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass rounded-3xl p-8 md:p-12 lg:p-16 text-center glow relative overflow-hidden max-w-5xl mx-auto"
            >
                {/* Background gradient orbs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px]" />
                
                <div className="relative z-10 space-y-8">
                    <div>
                        <h2 className="section-title text-3xl md:text-4xl lg:text-5xl mb-6">
                            Let's <span className="gradient-text">Connect</span>
                        </h2>
                        <p className="section-subtitle text-muted-foreground text-base md:text-lg mx-auto">
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                        </p>
                    </div>

                    {/* Contact Form */}
                    <ContactForm />

                    {/* Divider */}
                    <div className="flex items-center gap-4 max-w-lg mx-auto">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-muted-foreground text-sm">or reach out directly</span>
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
                        <Link
                            href="mailto:amalu.sajeev.me@gmail.com"
                            className="flex flex-col items-center gap-3 group px-4"
                        >
                            <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 min-h-[56px] min-w-[56px] flex items-center justify-center">
                                <Mail className="w-6 h-6" />
                            </div>
                            <span className="tech-text text-muted-foreground group-hover:text-foreground transition-colors text-center break-words max-w-full">
                                amalu.sajeev.me@gmail.com
                            </span>
                        </Link>

                        <Link
                            href="https://www.linkedin.com/in/amalu-sajeev-me/"
                            target="_blank"
                            className="flex flex-col items-center gap-3 group px-4"
                        >
                            <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 min-h-[56px] min-w-[56px] flex items-center justify-center">
                                <Linkedin className="w-6 h-6" />
                            </div>
                            <span className="text-muted-foreground group-hover:text-foreground transition-colors text-sm text-center">
                                LinkedIn Profile
                            </span>
                        </Link>

                        <div className="flex flex-col items-center gap-3 group cursor-default px-4">
                            <div className="p-4 rounded-full bg-primary/10 text-primary transition-all duration-300 min-h-[56px] min-w-[56px] flex items-center justify-center">
                                <Phone className="w-6 h-6" />
                            </div>
                            <span className="text-muted-foreground text-sm text-center">
                                +91 7012416163
                            </span>
                        </div>

                        <div className="flex flex-col items-center gap-3 group cursor-default px-4">
                            <div className="p-4 rounded-full bg-primary/10 text-primary transition-all duration-300 min-h-[56px] min-w-[56px] flex items-center justify-center">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <span className="text-muted-foreground text-sm text-center">
                                Hyderabad, India
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </SectionWrapper>
    );
}
