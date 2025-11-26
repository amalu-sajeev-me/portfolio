"use client";

import { useEffect, useState } from "react";
import {
  User,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider, githubProvider } from "@/lib/firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Successfully signed in with Google:', result.user.displayName);
      return result.user;
    } catch (error: any) {
      console.error("Error signing in with Google:", error);
      
      // Handle specific error codes
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled');
      } else if (error.code === 'auth/popup-blocked') {
        setError('Popup blocked. Please allow popups for this site.');
      } else {
        setError('Failed to sign in with Google');
      }
      
      throw error;
    }
  };

  const signInWithGithub = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, githubProvider);
      console.log('Successfully signed in with GitHub:', result.user.displayName);
      return result.user;
    } catch (error: any) {
      console.error("Error signing in with GitHub:", error);
      
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled');
      } else if (error.code === 'auth/popup-blocked') {
        setError('Popup blocked. Please allow popups for this site.');
      } else {
        setError('Failed to sign in with GitHub');
      }
      
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await firebaseSignOut(auth);
      console.log('Successfully signed out');
    } catch (error) {
      console.error("Error signing out:", error);
      setError('Failed to sign out');
      throw error;
    }
  };

  return {
    user,
    loading,
    error,
    signInWithGoogle,
    signInWithGithub,
    signOut,
  };
}
