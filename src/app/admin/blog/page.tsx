"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { BlogPost, getAllBlogPosts, deleteBlogPost, updateBlogPost } from "@/lib/firestore";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Edit, Trash2, Eye, EyeOff, Plus, Calendar, ExternalLink } from "lucide-react";

function formatDate(timestamp: { seconds: number } | null): string {
  if (!timestamp) return "";
  return new Date(timestamp.seconds * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ManagePostsPage() {
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const loading = authLoading || adminLoading;

  useEffect(() => {
    if (isAdmin) {
      loadPosts();
    }
  }, [isAdmin]);

  const loadPosts = async () => {
    try {
      const data = await getAllBlogPosts();
      setPosts(data);
    } catch (error) {
      console.error("Failed to load posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    setDeletingId(id);
    try {
      await deleteBlogPost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert("Failed to delete post");
    } finally {
      setDeletingId(null);
    }
  };

  const togglePublished = async (post: BlogPost) => {
    setTogglingId(post.id!);
    try {
      await updateBlogPost(post.id!, { published: !post.published });
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, published: !p.published } : p))
      );
    } catch (error) {
      console.error("Failed to update post:", error);
      alert("Failed to update post");
    } finally {
      setTogglingId(null);
    }
  };

  if (loading) {
    return (
      <SectionWrapper id="manage-posts">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </SectionWrapper>
    );
  }

  if (!user) {
    return (
      <SectionWrapper id="manage-posts" className="text-center">
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="section-title text-3xl md:text-4xl mb-4">Sign In Required</h1>
          <p className="text-muted-foreground mb-8">Sign in to manage blog posts.</p>
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
      <SectionWrapper id="manage-posts" className="text-center">
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="section-title text-3xl md:text-4xl mb-4 text-red-500">Access Denied</h1>
          <p className="text-muted-foreground mb-8">You don&apos;t have permission to manage posts.</p>
          <Link href="/" className="glass rounded-full px-6 py-3 hover:bg-primary/20 transition-all">
            Go Home
          </Link>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="manage-posts">
      <div className="min-h-screen py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/admin"
            className="glass rounded-full px-4 py-2 flex items-center gap-2 hover:bg-primary/20 transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Admin
          </Link>
          <Link
            href="/admin/blog/new"
            className="glass rounded-full px-4 py-2 flex items-center gap-2 bg-primary/20 hover:bg-primary/30 transition-all text-sm"
          >
            <Plus className="w-4 h-4" />
            New Post
          </Link>
        </div>

        <h1 className="section-title text-3xl md:text-4xl mb-8">
          Manage <span className="gradient-text">Posts</span>
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-muted-foreground text-lg mb-4">No posts yet</p>
            <Link
              href="/admin/blog/new"
              className="glass rounded-full px-6 py-3 inline-flex items-center gap-2 hover:bg-primary/20 transition-all"
            >
              <Plus className="w-5 h-5" />
              Create your first post
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="glass rounded-xl p-4 md:p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Post Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg truncate">{post.title}</h3>
                        <span
                          className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${
                            post.published
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {post.published ? "Published" : "Draft"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.createdAt as unknown as { seconds: number })}
                        </span>
                        {post.tags.length > 0 && (
                          <span className="truncate">
                            Tags: {post.tags.slice(0, 3).join(", ")}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      {post.published && (
                        <Link
                          href={`/blog/${post.id}`}
                          target="_blank"
                          className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                          title="View post"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </Link>
                      )}
                      <button
                        onClick={() => togglePublished(post)}
                        disabled={togglingId === post.id}
                        className="p-2 rounded-lg hover:bg-primary/10 transition-colors disabled:opacity-50"
                        title={post.published ? "Unpublish" : "Publish"}
                      >
                        {togglingId === post.id ? (
                          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        ) : post.published ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                      <Link
                        href={`/admin/blog/edit/${post.id}`}
                        className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                        title="Edit post"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id!)}
                        disabled={deletingId === post.id}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors disabled:opacity-50"
                        title="Delete post"
                      >
                        {deletingId === post.id ? (
                          <div className="w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
