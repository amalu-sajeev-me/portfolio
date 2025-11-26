"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useAuth } from "@/hooks/useAuth";
import { saveResumeUrl, getResumeInfo, deleteResume, ResumeInfo } from "@/lib/resume";
import { ArrowLeft, Link as LinkIcon, FileText, Trash2, Download, Loader2, AlertCircle, Check, ExternalLink, Github } from "lucide-react";

export default function AdminResumePage() {
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [resumeInfo, setResumeInfo] = useState<ResumeInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (!adminLoading && !authLoading) {
      if (!user || !isAdmin) {
        router.push("/");
      }
    }
  }, [isAdmin, user, adminLoading, authLoading, router]);

  useEffect(() => {
    async function fetchResumeInfo() {
      try {
        const info = await getResumeInfo();
        setResumeInfo(info);
        if (info) {
          setUrl(info.url);
          setFileName(info.fileName);
        }
      } catch (err) {
        console.error("Error fetching resume:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchResumeInfo();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    setSaving(true);
    try {
      const info = await saveResumeUrl(url, fileName);
      setResumeInfo(info);
      setSuccess("Resume URL saved successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Save error:", err);
      setError(err instanceof Error ? err.message : "Failed to save resume URL");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to remove the resume?")) return;
    
    setDeleting(true);
    setError(null);
    try {
      await deleteResume();
      setResumeInfo(null);
      setUrl("");
      setFileName("");
      setSuccess("Resume removed successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to remove resume");
    } finally {
      setDeleting(false);
    }
  };

  if (adminLoading || authLoading || loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/admin"
            className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Admin
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Resume Management</h1>
          <p className="text-gray-400 mb-8">Add a link to your PDF resume for visitors to view and download</p>

          {/* Info Box */}
          <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <Github className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div className="text-sm text-blue-200">
                <p className="font-medium mb-1">How to host your resume:</p>
                <ol className="list-decimal list-inside space-y-1 text-blue-300">
                  <li>Add your PDF file to the <code className="bg-blue-500/20 px-1 rounded">public/</code> folder in your repo</li>
                  <li>Push to GitHub and deploy</li>
                  <li>Enter the URL: <code className="bg-blue-500/20 px-1 rounded">https://amalusajeev.me/resume.pdf</code></li>
                </ol>
              </div>
            </div>
          </div>

          {/* Error/Success Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <p className="text-red-300">{error}</p>
              </motion.div>
            )}
            
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3"
              >
                <Check className="w-5 h-5 text-green-400 shrink-0" />
                <p className="text-green-300">{success}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* URL Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label htmlFor="resume-url" className="block text-sm font-medium text-gray-300 mb-2">
                Resume URL *
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="resume-url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://amalusajeev.me/resume.pdf"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="file-name" className="block text-sm font-medium text-gray-300 mb-2">
                Display Name (optional)
              </label>
              <input
                id="file-name"
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Amalu_Sajeev_Resume.pdf"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Save Resume URL
                </>
              )}
            </button>
          </form>

          {/* Current Resume */}
          {resumeInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10"
            >
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                Current Resume
              </h2>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-white font-medium truncate">{resumeInfo.fileName}</p>
                  <p className="text-sm text-gray-400 truncate">
                    {resumeInfo.url}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Added {resumeInfo.uploadedAt.toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={resumeInfo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View
                  </a>
                  
                  <a
                    href={resumeInfo.url}
                    download={resumeInfo.fileName}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>

                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors disabled:opacity-50"
                    aria-label="Remove resume"
                  >
                    {deleting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* PDF Preview */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Preview</h3>
                <div className="aspect-[8.5/11] bg-gray-800 rounded-lg overflow-hidden">
                  <iframe
                    src={`${resumeInfo.url}#view=FitH`}
                    className="w-full h-full"
                    title="Resume Preview"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
