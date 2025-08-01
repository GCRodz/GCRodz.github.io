// src/components/gitprofile.tsx
import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { formatDistance } from 'date-fns';
import {
  CustomError,
  GENERIC_ERROR,
  INVALID_CONFIG_ERROR,
  INVALID_GITHUB_USERNAME_ERROR,
  setTooManyRequestError,
} from '../constants/errors';
import '../assets/index.css';
import { getInitialTheme, getSanitizedConfig, setupHotjar } from '../utils';
import { SanitizedConfig } from '../interfaces/sanitized-config';
import ErrorPage from './error-page';
import { DEFAULT_THEMES } from '../constants/default-themes';
import ThemeChanger from './theme-changer';
import { BG_COLOR } from '../constants';
import AvatarCard from './avatar-card';
import { Profile } from '../interfaces/profile';
import DetailsCard from './details-card';
import SkillCard from './skill-card';
import ExperienceCard from './experience-card';
import EducationCard from './education-card';
import CertificationCard from './certification-card';
import { GithubProject } from '../interfaces/github-project';
import GithubProjectCard from './github-project-card';
import ExternalProjectCard from './external-project-card';
import BlogCard from './blog-card';
import Footer from './footer';
import PublicationCard from './publication-card';
import FlipCard from './FlipCard';

/* -------------------------------------------------------------------------- */

const GitProfile = ({ config }: { config: Config }) => {
  const [sanitizedConfig] = useState<SanitizedConfig | Record<string, never>>(
    getSanitizedConfig(config),
  );
  const [theme, setTheme] = useState<string>(DEFAULT_THEMES[0]);
  const [error, setError] = useState<CustomError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [githubProjects, setGithubProjects] = useState<GithubProject[]>([]);

  /* ------------------------- fetch GitHub repositories -------------------- */
  const getGithubProjects = useCallback(
    async (publicRepoCount: number): Promise<GithubProject[]> => {
      if (sanitizedConfig.projects.github.mode === 'automatic') {
        if (publicRepoCount === 0) return [];

        const excludeRepo = sanitizedConfig.projects.github.automatic.exclude.projects
          .map((p) => `+-repo:${p}`)
          .join('');

        const query = `user:${sanitizedConfig.github.username}+fork:${!sanitizedConfig.projects.github.automatic.exclude.forks}${excludeRepo}`;
        const url = `https://api.github.com/search/repositories?q=${query}&sort=${sanitizedConfig.projects.github.automatic.sortBy}&per_page=${sanitizedConfig.projects.github.automatic.limit}&type=Repositories`;

        const { data } = await axios.get(url, {
          headers: { 'Content-Type': 'application/vnd.github.v3+json' },
        });

        return data.items;
      }

      /* manual list */
      if (sanitizedConfig.projects.github.manual.projects.length === 0) return [];

      const repos = sanitizedConfig.projects.github.manual.projects
        .map((p) => `+repo:${p}`)
        .join('');
      const url = `https://api.github.com/search/repositories?q=${repos}+fork:true&type=Repositories`;

      const { data } = await axios.get(url, {
        headers: { 'Content-Type': 'application/vnd.github.v3+json' },
      });

      return data.items;
    },
    [sanitizedConfig],
  );

  /* ---------------------------- load profile ------------------------------ */
  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `https://api.github.com/users/${sanitizedConfig.github.username}`,
      );

      setProfile({
        avatar: data.avatar_url,          // <- fixed key
        name: data.name || ' ',
        bio: data.bio || '',
        location: data.location || '',
        company: data.company || '',
      });

      if (sanitizedConfig.projects.github.display) {
        setGithubProjects(await getGithubProjects(data.public_repos));
      }
    } catch (err) {
      handleError(err as AxiosError | Error);
    } finally {
      setLoading(false);
    }
  }, [sanitizedConfig, getGithubProjects]);

  /* --------------------------- side‑effects ------------------------------- */
  useEffect(() => {
    if (Object.keys(sanitizedConfig).length === 0) {
      setError(INVALID_CONFIG_ERROR);
    } else {
      setError(null);
      setTheme(getInitialTheme(sanitizedConfig.themeConfig));
      setupHotjar(sanitizedConfig.hotjar);
      loadData();
    }
  }, [sanitizedConfig, loadData]);

  useEffect(() => {
    if (theme) document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  /* ----------------------------- error util ------------------------------- */
  const handleError = (err: AxiosError | Error): void => {
    console.error(err);

    if (err instanceof AxiosError) {
      const status = err.response?.status;
      if (status === 403) {
        const reset = formatDistance(
          new Date((err.response?.headers['x-ratelimit-reset'] ?? 0) * 1000),
          new Date(),
          { addSuffix: true },
        );
        setError(setTooManyRequestError(reset));
      } else if (status === 404) {
        setError(INVALID_GITHUB_USERNAME_ERROR);
      } else {
        setError(GENERIC_ERROR);
      }
    } else {
      setError(GENERIC_ERROR);
    }
  };

  /* ------------------------------------------------------------------------ */
  return (
    <div className="fade-in h-screen">
      {error ? (
        <ErrorPage {...error} />
      ) : (
        <>
          <div className={`p-4 lg:p-10 min-h-full ${BG_COLOR}`}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-box">
              {/* ---------------- LEFT COLUMN ---------------- */}
              <div className="col-span-1">
                <div className="grid grid-cols-1 gap-6">
                  {!sanitizedConfig.themeConfig.disableSwitch && (
                    <ThemeChanger
                      theme={theme}
                      setTheme={setTheme}
                      loading={loading}
                      themeConfig={sanitizedConfig.themeConfig}
                    />
                  )}

                  {/* Avatar flip card */}
                  <div className="min-h-[340px] overflow-visible">
                    <FlipCard
                      className="group"
                      height={340}
                      /* ---------- FRONT ---------- */
                      front={
                        <div className="relative h-full">
                         <AvatarCard
  profile={profile}
  loading={loading}
  avatarRing={sanitizedConfig.themeConfig.displayAvatarRing}
  subtitle="Ph.D. Candidate at Penn State"
  className="h-full"
/>
                          {!loading && (
                            <span className="flip-hint absolute bottom-2 right-2 text-[11px] text-base-content/50 pointer-events-none transition-opacity duration-200 group-hover:opacity-0">
                              Hover to Flip Card
                            </span>
                          )}
                        </div>
                      }
                      /* ---------- BACK ---------- */
                      back={
                        <div className="card bg-base-200 rounded-box p-4 h-full overflow-auto">
                          <h3 className="font-semibold mb-2">About me</h3>
                          <p>{profile?.bio || 'No bio yet.'}</p>
                        </div>
                      }
                    />
                  </div>

                  <DetailsCard
  profile={profile}
  loading={loading}
  github={sanitizedConfig.github}
  social={sanitizedConfig.social}
  links={{
    scholar : 'https://scholar.google.com/citations?user=WPUMZVYAAAAJ&hl=en',
    github  : `https://github.com/${sanitizedConfig.github.username}`,
    linkedin: 'https://www.linkedin.com/in/gc-rodz',
    email   : 'gjc5485@psu.edu',
    cv      : '/cv.pdf',
  }}
/>
                  {sanitizedConfig.skills.length > 0 && (
                    <SkillCard loading={loading} skills={sanitizedConfig.skills} />
                  )}
                  {sanitizedConfig.experiences.length > 0 && (
                    <ExperienceCard loading={loading} experiences={sanitizedConfig.experiences} />
                  )}
                  {sanitizedConfig.certifications.length > 0 && (
                    <CertificationCard
                      loading={loading}
                      certifications={sanitizedConfig.certifications}
                    />
                  )}
                  {sanitizedConfig.educations.length > 0 && (
                    <EducationCard loading={loading} educations={sanitizedConfig.educations} />
                  )}
                </div>
              </div>

              {/* ---------------- RIGHT COLUMN ---------------- */}
              <div className="lg:col-span-2 col-span-1">
                <div className="grid grid-cols-1 gap-6">
                  {sanitizedConfig.publications.length > 0 && (
                    <PublicationCard loading={loading} publications={sanitizedConfig.publications} />
                  )}
                  {sanitizedConfig.projects.external.projects.length > 0 && (
                    <ExternalProjectCard
                      loading={loading}
                      header={sanitizedConfig.projects.external.header}
                      externalProjects={sanitizedConfig.projects.external.projects}
                      googleAnalyticId={sanitizedConfig.googleAnalytics.id}
                    />
                  )}
                  {sanitizedConfig.projects.github.display && (
                    <GithubProjectCard
                      header={sanitizedConfig.projects.github.header}
                      limit={sanitizedConfig.projects.github.automatic.limit}
                      githubProjects={githubProjects}
                      loading={loading}
                      googleAnalyticsId={sanitizedConfig.googleAnalytics.id}
                    />
                  )}
                  {sanitizedConfig.blog.display && (
                    <BlogCard
                      loading={loading}
                      googleAnalyticsId={sanitizedConfig.googleAnalytics.id}
                      blog={sanitizedConfig.blog}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {sanitizedConfig.footer && (
            <footer className={`p-4 footer ${BG_COLOR} text-base-content footer-center`}>
              <div className="card card-sm bg-base-100 shadow-sm">
                <Footer content={sanitizedConfig.footer} loading={loading} />
              </div>
            </footer>
          )}
        </>
      )}
    </div>
  );
};

export default GitProfile;
