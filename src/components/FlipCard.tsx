import { useState, type ReactNode, type ReactElement } from 'react';
import './flipcard.css';           // you already have the CSS

type FlipCardProps = {
  front: ReactNode;
  back: ReactNode;
  height?: number | string;
  className?: string;
  hover?: boolean;   // keep hover behaviour if you still want it on desktop
};

export default function FlipCard({
  front,
  back,
  height = 340,
  className = '',
  hover = false,      // default: hover OFF, click ON
}: FlipCardProps): ReactElement {
  const [flipped, setFlipped] = useState(false);

  const handleToggle = () => setFlipped((f) => !f);

  return (
    <div
      className={`flip w-full ${className} ${hover ? 'hover:flip-hover-top' : ''}`}
      style={{ height }}
      onClick={handleToggle}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleToggle()}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
    >
      <div
        className="flip-inner"
        style={{ transform: flipped ? 'rotateY(180deg)' : undefined }}
      >
        <div className="flip-face overflow-visible">{front}</div>
        <div className="flip-face flip-back overflow-auto">{back}</div>
      </div>
    </div>
  );
}
