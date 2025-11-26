import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  author: {
    uid: string;
    name: string;
    email: string;
    photoURL?: string;
  };
  tags: string[];
  published: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Comment {
  id?: string;
  postId: string;
  content: string;
  author: {
    uid: string;
    name: string;
    email: string;
    photoURL?: string;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const BLOG_COLLECTION = "blog_posts";
const COMMENTS_COLLECTION = "comments";

// Helper to remove undefined values from an object
function removeUndefined<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined)
  ) as Partial<T>;
}

// Create a new blog post
export async function createBlogPost(post: Omit<BlogPost, "id" | "createdAt" | "updatedAt">) {
  const cleanPost = removeUndefined(post);
  const docRef = await addDoc(collection(db, BLOG_COLLECTION), {
    ...cleanPost,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

// Update a blog post
export async function updateBlogPost(id: string, updates: Partial<BlogPost>) {
  const docRef = doc(db, BLOG_COLLECTION, id);
  const cleanUpdates = removeUndefined(updates);
  await updateDoc(docRef, {
    ...cleanUpdates,
    updatedAt: serverTimestamp(),
  });
}

// Delete a blog post
export async function deleteBlogPost(id: string) {
  const docRef = doc(db, BLOG_COLLECTION, id);
  await deleteDoc(docRef);
}

// Get a single blog post by ID
export async function getBlogPost(id: string): Promise<BlogPost | null> {
  const docRef = doc(db, BLOG_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as BlogPost;
  }
  return null;
}

// Get a blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const q = query(collection(db, BLOG_COLLECTION), where("slug", "==", slug), limit(1));
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as BlogPost;
  }
  return null;
}

// Get all published blog posts
export async function getPublishedBlogPosts(limitCount = 10): Promise<BlogPost[]> {
  const q = query(
    collection(db, BLOG_COLLECTION),
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as BlogPost[];
}

// Get all blog posts (admin)
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const q = query(collection(db, BLOG_COLLECTION), orderBy("createdAt", "desc"));
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as BlogPost[];
}

// Get blog posts by tag
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const q = query(
    collection(db, BLOG_COLLECTION),
    where("tags", "array-contains", tag),
    where("published", "==", true),
    orderBy("createdAt", "desc")
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as BlogPost[];
}

// ============ COMMENTS ============

// Create a new comment
export async function createComment(comment: Omit<Comment, "id" | "createdAt" | "updatedAt">) {
  const docRef = await addDoc(collection(db, COMMENTS_COLLECTION), {
    ...comment,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

// Get comments for a post
export async function getCommentsForPost(postId: string): Promise<Comment[]> {
  const q = query(
    collection(db, COMMENTS_COLLECTION),
    where("postId", "==", postId),
    orderBy("createdAt", "asc")
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Comment[];
}

// Delete a comment (by author or admin)
export async function deleteComment(id: string) {
  const docRef = doc(db, COMMENTS_COLLECTION, id);
  await deleteDoc(docRef);
}

// Update a comment
export async function updateComment(id: string, content: string) {
  const docRef = doc(db, COMMENTS_COLLECTION, id);
  await updateDoc(docRef, {
    content,
    updatedAt: serverTimestamp(),
  });
}
