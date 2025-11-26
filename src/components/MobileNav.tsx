"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Briefcase, Code, FolderGit2, Mail, Shield, BookOpen } from "lucide-react";
import Link from "next/link";
import LoginButton from "./LoginButton";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useNotifications } from "./NotificationProvider";

const navItems = [
    { name: "Home", href: "#", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Skills", href: "#skills", icon: Code },
    { name: "Projects", href: "#projects", icon: FolderGit2 },
    { name: "Contact", href: "#contact", icon: Mail },
    { name: "Blog", href: "/blog", icon: BookOpen, isPage: true },
];

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const { isAdmin } = useIsAdmin();
    const { unreadCount } = useNotifications();

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems
                .filter(item => !item.isPage)
                .map(item => item.href.substring(1) || "home");
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

    const handleNavClick = (href: string, isPage?: boolean) => {
        setIsOpen(false);
        if (!isPage && href === "#") {
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
                        const isActive = !item.isPage && activeSection === (item.href.substring(1) || "home");
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => handleNavClick(item.href, item.isPage)}
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

            {/* Login Button - Desktop */}
            <div className="hidden lg:flex fixed right-20 top-8 z-40 items-center gap-3">
                {isAdmin && (
                    <Link
                        href="/admin"
                        className="glass rounded-full px-4 py-2 hover:bg-primary/20 transition-all flex items-center gap-2 relative"
                    >
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Admin</span>
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                {unreadCount > 9 ? "9+" : unreadCount}
                            </span>
                        )}
                    </Link>
                )}
                <LoginButton />
            </div>

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
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-xl sm:text-2xl font-bold gradient-text">
                                        Navigation
                                    </h2>
                                    <div className="flex items-center gap-2 lg:hidden">
                                        {isAdmin && (
                                            <Link
                                                href="/admin"
                                                onClick={() => setIsOpen(false)}
                                                className="glass rounded-full p-2 hover:bg-primary/20 transition-all relative"
                                                aria-label="Admin"
                                            >
                                                <Shield className="w-5 h-5 text-primary" />
                                                {unreadCount > 0 && (
                                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                                                        {unreadCount > 9 ? "9+" : unreadCount}
                                                    </span>
                                                )}
                                            </Link>
                                        )}
                                        <LoginButton />
                                    </div>
                                </div>
                                <div className="space-y-2">{navItems.map((item, index) => {
                                        const isActive = !item.isPage && activeSection === (item.href.substring(1) || "home");
                                        return (
                                            <motion.div
                                                key={item.name}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    onClick={() => handleNavClick(item.href, item.isPage)}
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
