import { MdInsertLink } from 'react-icons/md';
import FlipCard from '../FlipCard';
import { SanitizedExternalProject } from '../interfaces/sanitized-config';

export default function ExternalProjectCard({
  proj,
}: {
  proj: SanitizedExternalProject;
}) {
  return (
    <FlipCard
      className="transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
      front={
        <div className="card bg-base-100 shadow-md card-sm h-full w-full">
          <figure className="px-6 pt-6">
            <img src={proj.imageUrl} alt={proj.title} className="rounded-xl" />
          </figure>
          <div className="p-6 flex flex-col h-full">
            <h3 className="card-title text-lg flex items-center mb-2">
              <MdInsertLink className="mr-1.5" />
              {proj.title}
            </h3>
            <p className="text-sm text-base-content/60 flex-grow">{proj.description}</p>
          </div>
        </div>
      }
      back={
        <div className="card bg-base-100 shadow-md card-sm h-full w-full p-6 flex flex-col justify-center items-center text-center">
          <p className="text-base-content mb-4">Explore the working paper</p>
          <a
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            Read Paper
          </a>
        </div>
      }
    />
  );
}
