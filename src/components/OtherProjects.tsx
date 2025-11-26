"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";

const projects = [
    {
        title: "PDF Page Extractor",
        description: "A tool to extract pages from PDF files. Built upon express.js, uses MongoDB as database and Cloudinary for storage.",
        tags: ["Express.js", "MongoDB", "Cloudinary"],
        links: {
            github: "#", // Placeholder
            demo: "#",   // Placeholder
        },
    },
    {
        title: "InMemoryMemoize",
        description: "A key-value memoization package for Node.js with no other dependencies, utilizing the latest JavaScript technologies.",
        tags: ["Node.js", "JavaScript", "NPM Package"],
        links: {
            github: "#",
            demo: "#",
        },
    },
    {
        title: "Better Hash Router",
        description: "A better routing solution using hashed anchor tags on HTML pages for improved navigation experience.",
        tags: ["JavaScript", "Routing", "HTML"],
        links: {
            github: "#",
            demo: "#",
        },
    },
];

export default function OtherProjects() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="group relative glass rounded-3xl overflow-hidden hover:glow transition-all"
                >
                    <div className="p-6 flex flex-col h-full relative z-10">
                        <h3 className="text-xl font-bold mb-2 gradient-text">
                            {project.title}
                        </h3>
                        <p className="text-foreground/80 mb-4 flex-grow">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-4 mt-auto pt-4 border-t border-border">
                            <Link
                                href={project.links.github}
                                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Github className="w-4 h-4" />
                                Code
                            </Link>
                            <Link
                                href={project.links.demo}
                                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-secondary transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Live Demo
                            </Link>
                        </div>
                    </div>
                    
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
            ))}
        </div>
    );
}
