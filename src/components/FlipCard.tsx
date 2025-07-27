// FlipCard.tsx
import React from 'react';

const FlipCard = ({ front, back }: { front: React.ReactNode; back: React.ReactNode }) => (
  <div className="group w-full h-full perspective">
    <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
      <div className="absolute inset-0 backface-hidden">
        {front}
      </div>
      <div className="absolute inset-0 rotate-y-180 backface-hidden">
        {back}
      </div>
    </div>
  </div>
);

export default FlipCard;
