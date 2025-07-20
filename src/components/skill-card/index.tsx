import { skeleton } from '../../utils';

type Skill = { type: "language" | "program"; name: string };

const SkillCard = ({
  loading,
  skills,
}: {
  loading: boolean;
  skills: string[];
}) => {
// Let's make the seperate groups 
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
          <h5 className="card-title">
            {loading ? (
              skeleton({ widthCls: 'w-32', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content opacity-70">Languages & Programs</span>
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
              <div className="flex items-center gap-4 mb-2 flex-wrap justify-center">
                <span className="px-4 py-1 rounded-full bg-blue-200 text-blue-800 font-bold">Languages</span>
                {languages.map((lang, idx) => (
                  <span key={idx} className="badge badge-primary badge-sm">{lang.name}</span>
                ))}
              </div>
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <span className="px-4 py-1 rounded-full bg-green-200 text-green-800 font-bold">Programs</span>
                {programs.map((prog, idx) => (
                  <span key={idx} className="badge badge-primary badge-sm">{prog.name}</span>
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
