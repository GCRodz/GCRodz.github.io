import { MdArticle } from 'react-icons/md';
import FlipCard from '../FlipCard';
import { SanitizedPublication } from '../../interfaces/sanitized-config';

export default function PublicationCard({ pub }: { pub: SanitizedPublication }) {
  return (
    <FlipCard
      className="transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:z-20"
      front={
        <div className="card bg-base-100 shadow-md card-sm h-full w-full p-6 flex flex-col">
          <h3 className="card-title text-lg flex items-center mb-2">
            <MdArticle className="mr-1.5" />
            {pub.title}
          </h3>
          <p className="text-sm text-base-content/70 mb-2">
            {pub.journalName || pub.conferenceName}
          </p>
          <p className="text-sm text-base-content/60 flex-grow">{pub.description}</p>
        </div>
      }
      back={
        <div className="card bg-base-100 shadow-md card-sm h-full w-full p-6 flex flex-col justify-center items-center text-center">
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
