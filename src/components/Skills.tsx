"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./ui/SectionWrapper";

const skills = {
    Frontend: [
        "HTML", "CSS", "JavaScript", "jQuery", "TypeScript", "ReactJS", "Next.js", "Angular"
    ],
    Backend: [
        "Node.js", "Express.js", "NestJS", "PHP", "Python"
    ],
    Database: [
        "MongoDB", "Redis", "Elasticache", "MySQL", "Firebase"
    ],
    "Tools & Cloud": [
        "Figma", "Git", "Linux", "AWS", "GCP"
    ]
};

export default function Skills() {
    return (
        <SectionWrapper id="skills" className="grid-pattern">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    Technical <span className="gradient-text">Skills</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Technologies and tools I work with
                </p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {Object.entries(skills).map(([category, items], index) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="glass p-6 rounded-2xl hover:scale-[1.02] transition-all glow"
                    >
                        <h3 className="text-xl font-semibold mb-4 text-secondary">{category}</h3>
                        <div className="flex flex-wrap gap-2">
                            {items.map((skill) => (
                                <motion.span
                                    key={skill}
                                    whileHover={{ scale: 1.1 }}
                                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors cursor-default border border-primary/20"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
}
