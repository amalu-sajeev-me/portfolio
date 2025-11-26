const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

export interface PinnedRepo {
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}

export interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionData {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export async function getPinnedRepos(username: string): Promise<PinnedRepo[]> {
  const token = process.env.GITHUB_TOKEN;
  console.log('[getPinnedRepos] Token exists:', !!token, 'Length:', token?.length);

  if (!token) {
    console.warn("GITHUB_TOKEN is not set. Returning empty list.");
    return [];
  }

  const query = `
    query User($username: String!) {
      user(login: $username) {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              forkCount
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(GITHUB_GRAPHQL_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    const json = await response.json();

    if (json.errors) {
      console.error("GitHub API Errors:", json.errors);
      return [];
    }

    return json.data.user.pinnedItems.nodes;
  } catch (error) {
    console.error("Failed to fetch pinned repos:", error);
    return [];
  }
}

export async function getContributionData(username: string): Promise<ContributionData | null> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn("GITHUB_TOKEN is not set. Cannot fetch contribution data.");
    return null;
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(GITHUB_GRAPHQL_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    const json = await response.json();

    if (json.errors) {
      console.error("GitHub API Errors:", json.errors);
      return null;
    }

    return json.data.user.contributionsCollection.contributionCalendar;
  } catch (error) {
    console.error("Failed to fetch contribution data:", error);
    return null;
  }
}
