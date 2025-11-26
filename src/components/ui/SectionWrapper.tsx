"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
    children: ReactNode;
    className?: string;
    id?: string;
    /** Parallax offset amount (default: 50) */
    parallaxOffset?: number;
}

export default function SectionWrapper({
    children,
    className,
    id,
    parallaxOffset = 50
}: SectionWrapperProps) {
    const ref = useRef<HTMLElement>(null);
    
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Smooth parallax transform - content moves up as you scroll
    const y = useTransform(scrollYProgress, [0, 1], [parallaxOffset, -parallaxOffset]);
    const springY = useSpring(y, { stiffness: 80, damping: 20 });
    
    // Fade in as section enters viewport center
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);
    const springOpacity = useSpring(opacity, { stiffness: 80, damping: 20 });
    
    // Subtle scale effect for depth
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);
    const springScale = useSpring(scale, { stiffness: 80, damping: 20 });

    return (
        <section
            ref={ref}
            id={id}
            className={cn(
                "py-16 md:py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto w-full relative",
                className
            )}
        >
            <motion.div
                style={{
                    y: springY,
                    opacity: springOpacity,
                    scale: springScale
                }}
            >
                {children}
            </motion.div>
        </section>
    );
}
