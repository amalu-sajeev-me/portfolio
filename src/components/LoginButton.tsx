"use client";

import { useAuth } from "@/hooks/useAuth";
import { LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function getInitials(name?: string | null): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function LoginButton() {
  const { user, loading, error, signInWithGoogle, signOut } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      // Error is handled in useAuth hook
    } finally {
      setIsSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div className="glass rounded-full p-3 animate-pulse">
        <User className="w-5 h-5" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        {user.photoURL && !imgError ? (
          <img
            src={user.photoURL}
            alt={user.displayName || "User"}
            className="w-8 h-8 rounded-full border-2 border-primary"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-8 h-8 rounded-full border-2 border-primary bg-linear-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-white">
            {getInitials(user.displayName)}
          </div>
        )}
        <span className="hidden md:inline text-sm font-medium max-w-[100px] truncate">{user.displayName}</span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={signOut}
          className="glass rounded-full px-3 py-1.5 flex items-center gap-1.5 hover:bg-red-500/20 hover:text-red-400 transition-all text-sm"
          aria-label="Sign out"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </motion.button>
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleGoogleSignIn}
        disabled={isSigningIn}
        className="glass rounded-full px-4 py-2 hover:bg-primary/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSigningIn ? (
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        )}
        <span className="text-sm font-medium">
          {isSigningIn ? "Signing in..." : "Sign in with Google"}
        </span>
      </motion.button>
      
      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 right-0 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-sm text-red-500 whitespace-nowrap z-50"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
