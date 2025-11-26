"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Mail,
  Clock,
  Trash2,
  Check,
  CheckCheck,
  Reply,
  Filter,
  Loader2,
  ArrowLeft,
  Bell,
  BellOff,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { Message, markMessageAsRead, deleteMessage } from "@/lib/firestore";
import { requestNotificationPermission, onForegroundMessage } from "@/lib/firebase";
import { saveFCMToken } from "@/lib/firestore";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export default function AdminMessagesPage() {
  const router = useRouter();
  const { isAdmin, loading: adminLoading, user } = useIsAdmin();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [enablingNotifications, setEnablingNotifications] = useState(false);

  // Check notification permission status
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setNotificationsEnabled(Notification.permission === "granted");
    }
  }, []);

  // Real-time messages listener
  useEffect(() => {
    if (!isAdmin) return;

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(messagesData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching messages:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAdmin]);

  // Listen for foreground messages
  useEffect(() => {
    if (!isAdmin || !notificationsEnabled) return;

    const unsubscribe = onForegroundMessage((payload) => {
      console.log("Foreground message received:", payload);
      // Show a browser notification even when in foreground
      if (Notification.permission === "granted") {
        const notification = payload as { notification?: { title?: string; body?: string } };
        new Notification(notification.notification?.title || "New Message", {
          body: notification.notification?.body || "You have a new message",
          icon: "/favicon.ico",
        });
      }
    });

    return unsubscribe;
  }, [isAdmin, notificationsEnabled]);

  const handleEnableNotifications = useCallback(async () => {
    if (!user) return;
    
    setEnablingNotifications(true);
    try {
      const token = await requestNotificationPermission();
      if (token) {
        await saveFCMToken(user.uid, token);
        setNotificationsEnabled(true);
      }
    } catch (error) {
      console.error("Failed to enable notifications:", error);
    } finally {
      setEnablingNotifications(false);
    }
  }, [user]);

  const handleMarkAsRead = async (id: string, currentStatus: boolean) => {
    try {
      await markMessageAsRead(id, !currentStatus);
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    
    try {
      await deleteMessage(id);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const filteredMessages = messages.filter((message) => {
    if (filter === "unread") return !message.read;
    if (filter === "read") return message.read;
    return true;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  // Redirect if not admin
  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      router.push("/");
    }
  }, [adminLoading, isAdmin, router]);

  if (adminLoading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Admin
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold gradient-text flex items-center gap-3">
                <MessageSquare className="w-8 h-8" />
                Messages
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-sm px-2 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </h1>
              <p className="text-muted-foreground mt-1">
                View and respond to messages from visitors
              </p>
            </div>
            
            {/* Notification Toggle */}
            <button
              onClick={handleEnableNotifications}
              disabled={notificationsEnabled || enablingNotifications}
              className={`glass rounded-full px-4 py-2 flex items-center gap-2 transition-all ${
                notificationsEnabled
                  ? "text-green-500"
                  : "hover:bg-primary/10"
              }`}
            >
              {enablingNotifications ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : notificationsEnabled ? (
                <Bell className="w-4 h-4" />
              ) : (
                <BellOff className="w-4 h-4" />
              )}
              <span className="text-sm">
                {notificationsEnabled ? "Notifications On" : "Enable Notifications"}
              </span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {(["all", "unread", "read"] as const).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === filterOption
                  ? "bg-primary text-primary-foreground"
                  : "glass hover:bg-primary/10"
              }`}
            >
              <Filter className="w-4 h-4 inline mr-2" />
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              {filterOption === "unread" && unreadCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Messages List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredMessages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-12 text-center"
          >
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {filter === "all"
                ? "No messages yet"
                : filter === "unread"
                ? "No unread messages"
                : "No read messages"}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filteredMessages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`glass rounded-2xl p-6 transition-all ${
                    !message.read ? "border-l-4 border-primary" : ""
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      {/* Sender Info */}
                      <div className="flex items-center gap-3">
                        {message.photoURL ? (
                          <img
                            src={message.photoURL}
                            alt={message.name}
                            className="w-10 h-10 rounded-full border border-border"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-bold">
                              {message.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{message.name}</h3>
                            <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">
                              Verified
                            </span>
                          </div>
                          <a
                            href={`mailto:${message.email}`}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                          >
                            <Mail className="w-3 h-3" />
                            {message.email}
                          </a>
                        </div>
                      </div>

                      {/* Message Content */}
                      <p className="text-foreground whitespace-pre-wrap">
                        {message.message}
                      </p>

                      {/* Timestamp */}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {message.createdAt?.toDate
                          ? message.createdAt.toDate().toLocaleString()
                          : "Just now"}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex sm:flex-col gap-2">
                      <button
                        onClick={() => handleMarkAsRead(message.id!, message.read)}
                        className={`p-2 rounded-lg transition-all ${
                          message.read
                            ? "glass hover:bg-primary/10 text-muted-foreground"
                            : "bg-primary/10 text-primary hover:bg-primary/20"
                        }`}
                        title={message.read ? "Mark as unread" : "Mark as read"}
                      >
                        {message.read ? (
                          <CheckCheck className="w-4 h-4" />
                        ) : (
                          <Check className="w-4 h-4" />
                        )}
                      </button>
                      <a
                        href={`mailto:${message.email}?subject=Re: Message from ${message.name}&body=%0A%0A----%0AOriginal message:%0A${encodeURIComponent(message.message)}`}
                        className="p-2 rounded-lg glass hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all"
                        title="Reply via email"
                      >
                        <Reply className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleDelete(message.id!)}
                        className="p-2 rounded-lg glass hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-all"
                        title="Delete message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}
