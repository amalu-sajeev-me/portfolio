"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { Comment, getCommentsForPost, createComment, deleteComment } from "@/lib/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Trash2, User, LogIn } from "lucide-react";

function formatDate(timestamp: { seconds: number } | null): string {
  if (!timestamp) return "";
  return new Date(timestamp.seconds * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getInitials(name?: string | null): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

interface Props {
  postId: string;
}

export default function CommentsSection({ postId }: Props) {
  const { user, signInWithGoogle } = useAuth();
  const { isAdmin } = useIsAdmin();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadComments = useCallback(async () => {
    try {
      const data = await getCommentsForPost(postId);
      setComments(data);
    } catch (error) {
      console.error("Failed to load comments:", error);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await createComment({
        postId,
        content: newComment.trim(),
        author: {
          uid: user.uid,
          name: user.displayName || "Anonymous",
          email: user.email || "",
          photoURL: user.photoURL || undefined,
        },
      });
      setNewComment("");
      await loadComments();
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (deletingId) return;
    setDeletingId(commentId);
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error("Failed to delete comment:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const canDelete = (comment: Comment) => {
    return isAdmin || comment.author.uid === user?.uid;
  };

  return (
    <section className="glass rounded-2xl p-6 md:p-8">
      <h2 className="flex items-center gap-2 text-xl font-bold mb-6">
        <MessageCircle className="w-5 h-5 text-primary" />
        Comments ({comments.length})
      </h2>

      {/* Comment Form or Sign-in Prompt */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex items-start gap-3">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-full border border-border shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-white shrink-0">
                {getInitials(user.displayName)}
              </div>
            )}
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full bg-background/50 border border-border rounded-xl p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none min-h-[100px]"
                disabled={isSubmitting}
              />
              <div className="flex justify-end mt-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={!newComment.trim() || isSubmitting}
                  className="glass rounded-full px-5 py-2 flex items-center gap-2 hover:bg-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span className="font-medium">Post Comment</span>
                </motion.button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="glass rounded-xl p-6 mb-8 text-center">
          <p className="text-muted-foreground mb-4">
            Sign in to join the conversation
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={signInWithGoogle}
            className="glass rounded-full px-5 py-2.5 inline-flex items-center gap-2 hover:bg-primary/20 transition-all"
          >
            <LogIn className="w-4 h-4" />
            <span className="font-medium">Sign in with Google</span>
          </motion.button>
        </div>
      )}

      {/* Comments List */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  {comment.author.photoURL ? (
                    <img
                      src={comment.author.photoURL}
                      alt={comment.author.name}
                      className="w-10 h-10 rounded-full border border-border shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-medium text-foreground truncate">
                        {comment.author.name}
                      </span>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {formatDate(comment.createdAt as unknown as { seconds: number })}
                      </span>
                    </div>
                    <p className="text-foreground/80 text-sm leading-relaxed whitespace-pre-wrap">
                      {comment.content}
                    </p>
                    {canDelete(comment) && (
                      <button
                        onClick={() => handleDelete(comment.id!)}
                        disabled={deletingId === comment.id}
                        className="mt-2 text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors disabled:opacity-50"
                      >
                        {deletingId === comment.id ? (
                          <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-3 h-3" />
                        )}
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
