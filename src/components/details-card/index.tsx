/* ────────────────────────────────────────────────────────────────────────── */
/*  DetailsCard – social/contact rows with a single icon row on top          */
/* ────────────────────────────────────────────────────────────────────────── */
import { Fragment } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { RiMailFill } from 'react-icons/ri';
import { SiX, SiGooglescholar } from 'react-icons/si';   // ← fixed import
import { PiFilePdfLight } from 'react-icons/pi';

import { MdLocationOn } from 'react-icons/md';
import { FaBuilding } from 'react-icons/fa';

import { Profile } from '../../interfaces/profile';
import {
  SanitizedGithub,
  SanitizedSocial,
} from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

/* ────────────── types ────────────── */
type Links = {
  scholar?: string;
  github?: string;
  x?: string;
  email?: string;
  cv?: string;
};

type Props = {
  profile: Profile | null;
  loading: boolean;
  social: SanitizedSocial;   // kept in the type for future use
  github: SanitizedGithub;
  links?: Links;
};

/* ───────── helpers you already had ───────── */
const isCompanyMention = (c: string) => c.startsWith('@') && !c.includes(' ');
const companyLink = (c: string) => `https://github.com/${c.substring(1)}`;

/* ────────────────────────────────────────────────────────────────────────── */
const DetailsCard = ({
  profile,
  loading,
  social: _social,          // ← underscore silences unused-prop error
  github,
  links,
}: Props) => {
  const renderSkeletonRows = () =>
    Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="flex items-start space-x-2">
        {skeleton({ widthCls: 'w-4', heightCls: 'h-4' })}
        {skeleton({ widthCls: 'w-24', heightCls: 'h-4' })}
      </div>
    ));

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        {/* ─────────── ICON ROW ─────────── */}
        {links && (
          <div className="flex items-center justify-center gap-4 mb-4 text-xl text-base-content/70">
            {links.scholar && (
              <a
                href={links.scholar}
                target="_blank"
                rel="noreferrer"
                title="Scholar"
              >
                <SiGooglescholar className="w-5 h-5 hover:text-primary" />
              </a>
            )}
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                title="GitHub"
              >
                <AiFillGithub className="w-5 h-5 hover:text-primary" />
              </a>
            )}
            {links.x && (
              <a href={links.x} target="_blank" rel="noreferrer" title="X">
                <SiX className="w-5 h-5 hover:text-primary" />
              </a>
            )}
            {links.email && (
              <a href={`mailto:${links.email}`} title="Email">
                <RiMailFill className="w-5 h-5 hover:text-primary" />
              </a>
            )}
            {links.cv && (
              <a
                href={links.cv}
                target="_blank"
                rel="noreferrer"
                title="CV / PDF"
              >
                <PiFilePdfLight className="w-5 h-5 hover:text-primary" />
              </a>
            )}
          </div>
        )}

        {/* ─────────── EXISTING DETAIL LINES ─────────── */}
        {loading || !profile ? (
          renderSkeletonRows()
        ) : (
          <Fragment>
            {profile.location && (
              <div className="flex items-start">
                <MdLocationOn className="mt-0.5" />
                <span className="ml-2 font-medium">Based in:</span>
                <span className="text-sm ml-3">{profile.location}</span>
              </div>
            )}

            {profile.company && (
              <div className="flex items-start">
                <FaBuilding className="mt-0.5" />
                <span className="ml-2 font-medium">Organization:</span>
                <span className="text-sm ml-3">
                  {isCompanyMention(profile.company.trim()) ? (
                    <a
                      href={companyLink(profile.company.trim())}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {profile.company}
                    </a>
                  ) : (
                    profile.company
                  )}
                </span>
              </div>
            )}

            <div className="flex items-start">
              <AiFillGithub className="mt-0.5" />
              <span className="ml-2 font-medium">GitHub:</span>
              <a
                href={`https://github.com/${github.username}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm ml-3"
              >
                {github.username}
              </a>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default DetailsCard;
