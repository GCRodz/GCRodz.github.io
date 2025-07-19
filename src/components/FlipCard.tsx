import { ReactNode, useState } from 'react';

/**
 * 3‑D flip card.
 * – Hover: optional pop handled by parent via className.
 * – Click: flips 180°; click again flips back.
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
    /* wrapper fills its grid slot */
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
