/**
 * Minimal subset of the GitHub REST API repo object we use in the UI.
 */
export interface GithubProject {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;

  /* extra fields we render on the back face */
  full_name?: string;   // e.g. "GCRodz/repo"
  updated_at?: string;  // ISO timestamp
}
