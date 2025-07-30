// src/components/avatar-card/index.tsx
import type { ReactNode, ReactElement } from 'react';
import { FALLBACK_IMAGE } from '../../constants';
import { Profile } from '../../interfaces/profile';
import { skeleton } from '../../utils';
import LazyImage from '../lazy-image';
import {
  FaGithub,
  FaXTwitter,
  FaEnvelope,
  FaGraduationCap,
} from 'react-icons/fa6';
import { PiFilePdfLight } from 'react-icons/pi';   // cv icon

type Links = {
  scholar?: string;
  github?: string;
  x?: string;
  email?: string;   // mailto:
  cv?: string;
};

type AvatarCardProps = {
  profile: Profile | null;
  loading: boolean;
  avatarRing: boolean;
  resumeFileUrl?: string;
  subtitle?: string;
  links?: Links;           // ← new
  className?: string;
  children?: ReactNode;
};

export default function AvatarCard({
  profile,
  loading,
  avatarRing,
  resumeFileUrl,
  subtitle,
  links,
  className = '',
}: AvatarCardProps): ReactElement {
  return (
    <div className={`card bg-base-100 shadow-xl overflow-visible h-full ${className}`}>
      <div className="grid place-items-center py-8 h-full">
        {/* Avatar */}
        {loading || !profile ? (
          <div className="avatar opacity-90">
            <div className="mb-8 rounded-full w-32 h-32">
              {skeleton({ widthCls: 'w-full', heightCls: 'h-full', shape: '' })}
            </div>
          </div>
        ) : (
          <div className="avatar opacity-90">
            <div
              className={`mb-8 rounded-full w-32 h-32 ${
                avatarRing
                  ? 'ring-3 ring-primary ring-offset-base-100 ring-offset-2'
                  : ''
              }`}
            >
              <LazyImage
                src={profile.avatar || FALLBACK_IMAGE}
                alt={profile.name}
                placeholder={skeleton({ widthCls: 'w-full', heightCls: 'h-full', shape: '' })}
              />
            </div>
          </div>
        )}

        {/* Name / subtitle / bio */}
        <div className="text-center mx-auto px-8">
          <h5 className="font-bold text-2xl">
            {loading || !profile ? (
              skeleton({ widthCls: 'w-48', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content opacity-70">{profile.name}</span>
            )}
          </h5>

          {subtitle && !loading && (
            <p className="mt-1 text-sm text-base-content/60">{subtitle}</p>
          )}

          <div className="mt-3 text-base-content font-mono">
            {loading || !profile
              ? skeleton({ widthCls: 'w-48', heightCls: 'h-5' })
              : profile.bio}
          </div>
        </div>

        {/* ---------- ICON ROW ---------- */}
        {links && !loading && (
          <div className="mt-5 flex items-center justify-center space-x-4 text-base-content/60">
            {links.scholar && (
              <a href={links.scholar} target="_blank" rel="noreferrer" aria-label="Google Scholar">
                <FaGraduationCap className="w-[18px] h-[18px] hover:text-primary" />
              </a>
            )}
            {links.github && (
              <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <FaGithub className="w-[18px] h-[18px] hover:text-primary" />
              </a>
            )}
            {links.x && (
              <a href={links.x} target="_blank" rel="noreferrer" aria-label="X / Twitter">
                <FaXTwitter className="w-[18px] h-[18px] hover:text-primary" />
              </a>
            )}
            {links.email && (
              <a href={`mailto:${links.email}`} aria-label="Email">
                <FaEnvelope className="w-[18px] h-[18px] hover:text-primary" />
              </a>
            )}
            {links.cv && (
              <a href={links.cv} target="_blank" rel="noreferrer" aria-label="Download CV">
                <PiFilePdfLight className="w-[18px] h-[18px] hover:text-primary" />
              </a>
            )}
          </div>
        )}

        {/* Resume button (optional) */}
        {resumeFileUrl &&
          (loading ? (
            <div className="mt-6">
              {skeleton({ widthCls: 'w-40', heightCls: 'h-8' })}
            </div>
          ) : (
            <a
              href={resumeFileUrl}
              target="_blank"
              className="btn btn-outline btn-sm text-xs mt-6 opacity-50"
              download
              rel="noreferrer"
            >
              Download Resume
            </a>
          ))}
      </div>
    </div>
  );
}
