import type { ReactNode } from 'react';

type FlipCardProps = {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  minHeight?: number | string; // optional: control height to avoid layout collapse
};

export default function FlipCard({
  front,
  back,
  className = '',
  minHeight = '320px',
}: FlipCardProps) {
  return (
    <div
      className={`group w-full h-full ${className}`}
      style={{ perspective: '1000px', minHeight }}
    >
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 [backface-visibility:hidden]">
          {front}
        </div>
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {back}
        </div>
      </div>
    </div>
  );
}
