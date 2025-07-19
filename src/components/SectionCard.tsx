import { ReactNode } from 'react';

export default function SectionCard({
  icon,
  header,
  subHeader,
  children,
}: {
  icon: ReactNode;
  header: string;
  subHeader: string;
  children: ReactNode;
}) {
  return (
    <div className="card bg-base-200 shadow-xl border border-base-300">
      <div className="card-body p-8">
        {/* header */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-base-content">{header}</h3>
            <p className="text-xs text-base-content/60">{subHeader}</p>
          </div>
        </div>

        {/* inner content */}
        {children}
      </div>
    </div>
  );
}
