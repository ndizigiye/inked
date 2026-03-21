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
    <section className="py-24 bg-surface-container-lowest">
      <div className="px-12 max-w-screen-2xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-headline text-4xl font-extrabold">
            VOICES OF <span className="text-primary-container">INKED</span>
          </h2>
          <div className="w-24 h-1 bg-primary-container mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12">
          {displayWriters.map((writer, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center space-y-4 group cursor-pointer"
            >
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary-container group-hover:rotate-90 transition-transform duration-1000" />
                <div className="w-28 h-28 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden bg-surface-container">
                  {writer.avatar_url ? (
                    <img
                      src={writer.avatar_url}
                      alt={writer.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-surface-container-high">
                      <span className="material-symbols-outlined text-on-surface-variant text-3xl">
                        person
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <p className="font-headline font-bold text-lg uppercase tracking-tight">
                  {writer.name}
                </p>
                <p className="text-tertiary text-[10px] font-bold font-label">
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
