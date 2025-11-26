"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionWrapper from "./ui/SectionWrapper";

interface Experience {
    company: string;
    role: string;
    period: string;
    location: string;
    description: string;
}

const experiences: Experience[] = [
    {
        company: "Asthra AI",
        role: "Founding Engineer",
        period: "07/2025 - Present",
        location: "Hyderabad, India",
        description: "Shaped engineering foundation, resulting in $1 min. efficiency savings by implementing scalable infrastructure. Leading full-stack development efforts and architecting scalable systems for real-time document intelligence.",
    },
    {
        company: "Codequirk Software Solutions",
        role: "Senior Software Engineer",
        period: "05/2024 - 06/2025",
        location: "Hyderabad, India",
        description: "Specialized in dynamic UIs with Angular, React, and responsive design. Backend development with NestJS, GraphQL, Node.js, Express.js, MongoDB.",
    },
    {
        company: "Codequirk Software Solutions",
        role: "Full Stack Developer",
        period: "12/2023 - 05/2024",
        location: "Hyderabad, India",
        description: "Freelance Full-stack Developer specializing in dynamic UIs and responsive design. Operated remotely ensuring seamless web app integration and performance.",
    },
    {
        company: "Valuefy",
        role: "SDE",
        period: "05/2023 - 07/2023",
        location: "Mumbai, India",
        description: "Worked on investment management technology with cutting-edge solutions serving leading financial institutions.",
    },
    {
        company: "Vamstar",
        role: "Junior Software Engineer",
        period: "05/2022 - 04/2023",
        location: "Hyderabad, India",
        description: "Developed rich feature sets including Messaging Center and Document Center. Implemented UI elements in React and managed No-SQL databases like Elasticsearch, MongoDB, and DynamoDB.",
    },
];

function ExperienceItem({
    exp,
    index,
    isOpen,
    onToggle,
}: {
    exp: Experience;
    index: number;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-6 md:pl-12 group"
        >
            {/* Enhanced Timeline Dot */}
            <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-primary ring-4 ring-background group-hover:scale-125 transition-transform glow" />

            <div
                className="glass rounded-2xl p-4 sm:p-6 cursor-pointer transition-all hover:ring-2 hover:ring-primary/30"
                onClick={onToggle}
            >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                        <h3 className="card-title text-lg sm:text-xl text-foreground pr-2">{exp.role}</h3>
                        <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="text-primary"
                        >
                            <ChevronDown className="h-5 w-5" />
                        </motion.div>
                    </div>
                    <span className="tech-text text-secondary-foreground bg-secondary/20 px-3 py-1 rounded-full w-fit whitespace-nowrap">
                        {exp.period}
                    </span>
                </div>

                <div className="card-title text-sm sm:text-base text-primary mb-2">{exp.company}</div>
                <div className="text-xs sm:text-sm text-muted-foreground tracking-wide mb-1">{exp.location}</div>

                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                            className="overflow-hidden"
                        >
                            <p className="body-text text-sm sm:text-base text-foreground/90 pt-3 border-t border-primary/10 mt-3">
                                {exp.description}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

export default function Experience() {
    // First item open by default (index 0)
    const [expanded, setExpanded] = useState<number>(0);

    const handleToggle = (index: number) => {
        // Only switch to the clicked item, one must always be open
        setExpanded(index);
    };

    return (
        <SectionWrapper id="experience" className="grid-pattern">
            <div className="text-center mb-16">
                <h2 className="section-title text-3xl md:text-4xl lg:text-5xl mb-6">
                    Work <span className="gradient-text">Experience</span>
                </h2>
                <p className="section-subtitle text-muted-foreground mx-auto">
                    My professional journey and contributions
                </p>
            </div>

            <div className="max-w-4xl mx-auto relative border-l-2 border-primary/30 ml-4 md:ml-8 space-y-8 md:space-y-10">
                {experiences.map((exp, index) => (
                    <ExperienceItem
                        key={index}
                        exp={exp}
                        index={index}
                        isOpen={expanded === index}
                        onToggle={() => handleToggle(index)}
                    />
                ))}
            </div>
        </SectionWrapper>
    );
}
