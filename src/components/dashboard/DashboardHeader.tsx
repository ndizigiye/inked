import type { Profile } from "@/types";

interface DashboardHeaderProps {
  profile: Profile;
  storyCount: number;
}

export function DashboardHeader({ profile, storyCount }: DashboardHeaderProps) {
  return (
    <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div className="space-y-2">
        <h1 className="text-5xl font-black font-headline tracking-tighter text-on-surface uppercase">
          Manuscript <span className="text-primary-container">Vault.</span>
        </h1>
        <p className="text-primary-fixed-dim font-medium tracking-wide font-label opacity-80 uppercase">
          Managing {storyCount} active{" "}
          {storyCount === 1 ? "narrative" : "narratives"}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-surface-container-low p-4 rounded-lg flex flex-col justify-center min-w-[140px]">
          <span className="text-tertiary text-[10px] uppercase font-label tracking-widest font-bold">
            Total Reads
          </span>
          <span className="text-2xl font-black font-headline text-on-surface">
            {formatReads(profile.total_reads)}
          </span>
        </div>
        <div className="bg-surface-container-low p-4 rounded-lg flex flex-col justify-center min-w-[140px]">
          <span className="text-tertiary text-[10px] uppercase font-label tracking-widest font-bold">
            Stories
          </span>
          <span className="text-2xl font-black font-headline text-on-surface">
            {storyCount}
          </span>
        </div>
        <div className="bg-primary-container/10 border border-primary-container/20 p-4 rounded-lg flex flex-col justify-center min-w-[140px] hidden md:flex">
          <span className="text-primary-container text-[10px] uppercase font-label tracking-widest font-bold">
            Ink Level
          </span>
          <span className="text-2xl font-black font-headline text-primary-container">
            {getInkLevel(profile.total_reads)}
          </span>
        </div>
      </div>
    </header>
  );
}

function formatReads(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function getInkLevel(reads: number): string {
  if (reads >= 1_000_000) return "Legend";
  if (reads >= 100_000) return "Master";
  if (reads >= 10_000) return "Expert";
  if (reads >= 1_000) return "Rising";
  return "Novice";
}
