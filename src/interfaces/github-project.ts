// src/interfaces/github-project.ts

/**
 * Shape of a GitHub repository returned from the
 * GitHub REST API v3 (trimmed to what the app needs).
 */
export interface GithubProject {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;

  /* extra fields used on the flip‑card back face */
  full_name?: string;    // e.g. "GCRodz/my‑repo"
  updated_at?: string;   // ISO timestamp, e.g. "2025‑07‑18T09:11:23Z"
}
