const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://amalusajeev.me";

export function PersonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Amalu Sajeev",
    alternateName: ["Aromal Sajeev", "Amalu"],
    url: siteUrl,
    image: `${siteUrl}/profile.jpg`,
    sameAs: [
      "https://github.com/amalu-sajeev-me",
      "https://www.linkedin.com/in/amalu-sajeev-me/",
    ],
    jobTitle: "Founding Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Startup",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressCountry: "India",
    },
    email: "mailto:amalu.sajeev.me@gmail.com",
    knowsAbout: [
      "Full Stack Development",
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "Python",
      "AI Systems",
      "Cloud Infrastructure",
      "Firebase",
      "PostgreSQL",
      "MongoDB",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Your University", // Update this
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Amalu Sajeev Portfolio",
    alternateName: "Aromal Sajeev Portfolio",
    url: siteUrl,
    description:
      "Portfolio of Amalu Sajeev (Aromal Sajeev), a Founding Engineer and Full-Stack Developer specializing in AI-driven systems and scalable infrastructure.",
    author: {
      "@type": "Person",
      name: "Amalu Sajeev",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ProfilePageJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Amalu Sajeev",
      alternateName: ["Aromal Sajeev", "Amalu"],
      description:
        "Founding Engineer and Full-Stack Developer specializing in AI-driven systems and scalable infrastructure",
      image: `${siteUrl}/profile.jpg`,
      sameAs: [
        "https://github.com/amalu-sajeev-me",
        "https://www.linkedin.com/in/amalu-sajeev-me/",
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
