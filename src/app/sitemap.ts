import { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/firestore";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://amalusajeev.me";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // Dynamic blog post URLs
  try {
    const posts = await getPublishedBlogPosts(100);
    const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${siteUrl}/blog/${post.id}`,
      lastModified: post.updatedAt?.toDate() || new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    }));
    return [...staticPages, ...blogPages];
  } catch {
    // If Firestore fails during build, return only static pages
    return staticPages;
  }
}
