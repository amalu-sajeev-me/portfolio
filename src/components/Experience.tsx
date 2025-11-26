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
        <SectionWrapper id="experience">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Work <span className="text-primary">Experience</span>
            </h2>

            <div className="relative border-l border-border ml-4 md:ml-10 space-y-12">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative pl-8 md:pl-12"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background" />

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <h3 className="text-xl font-semibold text-foreground">{exp.role}</h3>
                            <span className="text-sm text-muted-foreground font-medium bg-secondary/10 px-3 py-1 rounded-full w-fit mt-2 sm:mt-0">
                                {exp.period}
                            </span>
                        </div>

                        <div className="text-base text-primary mb-2">{exp.company}</div>
                        <div className="text-sm text-muted-foreground mb-4">{exp.location}</div>
                        <p className="text-muted-foreground leading-relaxed">
                            {exp.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
}
