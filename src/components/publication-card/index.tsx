import { MdArticle } from 'react-icons/md';
import FlipCard from '../FlipCard';
import { SanitizedPublication } from '../../interfaces/sanitized-config';

/**
 * One publication entry that lifts on hover and flips on click.
 * The wrapper now has a fixed height (h‑36 / h‑40 / h‑44) so the parent
 * SectionCard can measure it and the dark rectangle matches GitHub cards.
 */
export default function PublicationCard({ pub }: { pub: SanitizedPublication }) {
  return (
    <FlipCard
      /* fixed height + hover lift + z‑index */
      className="h-36 sm:h-40 lg:h-44 transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:z-20"
      /* -------- FRONT -------- */
      front={
        <div
          className="card bg-base-100 shadow-md card-sm h-full w-full p-8
                     flex flex-col justify-between rounded-box"
        >
          <h3 className="card-title text-lg flex items-center mb-2">
            <MdArticle className="mr-1.5" />
            {pub.title}
          </h3>

          <p className="text-sm text-base-content/70 mb-2">
            {pub.journalName || pub.conferenceName}
          </p>

          <p className="text-sm text-base-content/60 flex-grow">
            {pub.description}
          </p>
        </div>
      }
      /* -------- BACK -------- */
      back={
        <div
          className="card bg-base-100 shadow-md card-sm h-full w-full p-8
                     flex flex-col justify-center items-center text-center rounded-box"
        >
          <p className="text-base-content mb-4">{pub.authors}</p>
          <a
            href={pub.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            View Publication
          </a>
        </div>
      }
    />
  );
}
