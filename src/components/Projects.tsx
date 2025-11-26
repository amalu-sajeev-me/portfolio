import SectionWrapper from "./ui/SectionWrapper";
import { Suspense } from "react";
import GithubProjects from "./GithubProjects";
import GithubContributions from "./GithubContributions";
import OtherProjects from "./OtherProjects";

export default function Projects() {
    return (
        <SectionWrapper id="projects">
            <div className="mb-12">
                <Suspense fallback={<div className="text-center py-4">Loading GitHub activity...</div>}>
                    <GithubContributions username="amalu-sajeev-me" />
                </Suspense>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-12 mt-16 text-center">
                Featured <span className="text-primary">Projects</span>
            </h2>

            <div className="mb-16">
                <h3 className="text-2xl font-semibold mb-8 text-secondary">
                    Pinned on GitHub
                </h3>
                <Suspense fallback={<div className="text-center py-10">Loading GitHub projects...</div>}>
                    <GithubProjects username="amalu-sajeev-me" />
                </Suspense>
            </div>

            <h3 className="text-2xl font-semibold mb-8 text-secondary">
                Other Projects
            </h3>
            <OtherProjects />
        </SectionWrapper>
    );
}
