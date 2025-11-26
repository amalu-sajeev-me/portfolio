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
                    className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-1"
                >
                    <div className="p-6 flex flex-col h-full">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 flex-grow">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs font-medium px-2 py-1 rounded-md bg-primary/10 text-primary"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-4 mt-auto">
                            <Link
                                href={project.links.github}
                                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Github className="w-4 h-4" />
                                Code
                            </Link>
                            <Link
                                href={project.links.demo}
                                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Live Demo
                            </Link>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
