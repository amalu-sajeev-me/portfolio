"use client";

import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from "framer-motion";
import React, { MouseEvent } from "react";

interface TiltCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    tiltMaxAngleX?: number;
    tiltMaxAngleY?: number;
    scale?: number;
}

export default function TiltCard({
    children,
    className = "",
    tiltMaxAngleX = 10,
    tiltMaxAngleY = 10,
    scale = 1.05,
    ...props
}: TiltCardProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [tiltMaxAngleX, -tiltMaxAngleX]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-tiltMaxAngleY, tiltMaxAngleY]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            whileHover={{ scale }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            {...props}
        >
            <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }} className="h-full w-full">
                {children}
            </div>
        </motion.div>
    );
}
