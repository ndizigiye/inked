import type { Profile } from "@/types";
import { PLACEHOLDER_WRITERS } from "@/lib/placeholders";

interface WritersSectionProps {
  writers: Profile[];
}

function formatReads(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M READS`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K READS`;
  return `${n} READS`;
}

export function WritersSection({ writers }: WritersSectionProps) {
  const displayWriters =
    writers.length > 0
      ? writers.map((w) => ({
          name: w.display_name ?? w.username,
          reads: formatReads(w.total_reads),
          avatar_url: w.avatar_url,
        }))
      : PLACEHOLDER_WRITERS.map((w) => ({ ...w }));

  return (
    <section className="py-10 bg-surface-container-lowest">
      <div className="px-8 max-w-[1920px] mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-headline text-xl font-black tracking-widest uppercase">
            VOICES OF <span className="text-primary-container">INKED</span>
          </h2>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {displayWriters.map((writer, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center space-y-2 group cursor-pointer"
            >
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border border-dashed border-primary-container group-hover:rotate-90 transition-transform duration-700 scale-110" />
                {writer.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={writer.avatar_url}
                    alt={writer.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full flex items-center justify-center bg-surface-container-high">
                    <span className="material-symbols-outlined text-on-surface-variant text-xl" aria-hidden="true">person</span>
                  </div>
                )}
              </div>
              <div className="w-full">
                <p className="font-headline font-black text-[10px] uppercase tracking-tight leading-tight break-words hyphens-auto">
                  {writer.name}
                </p>
                <p className="text-tertiary text-[8px] font-black font-label mt-1">
                  {writer.reads}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
