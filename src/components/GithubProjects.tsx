import { getPinnedRepos } from "@/lib/github";
import { Star, GitFork, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

interface GithubProjectsProps {
    username: string;
}

export default async function GithubProjects({ username }: GithubProjectsProps) {
    console.log('[GithubProjects] Fetching repos for:', username);
    const repos = await getPinnedRepos(username);
    console.log('[GithubProjects] Received repos:', repos.length, repos);

    if (repos.length === 0) {
        return (
            <div className="text-center text-muted-foreground py-10">
                <p>No pinned repositories found or GITHUB_TOKEN not set.</p>
                <p className="text-sm mt-2">Please configure your GitHub token and pinned repositories.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
                <div
                    key={repo.name}
                    className="group flex flex-col h-full bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-primary">
                            <Github className="w-5 h-5" />
                            <span className="font-semibold truncate">{repo.name}</span>
                        </div>
                        <Link
                            href={repo.url}
                            target="_blank"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ExternalLink className="w-4 h-4" />
                        </Link>
                    </div>

                    <p className="text-sm text-muted-foreground mb-6 flex-grow line-clamp-3">
                        {repo.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                        <div className="flex items-center gap-4">
                            {repo.primaryLanguage && (
                                <div className="flex items-center gap-1.5">
                                    <span
                                        className="w-2.5 h-2.5 rounded-full"
                                        style={{ backgroundColor: repo.primaryLanguage.color }}
                                    />
                                    <span>{repo.primaryLanguage.name}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5" />
                                <span>{repo.stargazerCount}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <GitFork className="w-3.5 h-3.5" />
                                <span>{repo.forkCount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
