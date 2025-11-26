import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export default function SectionWrapper({ children, className, id }: SectionWrapperProps) {
    return (
        <section id={id} className={cn("py-20 px-4 md:px-8 max-w-7xl mx-auto", className)}>
            {children}
        </section>
    );
}
