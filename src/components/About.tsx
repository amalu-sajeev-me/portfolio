"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./ui/SectionWrapper";
import { Code2, Rocket, Users } from "lucide-react";
import { useRef, useState } from "react";

function TiltCard({ children, delay }: { children: React.ReactNode; delay: number }) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setTilt({ x: y * 10, y: -x * 10 });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: "transform 0.1s ease"
            }}
            className="glass rounded-2xl p-6 cursor-pointer"
        >
            {children}
        </motion.div>
    );
}

export default function About() {
    return (
        <SectionWrapper id="about" className="relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl mx-auto space-y-12"
            >
                <div className="text-center">
                    <h2 className="section-title text-3xl md:text-4xl lg:text-5xl mb-6">
                        About <span className="gradient-text">Me</span>
                    </h2>
                </div>

                <div className="glass rounded-3xl p-8 md:p-10 glow">
                    <p className="body-text text-base md:text-lg text-foreground text-center md:text-left">
                        I&apos;m <strong>Amalu Sajeev</strong> (also known as <strong>Aromal Sajeev</strong>), an experienced full-stack developer with a proven track record as a founding engineer, specializing in architecting scalable, AI-driven regulatory writing systems. Based in <strong>Hyderabad, India</strong>, I&apos;m skilled in modern JavaScript frameworks, AWS cloud services, and real-time data processing. I contribute to product strategy and technical vision for startup growth. Adept at leading development efforts from concept to deployment, with strong communication and collaboration skills for dynamic, innovative teams.
                    </p>
                </div>

                {/* Highlight Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    <TiltCard delay={0.2}>
                        <Code2 className="w-8 h-8 text-primary mb-4" />
                        <h3 className="card-title text-lg mb-3">Full-Stack Expert</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Modern JavaScript frameworks, cloud services, and scalable architecture
                        </p>
                    </TiltCard>

                    <TiltCard delay={0.3}>
                        <Rocket className="w-8 h-8 text-secondary mb-4" />
                        <h3 className="card-title text-lg mb-3">Founding Engineer</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Building products from 0 to 1 with strategic technical vision
                        </p>
                    </TiltCard>

                    <TiltCard delay={0.4}>
                        <Users className="w-8 h-8 text-accent mb-4" />
                        <h3 className="card-title text-lg mb-3">Team Leadership</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Strong collaboration and communication in dynamic teams
                        </p>
                    </TiltCard>
                </div>
            </motion.div>
        </SectionWrapper>
    );
}
