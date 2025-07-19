/* ---------- projects ---------- */
const renderProjects = () =>
  githubProjects.map((item: GithubProject, idx: number) => (
    <FlipCard
      key={idx}
      className="transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
      /* --------- FRONT --------- */
      front={
        <div className="card shadow-md card-sm bg-base-100 h-full p-8 flex flex-col justify-between">
          <div>
            <div className="card-title text-lg tracking-wide flex items-center text-base-content opacity-60 truncate">
              <MdInsertLink className="my-auto" />
              <span className="truncate">{item.name}</span>
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
            <span className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-1 opacity-60"
                style={{ backgroundColor: getLanguageColor(item.language ?? '') }}
              />
              <span>{item.language}</span>
            </span>
          </div>
        </div>
      }
      /* --------- BACK --------- */
      back={
        <div className="card bg-base-100 shadow-md card-sm h-full p-8 flex flex-col justify-center items-center text-center">
          <p className="text-base-content mb-4">
            {item.full_name}
            <br />
            Updated&nbsp;
            {new Date(item.updated_at ?? Date.now()).toLocaleDateString()}
          </p>
          <button
            className="btn btn-primary btn-sm"
            onClick={(e) => {
              e.stopPropagation();                // keep card from re‑flipping
              googleAnalyticsId &&
                ga.event('Click project', { project: item.name });
              window.open(item.html_url, '_blank');
            }}
          >
            View on GitHub
          </button>
        </div>
      }
    />
  ));
