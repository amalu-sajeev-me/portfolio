import { doc, setDoc, getDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

const RESUME_DOC = "settings/resume";

export interface ResumeInfo {
  url: string;
  fileName: string;
  uploadedAt: Date;
}

// Save resume URL (for PDFs hosted on GitHub, Google Drive, etc.)
export async function saveResumeUrl(url: string, fileName: string): Promise<ResumeInfo> {
  if (!url.trim()) {
    throw new Error("URL is required");
  }

  const resumeInfo = {
    url: url.trim(),
    fileName: fileName.trim() || "resume.pdf",
    uploadedAt: serverTimestamp(),
  };

  await setDoc(doc(db, RESUME_DOC), resumeInfo);

  return {
    url: resumeInfo.url,
    fileName: resumeInfo.fileName,
    uploadedAt: new Date(),
  };
}

// Get current resume info
export async function getResumeInfo(): Promise<ResumeInfo | null> {
  try {
    const docSnap = await getDoc(doc(db, RESUME_DOC));
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.deleted) return null;
      return {
        url: data.url,
        fileName: data.fileName,
        uploadedAt: data.uploadedAt?.toDate() || new Date(),
      };
    }
    return null;
  } catch (error) {
    console.error("Error getting resume info:", error);
    return null;
  }
}

// Delete resume entry
export async function deleteResume(): Promise<void> {
  try {
    await deleteDoc(doc(db, RESUME_DOC));
  } catch (error) {
    console.error("Error deleting resume:", error);
    throw error;
  }
}
