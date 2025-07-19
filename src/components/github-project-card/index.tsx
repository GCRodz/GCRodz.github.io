import { Fragment } from 'react';
import {
  AiOutlineFork,
  AiOutlineStar,
  AiOutlineGithub,
} from 'react-icons/ai';
import { MdInsertLink } from 'react-icons/md';

import FlipCard from '../FlipCard';           // adjust path if needed
import { ga, getLanguageColor, skeleton } from '../../utils';
import { GithubProject } from '../../interfaces/github-project';

interface Props {
  header: string;
  githubProjects: GithubProject[];
  loading: boolean;
  limit: number;
  googleAnalyticsId?: string;
}

const GithubProjectCard = ({
  header,
  githubProjects,
  loading,
  limit,
  googleAnalyticsId,
}: Props) => {
  if (!loading && githubProjects.length === 0) return null;

  /* ---------- skeleton cards ---------- */
  const renderSkeleton = () =>
    Array.from({ length: limit }).map((_, i) => (
      <div className="card shadow-md card-sm bg-base-100" key={i}>
        <div className="flex flex-col justify-between p-8 h-full w-full">
          <div>
            <h5 className="card-title text-lg">
              {skeleton({ widthCls: 'w-32', heightCls: 'h-8', className: 'mb-1' })}
            </h5>
            <div className="mb-5 mt-1">
              {skeleton({ widthCls: 'w-full', heightCls: 'h-4', className: 'mb-2' })}
              {skeleton({ widthCls: 'w-full', heightCls: 'h-4' })}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="mr-3 flex items-center">
              {skeleton({ widthCls: 'w-12', heightCls: 'h-4' })}
            </span>
            <span className="flex items-center">
              {skeleton({ widthCls: 'w-12', heightCls: 'h-4' })}
            </span>
          </div>
        </div>
      </div>
    ));

  /* ---------- real cards ---------- */
  const renderProjects = () =>
    githubProjects.map((item: GithubProject, idx: number) => (
      <FlipCard
        key={idx}
        className="transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
        /* ---------- FRONT ---------- */
        front={
          <div className="card shadow-md card-sm bg-base-100 h-full w-full p-8 flex flex-col justify-between">
            <div>
              <div className="card-title text-lg tracking-wide flex items-center text-base-content opacity-60 truncate">
                <MdInsertLink className="my-auto" />
                <span className="truncate">{item.name}</span>
              </div>
              <p className="mb-5 mt-1 text-base-content text-sm">{item.description}</p>
            </div>

            <div className="flex justify-between text-sm text-base-content truncate">
              <div className="flex grow">
                <span className="mr-3 flex items-center">
                  <AiOutlineStar className="mr-0.5" />
                  <span>{item.stargazers_count}</span>
                </span>
                <span className="flex items-center">
                  <AiOutlineFork className="mr-0.5" />
                  <span>{item.forks_count}</span>
                </span>
              </div>
              <span className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-1 opacity-60"
                  style={{ backgroundColor: getLanguageColor(item.language ?? '') }}
                />
                <span>{item.language}</span>
              </span>
            </div>
          </div>
        }
        /* ---------- BACK ---------- */
        back={
          <div className="card bg-base-100 shadow-md card-sm h-full w-full p-8 flex flex-col justify-center items-center text-center">
            <p className="text-base-content mb-4">
              {item.full_name}
              <br />
              Updated&nbsp;
              {new Date(item.updated_at ?? Date.now()).toLocaleDateString()}
            </p>
            <button
              className="btn btn-primary btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                googleAnalyticsId &&
                  ga.event('Click project', { project: item.name });
                window.open(item.html_url, '_blank');
              }}
            >
              View on GitHub
            </button>
          </div>
        }
      />
    ));

  /* ---------- wrapper ---------- */
  return (
    <Fragment>
      <div className="col-span-1 lg:col-span-2">
        <div className="card bg-base-200 shadow-xl border border-base-300">
          <div className="card-body p-8">
            {/* header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div className="flex items-center space-x-3">
                {loading ? (
                  skeleton({ widthCls: 'w-12', heightCls: 'h-12', className: 'rounded-xl' })
                ) : (
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
                    <AiOutlineGithub className="text-2xl" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-base-content truncate">
                    {loading
                      ? skeleton({ widthCls: 'w-48', heightCls: 'h-8' })
                      : header}
                  </h3>
                  <div className="text-base-content/60 text-xs sm:text-sm mt-1 truncate">
                    {loading
                      ? skeleton({ widthCls: 'w-32', heightCls: 'h-4' })
                      : `Showcasing ${githubProjects.length} featured repositories`}
                  </div>
                </div>
              </div>
            </div>

            {/* grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading ? renderSkeleton() : renderProjects()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default GithubProjectCard;
