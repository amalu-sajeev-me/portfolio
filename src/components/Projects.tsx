import SectionWrapper from "./ui/SectionWrapper";
import { Suspense } from "react";
import GithubProjects from "./GithubProjects";
import GithubContributions from "./GithubContributions";
import OtherProjects from "./OtherProjects";
import ParallaxSection from "./ui/ParallaxSection";

export default function Projects() {
    return (
        <SectionWrapper id="projects">
            <div className="space-y-16">
                {/* GitHub Activity */}
                <div className="w-full">
                    <Suspense fallback={<div className="text-center py-4 text-muted-foreground">Loading GitHub activity...</div>}>
                        <GithubContributions username="amalu-sajeev-me" />
                    </Suspense>
                </div>

                {/* Section Title */}
                <ParallaxSection offset={30} className="text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A showcase of my recent work and open-source contributions
                    </p>
                </ParallaxSection>

                {/* Pinned Projects */}
                <div className="space-y-6">
                    <h3 className="text-xl md:text-2xl font-semibold text-secondary flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-linear-to-b from-primary to-secondary rounded-full" />
                        Pinned on GitHub
                    </h3>
                    <Suspense fallback={
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="glass rounded-2xl p-6 h-48 animate-pulse" />
                            ))}
                        </div>
                    }>
                        <GithubProjects username="amalu-sajeev-me" />
                    </Suspense>
                </div>

                {/* Other Projects */}
                <div className="space-y-6">
                    <h3 className="text-xl md:text-2xl font-semibold text-secondary flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-linear-to-b from-secondary to-accent rounded-full" />
                        Other Projects
                    </h3>
                    <OtherProjects />
                </div>
            </div>
        </SectionWrapper>
    );
}
