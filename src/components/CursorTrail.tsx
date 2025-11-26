"use client";

import { useEffect, useRef } from "react";

export default function CursorTrail() {
    const trailsRef = useRef<Set<HTMLDivElement>>(new Set());

    useEffect(() => {
        const colors = [
            "rgba(99, 102, 241, 0.8)",  // primary
            "rgba(168, 85, 247, 0.8)",  // secondary
            "rgba(59, 130, 246, 0.8)",  // accent
        ];

        let rafId: number;
        let lastX = 0;
        let lastY = 0;
        const minDistance = 5; // Minimum distance before creating new trail

        const createTrail = (x: number, y: number) => {
            // Check distance from last position
            const distance = Math.sqrt(
                Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2)
            );

            if (distance < minDistance) return;

            lastX = x;
            lastY = y;

            const trail = document.createElement("div");
            trail.className = "cursor-trail";
            trail.style.left = `${x}px`;
            trail.style.top = `${y}px`;
            
            // Random color from palette
            const color = colors[Math.floor(Math.random() * colors.length)];
            trail.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
            
            document.body.appendChild(trail);
            trailsRef.current.add(trail);

            // Remove after animation
            setTimeout(() => {
                trail.remove();
                trailsRef.current.delete(trail);
            }, 800);
        };

        const handleMouseMove = (e: MouseEvent) => {
            // Use RAF for smooth performance
            if (rafId) cancelAnimationFrame(rafId);
            
            rafId = requestAnimationFrame(() => {
                createTrail(e.clientX, e.clientY);
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (rafId) cancelAnimationFrame(rafId);
            
            // Cleanup all trails
            trailsRef.current.forEach(trail => trail.remove());
            trailsRef.current.clear();
        };
    }, []);

    return null;
}
