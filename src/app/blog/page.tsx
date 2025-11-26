import { getPublishedBlogPosts } from "@/lib/firestore";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

function formatDate(timestamp: { seconds: number } | null): string {
  if (!timestamp) return "";
  return new Date(timestamp.seconds * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts(50);

  return (
    <SectionWrapper id="blog">
      <div className="min-h-screen py-8">
        <div className="text-center mb-12">
          <h1 className="section-title text-4xl md:text-5xl mb-4">
            My <span className="gradient-text">Blog</span>
          </h1>
          <p className="section-subtitle text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development, technology, and software engineering.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="glass rounded-2xl p-12 max-w-md mx-auto">
              <p className="text-muted-foreground text-lg mb-2">No posts yet</p>
              <p className="text-sm text-muted-foreground/70">
                Check back soon for new content!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group glass rounded-2xl overflow-hidden hover:ring-2 hover:ring-primary/30 transition-all duration-300"
              >
                {post.coverImage && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.createdAt as unknown as { seconds: number })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {estimateReadTime(post.content)} min read
                    </span>
                  </div>
                  
                  <h2 className="card-title text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs"
                        >
                          <Tag className="w-2.5 h-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    Read more
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="glass rounded-full px-6 py-3 inline-flex items-center gap-2 hover:bg-primary/20 transition-all"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
