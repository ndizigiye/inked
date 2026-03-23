interface StoryMetaProps {
  publishedAt: string | null;
  viewCount: number;
  readTimeMin: number;
}

export function StoryMeta({ publishedAt, viewCount, readTimeMin }: StoryMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-6 py-8 border-t border-outline-variant/10">
      {publishedAt && (
        <div className="flex items-center gap-2 text-on-surface-variant">
          <span className="material-symbols-outlined text-sm" aria-hidden="true">calendar_today</span>
          <span className="text-xs font-label uppercase tracking-widest">
            {new Date(publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      )}
      <div className="flex items-center gap-2 text-on-surface-variant">
        <span className="material-symbols-outlined text-sm" aria-hidden="true">schedule</span>
        <span className="text-xs font-label uppercase tracking-widest">
          {readTimeMin} min read
        </span>
      </div>
      {viewCount > 0 && (
        <div className="flex items-center gap-2 text-on-surface-variant">
          <span className="material-symbols-outlined text-sm" aria-hidden="true">visibility</span>
          <span className="text-xs font-label uppercase tracking-widest">
            {viewCount.toLocaleString()} reads
          </span>
        </div>
      )}
    </div>
  );
}
