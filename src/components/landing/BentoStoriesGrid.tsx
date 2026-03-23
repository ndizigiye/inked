import Link from "next/link";
import type { StoryWithAuthor } from "@/types";
import { PLACEHOLDER_STORIES } from "@/lib/placeholders";

interface BentoStoriesGridProps {
  stories: StoryWithAuthor[];
}

export function BentoStoriesGrid({ stories }: BentoStoriesGridProps) {
  // Fall back to design mockup placeholders when no published stories exist
  const isPlaceholder = stories.length === 0;
  const [feature, ...secondary] = isPlaceholder
    ? (PLACEHOLDER_STORIES as unknown as StoryWithAuthor[])
    : stories;

  return (
    <section id="featured" className="py-10 px-8 max-w-[1920px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 mb-6">
        <div className="space-y-1">
          <span className="text-tertiary font-label uppercase tracking-widest text-[9px] font-black">
            Curated Narratives
          </span>
          <h2 className="font-headline text-3xl font-black tracking-tight leading-none">
            FEATURED <span className="text-primary">STORIES</span>
          </h2>
        </div>
        <Link
          href="/"
          className="text-primary-fixed-dim font-label font-bold flex items-center gap-1.5 text-[11px] uppercase tracking-wider hover:text-primary transition-colors self-start sm:self-auto"
        >
          VIEW ARCHIVE{" "}
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_right_alt</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Main Feature */}
        {feature && (
          <FeatureCard story={feature} isPlaceholder={isPlaceholder} />
        )}

        {/* Secondary cards */}
        <div className="md:col-span-4 flex flex-col gap-4">
          {secondary.slice(0, 2).map((story, i) => (
            <SecondaryCard
              key={isPlaceholder ? i : story.id}
              story={story}
              isPlaceholder={isPlaceholder}
              accent={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Sub-components ──────────────────────────────────────────

function FeatureCard({
  story,
  isPlaceholder,
}: {
  story: StoryWithAuthor;
  isPlaceholder: boolean;
}) {
  const ph = isPlaceholder ? (story as unknown as (typeof PLACEHOLDER_STORIES)[0]) : null;
  const href = isPlaceholder ? "/register" : `/story/${story.id}`;
  const coverUrl = ph ? ph.cover_url : story.cover_url;
  const title = ph ? ph.title : story.title;
  const excerpt = ph ? ph.excerpt : story.excerpt;
  const genre = ph ? ph.genre : story.genre;
  const readTime = ph ? ph.read_time_min : story.read_time_min;
  const authorName = ph ? ph.author_name : (story.profiles?.display_name ?? story.profiles?.username ?? "");
  const authorAvatar = ph ? ph.author_avatar : story.profiles?.avatar_url;
  const authorRole = ph ? ph.author_role : "Author";

  return (
    <Link
      href={href}
      className="md:col-span-8 group relative overflow-hidden bg-surface-container-low rounded-lg h-[380px] border-b-2 border-transparent hover:border-primary-container transition-all cursor-pointer block"
    >
      {coverUrl ? (
        <img
          src={coverUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 to-surface-container" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-surface-dim/40 to-transparent" />
      <div className="absolute bottom-0 p-6 space-y-2">
        <div className="flex gap-3 items-center mb-2">
          {genre && (
            <span className="bg-primary-container text-on-primary-container px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded">
              {genre}
            </span>
          )}
          <span className="text-tertiary text-xs font-bold font-label flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]" aria-hidden="true">schedule</span>
            {readTime} MIN READ
          </span>
        </div>
        <h3 className="font-headline text-3xl font-black leading-tight max-w-lg uppercase">
          {title || "Untitled"}
        </h3>
        {excerpt && (
          <p className="text-on-surface-variant text-sm max-w-md line-clamp-1 opacity-70">
            {excerpt}
          </p>
        )}
        <div className="flex items-center gap-3 pt-2">
          {authorAvatar ? (
            <img src={authorAvatar} alt={authorName} className="w-8 h-8 rounded-full object-cover border border-white/10" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-surface-variant text-sm" aria-hidden="true">person</span>
            </div>
          )}
          <div>
            <p className="font-bold text-[10px] tracking-tight uppercase leading-none">{authorName}</p>
            <p className="text-tertiary text-[8px] font-bold tracking-widest uppercase mt-0.5">{authorRole}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

function SecondaryCard({
  story,
  isPlaceholder,
  accent,
}: {
  story: StoryWithAuthor;
  isPlaceholder: boolean;
  accent: boolean;
}) {
  const ph = isPlaceholder ? (story as unknown as (typeof PLACEHOLDER_STORIES)[0]) : null;
  const href = isPlaceholder ? "/register" : `/story/${story.id}`;
  const title = ph ? ph.title : story.title;
  const genre = ph ? ph.genre : story.genre;
  const authorName = ph ? ph.author_name : (story.profiles?.display_name ?? story.profiles?.username ?? "");
  const authorAvatar = ph ? ph.author_avatar : story.profiles?.avatar_url;

  return (
    <Link
      href={href}
      className={`flex-1 bg-surface-container p-5 rounded-lg hover:bg-surface-bright transition-all cursor-pointer block flex flex-col justify-center${accent ? " border-l-4 border-primary" : ""}`}
    >
      {genre && (
        <span className="text-tertiary text-[9px] font-black font-label tracking-widest block mb-2 uppercase">
          {genre}
        </span>
      )}
      <h4 className="font-headline text-lg font-bold mb-3 leading-tight uppercase">
        {title || "Untitled"}
      </h4>
      <div className="flex items-center gap-2">
        {authorAvatar ? (
          <img src={authorAvatar} alt={authorName} className="w-6 h-6 rounded-full object-cover" />
        ) : (
          <div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center">
            <span className="material-symbols-outlined text-on-surface-variant text-xs" aria-hidden="true">person</span>
          </div>
        )}
        <span className="text-[10px] font-bold uppercase tracking-tight text-on-surface-variant">
          {authorName}
        </span>
      </div>
    </Link>
  );
}
