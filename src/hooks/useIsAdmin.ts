"use client";

import { useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { isAdminEmail } from "@/lib/admin";

export function useIsAdmin() {
  const { user, loading } = useAuth();
  const isAdmin = useMemo(() => isAdminEmail(user?.email), [user?.email]);
  return { isAdmin, loading };
}
