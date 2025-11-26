import { getBlogPost, getPublishedBlogPosts } from "@/lib/firestore";
import SectionWrapper from "@/components/ui/SectionWrapper";
import CommentsSection from "@/components/blog/CommentsSection";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, Tag, User } from "lucide-react";

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

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts(100);
  return posts.map((post) => ({
    id: post.id,
  }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getBlogPost(id);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <SectionWrapper id="blog-post">
      <article className="min-h-screen py-8 max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/blog"
          className="glass rounded-full px-4 py-2 inline-flex items-center gap-2 hover:bg-primary/20 transition-all mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="aspect-video rounded-2xl overflow-hidden mb-8">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-8">
          <h1 className="section-title text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              {post.author.photoURL ? (
                <img
                  src={post.author.photoURL}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full border border-border"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
              )}
              <span className="font-medium text-foreground">{post.author.name}</span>
            </div>
            <span className="hidden sm:inline text-border">•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.createdAt as unknown as { seconds: number })}
            </span>
            <span className="hidden sm:inline text-border">•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {estimateReadTime(post.content)} min read
            </span>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="glass rounded-2xl p-6 md:p-8 lg:p-10 mb-12">
          <div 
            className="prose prose-invert prose-lg max-w-none leading-relaxed blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Comments Section */}
        <CommentsSection postId={post.id!} />
      </article>
    </SectionWrapper>
  );
}
