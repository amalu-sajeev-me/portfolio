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
        <SectionWrapper id="skills" className="bg-secondary/5 rounded-3xl my-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Technical <span className="text-primary">Skills</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(skills).map(([category, items], index) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors"
                    >
                        <h3 className="text-xl font-semibold mb-4 text-secondary">{category}</h3>
                        <div className="flex flex-wrap gap-2">
                            {items.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-3 py-1 bg-secondary/10 text-secondary-foreground rounded-full text-sm font-medium hover:bg-secondary/20 transition-colors cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
}
