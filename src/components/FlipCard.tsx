import type { ReactNode } from 'react';
import './flipcard.css';

type FlipCardProps = {
  front: ReactNode;
  back: ReactNode;
  height?: number | string;   // e.g., 340 or '340px'
  className?: string;
};

export default function FlipCard({
  front,
  back,
  height = 340,
  className = '',
}: FlipCardProps) {
  return (
    <div
      className={`flip hover:flip-hover-top w-full ${className}`}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      <div className="flip-inner">
        <div className="flip-face overflow-visible">{front}</div>
        <div className="flip-face flip-back overflow-auto">{back}</div>
      </div>
    </div>
  );
}
