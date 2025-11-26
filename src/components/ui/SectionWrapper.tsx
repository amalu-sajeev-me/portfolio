import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export default function SectionWrapper({ children, className, id }: SectionWrapperProps) {
    return (
        <section id={id} className={cn("py-16 md:py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto w-full", className)}>
            {children}
        </section>
    );
}
