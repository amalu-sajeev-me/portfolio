"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

interface NotificationContextType {
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType>({ unreadCount: 0 });

export function useNotifications() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { isAdmin } = useIsAdmin();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!isAdmin) {
      setUnreadCount(0);
      return;
    }

    // Listen to unread messages count in real-time
    const q = query(collection(db, "messages"), where("read", "==", false));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUnreadCount(snapshot.size);
    }, (error) => {
      console.error("Error listening to unread messages:", error);
    });

    return () => unsubscribe();
  }, [isAdmin]);

  return (
    <NotificationContext.Provider value={{ unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
}
