"use client";

import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Settings, ArrowLeft } from "lucide-react";

export default function AdminPage() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const { isAdmin } = useIsAdmin();

  if (loading) {
    return (
      <SectionWrapper id="admin">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </SectionWrapper>
    );
  }

  if (!user) {
    return (
      <SectionWrapper id="admin" className="text-center">
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="section-title text-3xl md:text-4xl mb-4">Admin Access</h1>
          <p className="section-subtitle text-muted-foreground mx-auto mb-8">
            Sign in to access the admin dashboard.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={signInWithGoogle}
            className="glass rounded-full px-6 py-3 flex items-center gap-3 hover:bg-primary/20 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="font-medium">Sign in with Google</span>
          </motion.button>
        </div>
      </SectionWrapper>
    );
  }

  if (!isAdmin) {
    return (
      <SectionWrapper id="admin" className="text-center">
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="section-title text-3xl md:text-4xl mb-4 text-red-500">Access Denied</h1>
          <p className="section-subtitle text-muted-foreground mx-auto mb-2">
            Your account does not have admin privileges.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Signed in as: {user.email}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="glass rounded-full px-5 py-3 flex items-center gap-2 hover:bg-primary/20 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Home
            </Link>
            <button
              onClick={signOut}
              className="glass rounded-full px-5 py-3 hover:bg-red-500/20 transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="admin">
      <div className="min-h-[60vh] space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="section-title text-3xl md:text-4xl mb-2">
              Admin <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-muted-foreground">
              Manage your blog posts and site content
            </p>
          </div>
          <Link
            href="/"
            className="glass rounded-full px-4 py-2 flex items-center gap-2 hover:bg-primary/20 transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Site
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/blog/new">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass p-6 rounded-2xl cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all h-full"
            >
              <FileText className="w-8 h-8 text-primary mb-4" />
              <h3 className="card-title text-xl mb-2">Create New Post</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Draft and publish a new blog post with markdown support.
              </p>
            </motion.div>
          </Link>

          <Link href="/admin/blog">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass p-6 rounded-2xl cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all h-full"
            >
              <Settings className="w-8 h-8 text-secondary mb-4" />
              <h3 className="card-title text-xl mb-2">Manage Posts</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Edit, publish, unpublish, or delete existing blog posts.
              </p>
            </motion.div>
          </Link>
        </div>

        <div className="glass p-4 rounded-xl text-sm text-muted-foreground">
          <strong className="text-foreground">Signed in as:</strong> {user.email}
        </div>
      </div>
    </SectionWrapper>
  );
}
