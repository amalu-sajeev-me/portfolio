"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./ui/SectionWrapper";

export default function About() {
    return (
        <SectionWrapper id="about" className="relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                    About <span className="text-primary">Me</span>
                </h2>

                <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors shadow-xl">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Experienced full-stack developer with a proven track record as a founding engineer, specializing in architecting scalable, AI-driven regulatory writing systems. Skilled in modern JavaScript frameworks, AWS cloud services, and real-time data processing, I contribute to product strategy and technical vision for startup growth. Adept at leading development efforts from concept to deployment, with strong communication and collaboration skills for dynamic, innovative teams.
                    </p>
                </div>
            </motion.div>
        </SectionWrapper>
    );
}
