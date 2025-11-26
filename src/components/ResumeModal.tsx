"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, FileText, Loader2 } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { getResumeInfo, ResumeInfo } from "@/lib/resume";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [resumeInfo, setResumeInfo] = useState<ResumeInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch resume info when modal opens
  const fetchResume = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const info = await getResumeInfo();
      setResumeInfo(info);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchResume();
    }
  }, [isOpen, fetchResume]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex flex-col"
          >
            <div className="glass rounded-3xl flex flex-col h-full overflow-hidden border border-border">
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-border shrink-0">
                <h2 className="text-xl md:text-2xl font-bold gradient-text">Resume</h2>
                <div className="flex items-center gap-2">
                  {resumeInfo && (
                    <>
                      <a
                        href={resumeInfo.url}
                        download={resumeInfo.fileName}
                        className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all text-sm"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download PDF</span>
                      </a>
                      <a
                        href={resumeInfo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-primary/10 transition-all text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Open in New Tab</span>
                      </a>
                    </>
                  )}
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full glass hover:bg-red-500/20 hover:text-red-500 transition-all"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Mobile download buttons */}
              {resumeInfo && (
                <div className="flex sm:hidden gap-2 p-4 border-b border-border shrink-0">
                  <a
                    href={resumeInfo.url}
                    download={resumeInfo.fileName}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                  <a
                    href={resumeInfo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full glass text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open
                  </a>
                </div>
              )}

              {/* Content */}
              <div className="flex-1 overflow-hidden">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-muted-foreground">Loading resume...</p>
                  </div>
                ) : error || !resumeInfo ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 px-4 text-center">
                    <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center">
                      <FileText className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Resume Not Available</h3>
                      <p className="text-muted-foreground max-w-md">
                        The resume hasn&apos;t been uploaded yet. Please check back later or contact me directly.
                      </p>
                    </div>
                    <a
                      href="mailto:amalu.sajeev.me@gmail.com"
                      className="mt-4 px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all"
                    >
                      Contact Me
                    </a>
                  </div>
                ) : (
                  <iframe
                    src={`${resumeInfo.url}#view=FitH&toolbar=0`}
                    className="w-full h-full bg-gray-100"
                    title="Resume PDF"
                  />
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
