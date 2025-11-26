# GitHub Integration Setup Guide

## Overview
Your portfolio now dynamically fetches and displays your pinned GitHub repositories using the GitHub GraphQL API.

## Setup Instructions

### 1. Create a GitHub Personal Access Token (PAT)

1. Go to [GitHub Settings → Developer Settings → Personal Access Tokens](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a descriptive name (e.g., "Portfolio Website")
4. Set expiration (recommend 90 days or 1 year)
5. Select scopes:
   - ✅ `public_repo` (for public repositories)
   - Or ✅ `repo` (if you want to include private repos)
6. Click **"Generate token"**
7. **Copy the token immediately** (you won't see it again!)

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
GITHUB_TOKEN=your_github_personal_access_token_here
```

**Important:** Never commit `.env.local` to version control. It's already in `.gitignore`.

### 3. Update Your GitHub Username

Edit `/src/components/Projects.tsx` and replace `"amalu-sajeev"` with your GitHub username:

```typescript
<GithubProjects username="YOUR_GITHUB_USERNAME" />
```

### 4. Pin Your Best Repositories

1. Go to your GitHub profile
2. Click **"Customize your pins"**
3. Select up to 6 repositories to showcase
4. These will automatically appear on your portfolio!

## Features

- **Real-time Data**: Fetches repository name, description, stars, forks, and primary language
- **Automatic Updates**: Data is cached for 1 hour, then refreshed
- **Fallback Handling**: Shows a friendly message if the token isn't set
- **Performance**: Uses Next.js Server Components for optimal loading

## Testing

Run the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` and scroll to the Projects section. You should see:
1. **"Pinned on GitHub"** section with your actual repos
2. **"Other Projects"** section with manual entries

## Deployment

When deploying to Vercel, Netlify, or similar:

1. Add `GITHUB_TOKEN` to your deployment environment variables
2. The value should be your Personal Access Token
3. Redeploy the site

## Troubleshooting

**No repositories showing?**
- Check that `GITHUB_TOKEN` is set in `.env.local`
- Verify you have pinned repositories on your GitHub profile
- Check the browser console for errors

**Build warnings about GITHUB_TOKEN?**
- This is normal during build time if the token isn't set
- The site will still build successfully and show a fallback message

## Next Steps

Consider adding:
- GitHub contribution graph
- Total stars/followers count
- Recent activity feed
- Blog posts from GitHub Gists
