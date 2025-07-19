import { ReactNode, useState } from 'react';

/**
 * Simple 3‑D flip card.
 * Click to flip; click again to flip back.
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
      className={`relative cursor-pointer [perspective:1000px] ${className}`}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className={`transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* front */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          {front}
        </div>

        {/* back */}
        <div className="absolute inset-0 rotate-y-180 [backface-visibility:hidden]">
          {back}
        </div>
      </div>
    </div>
  );
}
