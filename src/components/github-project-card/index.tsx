/* src/components/FlipCard.tsx */
import { ReactNode, useState } from 'react';

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
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      rotate: { 'y-180': '180deg' },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.rotate-y-180': { transform: 'rotateY(180deg)' },
        '[transform-style:preserve-3d]': { transformStyle: 'preserve-3d' },
        '[backface-visibility:hidden]': { backfaceVisibility: 'hidden' },
        '[perspective:1000px]': { perspective: '1000px' },
      });
    },
  ],
};
const renderProjects = () =>
  githubProjects.map((item, index) => (
    <FlipCard
      key={index}
      className="transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
      front={
        <a
          className="block card shadow-md card-sm bg-base-100 h-full"
          href={item.html_url}
          onClick={(e) => {
            // don't let the wrapper's onClick stop the link
            e.stopPropagation();
            e.preventDefault();
            googleAnalyticsId && ga.event('Click project', { project: item.name });
            window.open(item.html_url, '_blank');
          }}
        >
          {/* --- everything that used to be in the <a> goes here --- */}
          {/* (shortened for brevity) */}
          <div className="flex justify-between flex-col p-8 h-full w-full">
            <div>
              <div className="flex items-center truncate">
                <div className="card-title text-lg tracking-wide flex text-base-content opacity-60">
                  <MdInsertLink className="my-auto" />
                  <span>{item.name}</span>
                </div>
              </div>
              <p className="mb-5 mt-1 text-base-content text-sm">
                {item.description}
              </p>
            </div>
            <div className="flex justify-between text-sm text-base-content truncate">
              <div className="flex grow">
                <span className="mr-3 flex items-center">
                  <AiOutlineStar className="mr-0.5" />
                  <span>{item.stargazers_count}</span>
                </span>
                <span className="flex items-center">
                  <AiOutlineFork className="mr-0.5" />
                  <span>{item.forks_count}</span>
                </span>
              </div>
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-1 opacity-60"
                  style={{ backgroundColor: getLanguageColor(item.language) }}
                />
                <span>{item.language}</span>
              </div>
            </div>
          </div>
        </a>
      }
      back={
        <div className="card bg-base-100 shadow-md card-sm h-full p-8 flex flex-col justify-center items-center text-center">
          <p className="text-base-content mb-4">
            {item.full_name}
            <br />
            Updated&nbsp;
            {new Date(item.updated_at).toLocaleDateString()}
          </p>
          <button
            className="btn btn-primary btn-sm"
            onClick={(e) => {
              e.stopPropagation(); // avoid re‑flipping
              window.open(item.html_url, '_blank');
            }}
          >
            View on GitHub
          </button>
        </div>
      }
    />
  ));
