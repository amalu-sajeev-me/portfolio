"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./ui/SectionWrapper";

const experiences = [
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

export default function Experience() {
    return (
        <SectionWrapper id="experience" className="grid-pattern">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    Work <span className="gradient-text">Experience</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    My professional journey and contributions
                </p>
            </div>

            <div className="max-w-4xl mx-auto relative border-l-2 border-primary/30 ml-4 md:ml-8 space-y-8 md:space-y-10">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative pl-6 md:pl-12 group"
                    >
                        {/* Enhanced Timeline Dot */}
                        <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-primary ring-4 ring-background group-hover:scale-125 transition-transform glow" />

                        <div className="glass rounded-2xl p-4 sm:p-6 hover:scale-[1.02] transition-all">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                                <h3 className="text-lg sm:text-xl font-semibold text-foreground pr-2">{exp.role}</h3>
                                <span className="text-xs sm:text-sm text-secondary-foreground font-medium bg-secondary/20 px-3 py-1 rounded-full w-fit whitespace-nowrap">
                                    {exp.period}
                                </span>
                            </div>

                            <div className="text-sm sm:text-base text-primary font-semibold mb-2">{exp.company}</div>
                            <div className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{exp.location}</div>
                            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                                {exp.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
}
