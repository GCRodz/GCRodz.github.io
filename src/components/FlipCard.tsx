import { ReactNode, useState } from 'react';

/**
 * 3‑D flip card: fills its grid cell (h‑full w‑full)
 * and flips 180° on click.
 */
export default function FlipCard({
  front,
  back,
  className = '',
}: {
  front: ReactNode;
  back: ReactNode;
  className?: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`relative cursor-pointer h-full w-full [perspective:1000px] ${className}`}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className={`transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* front face */}
        <div className="absolute inset-0 h-full w-full [backface-visibility:hidden]">
          {front}
        </div>

        {/* back face */}
        <div className="absolute inset-0 h-full w-full rotate-y-180 [backface-visibility:hidden]">
          {back}
        </div>
      </div>
    </div>
  );
}
