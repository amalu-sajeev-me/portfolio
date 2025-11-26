"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./ui/SectionWrapper";
import { Code2, Rocket, Users } from "lucide-react";

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
                    About <span className="gradient-text">Me</span>
                </h2>

                <div className="glass rounded-3xl p-8 glow mb-8">
                    <p className="text-lg text-foreground leading-relaxed">
                        Experienced full-stack developer with a proven track record as a founding engineer, specializing in architecting scalable, AI-driven regulatory writing systems. Skilled in modern JavaScript frameworks, AWS cloud services, and real-time data processing, I contribute to product strategy and technical vision for startup growth. Adept at leading development efforts from concept to deployment, with strong communication and collaboration skills for dynamic, innovative teams.
                    </p>
                </div>

                {/* Highlight Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="glass rounded-2xl p-6 hover:scale-105 transition-transform"
                    >
                        <Code2 className="w-8 h-8 text-primary mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Full-Stack Expert</h3>
                        <p className="text-sm text-muted-foreground">
                            Modern JavaScript frameworks, cloud services, and scalable architecture
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="glass rounded-2xl p-6 hover:scale-105 transition-transform"
                    >
                        <Rocket className="w-8 h-8 text-secondary mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Founding Engineer</h3>
                        <p className="text-sm text-muted-foreground">
                            Building products from 0 to 1 with strategic technical vision
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="glass rounded-2xl p-6 hover:scale-105 transition-transform"
                    >
                        <Users className="w-8 h-8 text-accent mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Team Leadership</h3>
                        <p className="text-sm text-muted-foreground">
                            Strong collaboration and communication in dynamic teams
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </SectionWrapper>
    );
}
