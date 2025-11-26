"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxSectionProps {
    children: ReactNode;
    offset?: number;
    className?: string;
}

export default function ParallaxSection({
    children,
    offset = 50,
    className = ""
}: ParallaxSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
    const springY = useSpring(y, { stiffness: 100, damping: 30 });

    return (
        <div ref={ref} className={className}>
            <motion.div style={{ y: springY }}>
                {children}
            </motion.div>
        </div>
    );
}
