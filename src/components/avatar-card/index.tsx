 // src/components/avatar-card/index.tsx
import type { ReactNode, ReactElement } from 'react';
import { FALLBACK_IMAGE } from '../../constants';
import { Profile } from '../../interfaces/profile';
import { skeleton } from '../../utils';
import LazyImage from '../lazy-image';

type AvatarCardProps = {
  profile: Profile | null;
  loading: boolean;
  avatarRing: boolean;
  resumeFileUrl?: string;
  subtitle?: string;          // ← add this line
  className?: string;
  children?: ReactNode;
};

export default function AvatarCard({
  profile,
  loading,
  avatarRing,
  resumeFileUrl,
  subtitle,                   // ← accept it
  className = '',
}: AvatarCardProps): ReactElement {
  return (
    <div className={`card bg-base-100 shadow-xl overflow-visible h-full ${className}`}>
      <div className="grid place-items-center py-8 h-full">
        {/* …avatar code unchanged… */}

        <div className="text-center mx-auto px-8">
          <h5 className="font-bold text-2xl">
            {loading || !profile ? (
              skeleton({ widthCls: 'w-48', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content opacity-70">{profile.name}</span>
            )}
          </h5>

          {/* new subtitle render */}
          {subtitle && !loading && (
            <p className="mt-1 text-sm text-base-content/60">{subtitle}</p>
          )}

          <div className="mt-3 text-base-content font-mono">
            {loading || !profile
              ? skeleton({ widthCls: 'w-48', heightCls: 'h-5' })
              : profile.bio}
          </div>
        </div>

        {/* …resume button block unchanged… */}
      </div>
    </div>
  );
}
