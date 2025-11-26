"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Briefcase, Code, FolderGit2, Mail } from "lucide-react";
import Link from "next/link";

const navItems = [
    { name: "Home", href: "#", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Skills", href: "#skills", icon: Code },
    { name: "Projects", href: "#projects", icon: FolderGit2 },
    { name: "Contact", href: "#contact", icon: Mail },
];

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => item.href.substring(1) || "home");
            const current = sections.find(section => {
                const element = section === "home" 
                    ? document.body 
                    : document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            setActiveSection(current || "");
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setIsOpen(false);
        if (href === "#") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 lg:hidden p-2.5 sm:p-3 rounded-full glass glow hover:scale-110 transition-transform min-h-11 min-w-11 flex items-center justify-center"
                aria-label="Toggle navigation menu"
            >
                {isOpen ? (
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                ) : (
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                )}
            </motion.button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
                <div className="glass rounded-full p-3 space-y-4">
                    {navItems.map((item) => {
                        const isActive = activeSection === (item.href.substring(1) || "home");
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => handleNavClick(item.href)}
                                className={`group relative block p-2 rounded-full transition-all ${
                                    isActive 
                                        ? "bg-primary text-primary-foreground scale-110" 
                                        : "hover:bg-primary/10 hover:scale-110"
                                }`}
                                aria-label={item.name}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="absolute left-full ml-4 px-3 py-1.5 bg-background/90 backdrop-blur-sm border border-border rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-background/80 backdrop-blur-md z-40 lg:hidden"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.nav
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 bottom-0 w-64 sm:w-72 glass border-r border-border z-40 lg:hidden overflow-y-auto"
                        >
                            <div className="p-6 sm:p-8 mt-16">
                                <h2 className="text-xl sm:text-2xl font-bold mb-8 gradient-text">
                                    Navigation
                                </h2>
                                <div className="space-y-2">
                                    {navItems.map((item, index) => {
                                        const isActive = activeSection === (item.href.substring(1) || "home");
                                        return (
                                            <motion.div
                                                key={item.name}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    onClick={() => handleNavClick(item.href)}
                                                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                                                        isActive
                                                            ? "bg-primary text-primary-foreground font-semibold scale-105"
                                                            : "hover:bg-primary/10 hover:translate-x-1"
                                                    }`}
                                                >
                                                    <item.icon className="w-5 h-5 shrink-0" />
                                                    <span className="text-base">{item.name}</span>
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
