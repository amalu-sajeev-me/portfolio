"use client";

import { useState, useEffect, use, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { getBlogPost, updateBlogPost } from "@/lib/firestore";
import SectionWrapper from "@/components/ui/SectionWrapper";
import RichTextEditor from "@/components/blog/RichTextEditor";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Eye, X, Plus } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditBlogPostPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [published, setPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const loading = authLoading || adminLoading;

  const loadPost = useCallback(async () => {
    try {
      const post = await getBlogPost(id);
      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setExcerpt(post.excerpt);
        setCoverImage(post.coverImage || "");
        setTags(post.tags);
        setPublished(post.published);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Failed to load post:", error);
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isAdmin && id) {
      loadPost();
    }
  }, [isAdmin, id, loadPost]);

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !isAdmin || isSubmitting) return;

    if (!title.trim() || !content.trim() || !excerpt.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateBlogPost(id, {
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt.trim(),
        coverImage: coverImage.trim() || undefined,
        tags,
        published,
      });

      router.push("/admin/blog");
    } catch (error) {
      console.error("Failed to update post:", error);
      alert("Failed to update post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || isLoading) {
    return (
      <SectionWrapper id="edit-post">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </SectionWrapper>
    );
  }

  if (!user) {
    return (
      <SectionWrapper id="edit-post" className="text-center">
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="section-title text-3xl md:text-4xl mb-4">Sign In Required</h1>
          <p className="text-muted-foreground mb-8">Sign in to edit blog posts.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={signInWithGoogle}
            className="glass rounded-full px-6 py-3 hover:bg-primary/20 transition-all"
          >
            Sign in with Google
          </motion.button>
        </div>
      </SectionWrapper>
    );
  }

  if (!isAdmin) {
    return (
      <SectionWrapper id="edit-post" className="text-center">
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="section-title text-3xl md:text-4xl mb-4 text-red-500">Access Denied</h1>
          <p className="text-muted-foreground mb-8">You don&apos;t have permission to edit posts.</p>
          <Link href="/" className="glass rounded-full px-6 py-3 hover:bg-primary/20 transition-all">
            Go Home
          </Link>
        </div>
      </SectionWrapper>
    );
  }

  if (notFound) {
    return (
      <SectionWrapper id="edit-post" className="text-center">
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="section-title text-3xl md:text-4xl mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The post you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/admin/blog" className="glass rounded-full px-6 py-3 hover:bg-primary/20 transition-all">
            Back to Posts
          </Link>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="edit-post">
      <div className="min-h-screen py-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/admin/blog"
            className="glass rounded-full px-4 py-2 flex items-center gap-2 hover:bg-primary/20 transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Posts
          </Link>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="glass rounded-full px-4 py-2 flex items-center gap-2 hover:bg-primary/20 transition-all text-sm"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? "Edit" : "Preview"}
          </button>
        </div>

        <h1 className="section-title text-3xl md:text-4xl mb-8">
          Edit <span className="gradient-text">Post</span>
        </h1>

        {showPreview ? (
          /* Preview Mode */
          <div className="glass rounded-2xl p-6 md:p-8">
            {coverImage && (
              <div className="aspect-video rounded-xl overflow-hidden mb-6">
                <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
              </div>
            )}
            <h2 className="text-3xl font-bold mb-4">{title || "Untitled Post"}</h2>
            <p className="text-muted-foreground mb-6">{excerpt || "No excerpt"}</p>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div 
              className="prose prose-invert max-w-none text-foreground/80"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        ) : (
          /* Edit Mode */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title..."
                className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium mb-2">Excerpt *</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief description for previews..."
                rows={2}
                className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                required
              />
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium mb-2">Cover Image URL</label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium mb-2">Content *</label>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Write your post content here..."
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  placeholder="Add a tag..."
                  className="flex-1 bg-background/50 border border-border rounded-xl px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  type="button"
                  onClick={addTag}
                  title="Add tag"
                  className="glass rounded-xl px-4 py-2 hover:bg-primary/20 transition-all"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        aria-label={`Remove ${tag} tag`}
                        className="hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Published Toggle */}
            <div className="flex items-center gap-3">
              <label htmlFor="published" className="relative inline-flex items-center cursor-pointer">
                <input
                  id="published"
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-border rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
              <span className="text-sm font-medium">
                {published ? "Published" : "Draft"}
              </span>
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-4 pt-4">
              <Link
                href="/admin/blog"
                className="glass rounded-full px-6 py-3 hover:bg-primary/10 transition-all"
              >
                Cancel
              </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="glass rounded-full px-6 py-3 flex items-center gap-2 bg-primary/20 hover:bg-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                <span className="font-medium">Save Changes</span>
              </motion.button>
            </div>
          </form>
        )}
      </div>
    </SectionWrapper>
  );
}
