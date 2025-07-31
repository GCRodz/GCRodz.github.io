/* ────────────────────────────────────────────────────────────────────────── */
/*  DetailsCard – icon strip only                                            */
/* ────────────────────────────────────────────────────────────────────────── */
import { AiFillGithub } from 'react-icons/ai';
import { RiMailFill } from 'react-icons/ri';
import { SiGooglescholar } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';

type Links = {
  scholar?: string;
  github?: string;
  linkedin?: string;
  email?: string;
  cv?: string;
};

type Props = {
  /* The extra props are still accepted so parent calls
     don’t need to change, but we don’t use them anymore. */
  profile?: unknown;
  loading?: boolean;
  social?: unknown;
  github?: unknown;
  links?: Links;
};

export default function DetailsCard({ links }: Props) {
  if (!links) return null; // nothing to render

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body p-6">
        <div className="flex items-center justify-center gap-4 text-xl text-base-content/70">
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

          {links.linkedin && (
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5 hover:text-primary" />
            </a>
          )}

          {links.email && (
            <a href={`mailto:${links.email}`} title="Email">
              <RiMailFill className="w-5 h-5 hover:text-primary" />
            </a>
          )}

          {/* CV text link */}
          {links.cv && (
            <a
              href={links.cv}
              target="_blank"
              rel="noreferrer"
              title="CV / PDF"
              className="font-semibold tracking-wide hover:text-primary"
            >
              CV
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
