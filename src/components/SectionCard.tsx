// src/components/section-card/SectionCard.tsx
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
    /* lg:col-span-2 makes it full‑width on large screens;
       relative + z‑[1] keeps later sections from being over‑drawn */
    <div className="col-span-1 lg:col-span-2 relative z-[1]">
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

          {children}
        </div>
      </div>
    </div>
  );
}
