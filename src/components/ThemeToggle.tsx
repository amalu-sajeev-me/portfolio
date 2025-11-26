"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"dark" | "light" | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
        setTheme(initialTheme);
        applyTheme(initialTheme);
    }, []);

    const applyTheme = (newTheme: "dark" | "light") => {
        if (newTheme === "light") {
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
    };

    useEffect(() => {
        if (theme) {
            applyTheme(theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        applyTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    // Don't render anything until mounted to avoid hydration mismatch
    if (!mounted) {
        return (
            <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full glass min-h-11 min-w-11 flex items-center justify-center">
                <div className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
        );
    }

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            onClick={toggleTheme}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full glass glow hover:scale-110 transition-transform min-h-11 min-w-11 flex items-center justify-center"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
            ) : (
                <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
            )}
        </motion.button>
    );
}
