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
    <section id="featured" className="py-24 px-12 max-w-screen-2xl mx-auto">
      <div className="flex justify-between items-end mb-16">
        <div className="space-y-2">
          <span className="text-tertiary font-label uppercase tracking-widest text-xs font-bold">
            Curated Narratives
          </span>
          <h2 className="font-headline text-5xl font-extrabold tracking-tight">
            FEATURED <span className="text-primary">STORIES</span>
          </h2>
        </div>
        <Link
          href="/"
          className="text-primary-fixed-dim font-label font-bold flex items-center gap-2 hover:text-primary transition-colors"
        >
          VIEW ARCHIVE{" "}
          <span className="material-symbols-outlined">arrow_right_alt</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Feature */}
        {feature && (
          <FeatureCard story={feature} isPlaceholder={isPlaceholder} />
        )}

        {/* Secondary cards */}
        <div className="md:col-span-4 flex flex-col gap-8">
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
      className="md:col-span-8 group relative overflow-hidden bg-surface-container-low rounded-xl h-[600px] border-b-2 border-transparent hover:border-primary-container transition-all cursor-pointer block"
    >
      {coverUrl ? (
        <img
          src={coverUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 to-surface-container" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-surface-dim/20 to-transparent" />
      <div className="absolute bottom-0 p-12 space-y-4">
        <div className="flex gap-4 items-center mb-6">
          {genre && (
            <span className="bg-primary-container text-on-primary-container px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded">
              {genre}
            </span>
          )}
          <span className="text-tertiary text-xs font-bold font-label flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            {readTime} MIN READ
          </span>
        </div>
        <h3 className="font-headline text-5xl font-black leading-tight max-w-2xl uppercase">
          {title || "Untitled"}
        </h3>
        {excerpt && (
          <p className="text-on-surface-variant text-lg max-w-xl line-clamp-2 opacity-80">
            {excerpt}
          </p>
        )}
        <div className="flex items-center gap-4 pt-4">
          {authorAvatar ? (
            <img src={authorAvatar} alt={authorName} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-surface-variant text-sm">person</span>
            </div>
          )}
          <div>
            <p className="font-bold text-sm tracking-tight uppercase">{authorName}</p>
            <p className="text-tertiary text-[10px] font-bold uppercase">{authorRole}</p>
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
      className={`flex-1 bg-surface-container p-8 rounded-xl hover:bg-surface-bright transition-all cursor-pointer block${accent ? " border-l-4 border-primary" : ""}`}
    >
      {genre && (
        <span className="text-tertiary text-[10px] font-bold font-label tracking-widest block mb-4 uppercase">
          {genre}
        </span>
      )}
      <h4 className="font-headline text-2xl font-bold mb-4 leading-snug uppercase">
        {title || "Untitled"}
      </h4>
      <div className="flex items-center gap-3">
        {authorAvatar ? (
          <img src={authorAvatar} alt={authorName} className="w-8 h-8 rounded-full object-cover" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center">
            <span className="material-symbols-outlined text-on-surface-variant text-xs">person</span>
          </div>
        )}
        <span className="text-xs font-bold uppercase tracking-tight text-on-surface-variant">
          {authorName}
        </span>
      </div>
    </Link>
  );
}
