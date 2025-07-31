/* ────────────────────────────────────────────────────────────────────────── */
/*  DetailsCard – shows social contact rows and a single icon row on top    */
/* ────────────────────────────────────────────────────────────────────────── */
import { Fragment } from 'react';

import {
  AiFillGithub,
  AiFillInstagram,
  AiFillMediumSquare,
} from 'react-icons/ai';
import { CgDribbble } from 'react-icons/cg';
import {
  FaBehanceSquare,
  FaBuilding,
  FaDev,
  FaFacebook,
  FaGlobe,
  FaLinkedin,
  FaMastodon,
  FaReddit,
  FaStackOverflow,
  FaTelegram,
  FaYoutube,
} from 'react-icons/fa';
import { FaSquareThreads } from 'react-icons/fa6';
import { MdLocationOn } from 'react-icons/md';
import { RiDiscordFill, RiMailFill, RiPhoneFill } from 'react-icons/ri';
import { SiResearchgate, SiX, SiUdemy } from 'react-icons/si';
import { PiFilePdfLight } from 'react-icons/pi';
import { Profile } from '../../interfaces/profile';
import {
  SanitizedGithub,
  SanitizedSocial,
} from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

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
  social: SanitizedSocial;
  github: SanitizedGithub;
  links?: Links; // ← NEW
};

/* ───────── helpers you already had ───────── */

const isCompanyMention = (company: string) =>
  company.startsWith('@') && !company.includes(' ');

const companyLink = (company: string) =>
  `https://github.com/${company.substring(1)}`;

const getFormattedMastodonValue = (
  mastodonValue: string,
  isLink: boolean,
): string => {
  const [username, server] = mastodonValue.split('@');
  return isLink ? `https://${server}/@${username}` : `${username}@${server}`;
};

/* tiny row components (unchanged) */
const ListItem: React.FC<{
  icon: React.ReactNode;
  title: React.ReactNode;
  value: React.ReactNode;
  link?: string;
  skeleton?: boolean;
}> = ({ icon, title, value, link, skeleton = false }) => (
  <div className="flex items-start">
    {icon}
    <span className="ml-2 font-medium">{title}</span>
    <div
      className={`${
        skeleton ? 'grow' : ''
      } text-sm font-normal text-right ml-3`}
    >
      {link ? (
        <a href={link} target="_blank" rel="noreferrer" className="truncate">
          {value}
        </a>
      ) : (
        value
      )}
    </div>
  </div>
);

const OrganizationItem: React.FC<{
  icon: React.ReactNode;
  title: React.ReactNode;
  value: React.ReactNode | string;
  link?: string;
  skeleton?: boolean;
}> = ({ icon, title, value, link, skeleton = false }) => (
  <div className="flex items-start">
    {icon}
    <span className="ml-2 font-medium">{title}</span>
    <div
      className={`${
        skeleton ? 'grow' : ''
      } text-sm font-normal text-right ml-3 space-x-2`}
    >
      {typeof value === 'string' ? (
        value.split(' ').map((company) => {
          company = company.trim();
          if (!company) return null;
          return isCompanyMention(company) ? (
            <a
              key={company}
              href={companyLink(company)}
              target="_blank"
              rel="noreferrer"
            >
              {company}
            </a>
          ) : (
            <span key={company}>{company}</span>
          );
        })
      ) : (
        value
      )}
    </div>
  </div>
);

/* ────────────────────────────────────────────────────────────────────────── */

const DetailsCard = ({ profile, loading, social, github, links }: Props) => {
  const renderSkeletonRows = () =>
    Array.from({ length: 4 }).map((_, i) => (
      <ListItem
        key={i}
        skeleton
        icon={skeleton({ widthCls: 'w-4', heightCls: 'h-4' })}
        title={skeleton({ widthCls: 'w-24', heightCls: 'h-4' })}
        value={skeleton({ widthCls: 'w-full', heightCls: 'h-4' })}
      />
    ));

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        {/* ─────────── ICON ROW (single line) ─────────── */}
        {links && (
          <div className="flex items-center justify-center gap-4 mb-4 text-xl text-base-content/70">
            {links.scholar && (
              <PiFilePdfLight // you can swap to FaGraduationCap if you prefer
                as="svg"
                className="w-5 h-5 hover:text-primary"
                onClick={() => window.open(links.scholar, '_blank')}
              />
            )}
            {links.github && (
              <a href={links.github} target="_blank" rel="noreferrer">
                <AiFillGithub className="w-5 h-5 hover:text-primary" />
              </a>
            )}
            {links.x && (
              <a href={links.x} target="_blank" rel="noreferrer">
                <SiX className="w-5 h-5 hover:text-primary" />
              </a>
            )}
            {links.email && (
              <a href={`mailto:${links.email}`}>
                <RiMailFill className="w-5 h-5 hover:text-primary" />
              </a>
            )}
            {links.cv && (
              <a href={links.cv} target="_blank" rel="noreferrer">
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
              <ListItem
                icon={<MdLocationOn />}
                title="Based in:"
                value={profile.location}
              />
            )}
            {profile.company && (
              <OrganizationItem
                icon={<FaBuilding />}
                title="Organization:"
                value={profile.company}
                link={
                  isCompanyMention(profile.company.trim())
                    ? companyLink(profile.company.trim())
                    : undefined
                }
              />
            )}

            <ListItem
              icon={<AiFillGithub />}
              title="GitHub:"
              value={github.username}
              link={`https://github.com/${github.username}`}
            />

            {/* add or keep the rest of your social rows exactly as before */}
            {/* ... */}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default DetailsCard;
