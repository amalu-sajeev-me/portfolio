"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"dark" | "light">("dark");

    useEffect(() => {
        // Check for saved theme preference or default to dark
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

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        applyTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            onClick={toggleTheme}
            className="fixed top-6 right-6 z-50 p-3 rounded-full glass glow hover:scale-110 transition-transform"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
            )}
        </motion.button>
    );
}
