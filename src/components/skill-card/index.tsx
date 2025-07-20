import { skeleton } from '../../utils';

type Skill = { type: "language" | "program"; name: string };

const badgeColor = (t: 'language' | 'program') =>
  t === 'language' ? 'badge-info' : 'badge-success';

const SkillCard = ({
  loading,
  skills,
}: {
  loading: boolean;
  skills: Skill[];      // ← Correct type here!
}) => {
  // Separate groups 
  const languages = skills.filter(skill => skill.type === "language");
  const programs = skills.filter(skill => skill.type === "program");

  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 12; index++) {
      array.push(
        <div key={index}>
          {skeleton({ widthCls: 'w-16', heightCls: 'h-4', className: 'm-1' })}
        </div>,
      );
    }
    return array;
  };

  return (
    <div className="card shadow-lg card-sm bg-base-100">
      <div className="card-body">
        <div className="mx-3">
          <h5 className="card-title flex flex-col items-center gap-1">
  {loading ? (
    skeleton({ widthCls: 'w-48', heightCls: 'h-8' })
  ) : (
    <>
      <span className="text-base-content opacity-70"></span>
      <span className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded-full bg-blue-200 text-blue-800 text-xs font-semibold">
          Languages
        </span>
        <span className="px-2 py-0.5 rounded-full bg-green-200 text-green-800 text-xs font-semibold">
          Programs
        </span>
      </span>
    </>
  )}
</h5>
        </div>

        <div className="p-3 flow-root">
          {loading ? (
            <div className="-m-1 flex flex-wrap justify-center gap-2">
              {renderSkeleton()}
            </div>
          ) : (
            <>
              {/* Languages */}
<div className="flex flex-wrap justify-center gap-2 mb-2">
  {languages.map((lang, idx) => (
    <span
      key={idx}
      className={`badge badge-sm ${badgeColor(lang.type)}`}
    >
      {lang.name}
    </span>
  ))}
</div>

{/* Programs */}
<div className="flex flex-wrap justify-center gap-2">
  {programs.map((prog, idx) => (
    <span
      key={idx}
      className={`badge badge-sm ${badgeColor(prog.type)}`}
    >
      {prog.name}
    </span>
  ))}
</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
